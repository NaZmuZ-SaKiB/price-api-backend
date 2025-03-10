import httpStatus from 'http-status';
import { FilterQuery } from 'mongoose';
import puppeteer from 'puppeteer';
import { Product } from '../product/product.model';
import { TProduct } from '../product/product.type';
import AppError from '../../errors/AppError';
import { History } from '../history/history.model';
import config from '../../config';

const scrape = async (token: any, fullUrl: string) => {
  if (!fullUrl) {
    throw new AppError(httpStatus.BAD_REQUEST, 'URL is required');
  }

  if (!fullUrl.startsWith('http')) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'URL is not valid. It should start with http or https',
    );
  }

  const url = new URL(fullUrl);

  if (!['startech.com.bd', 'www.startech.com.bd'].includes(url.host)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'URL is not supported');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--single-process',
      '--no-zygote',
    ],
    executablePath:
      config.node_env === 'production'
        ? config.puppeteer_executable_path
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();

  const products = [];

  await page.goto(url.toString());

  // First Time get total page
  const totalPages = await page.evaluate(() => {
    const pageInfoText = document
      .querySelector('.col-md-6.rs-none.text-right p')
      ?.textContent?.trim();

    const totalPagesMatch = pageInfoText?.match(/\((\d+) Pages\)/);

    let totalPages = 1;
    if (totalPagesMatch && totalPagesMatch[1]) {
      totalPages = parseInt(totalPagesMatch[1], 10);
    }

    return totalPages;
  });

  // Loop through all pages
  for (
    let currentPage = 1;
    currentPage <= (totalPages as number);
    currentPage++
  ) {
    url.searchParams.set('page', currentPage.toString());
    await page.goto(url.toString());

    const data = await page.evaluate(() => {
      // Get products
      const products = document.getElementsByClassName('p-item');

      return Array.from(products).map((product) => {
        const title = product
          ?.querySelector('.p-item-name a')
          ?.textContent?.trim();

        const url = product
          ?.querySelector('.p-item-name a')
          ?.getAttribute('href');

        const image = product
          ?.querySelector('.p-item-img img')
          ?.getAttribute('src');

        let priceTag = product?.querySelector('.price-new');

        if (!priceTag) {
          priceTag = product?.querySelector('.p-item-price span');
        }

        let price = Number(
          priceTag?.textContent?.trim()?.replace(/[^0-9.-]+/g, ''),
        );

        let status: string = 'in-stock';

        if (price === 0) {
          status = priceTag?.textContent
            ?.trim()
            ?.toLowerCase()
            ?.split(' ')
            ?.join('-') as string;
        }

        return {
          title,
          url,
          price,
          image,
          status,
        };
      });
    });

    products.push(...data);
  }

  await browser.close();

  // Upload to database
  const updateOperations = [];
  const createOperations = [];

  const updatedProducts: any = [];
  const newProducts: any = [];

  const existingProducts = await Product.find(
    { url: { $in: products.map((p) => p.url) } },
    { url: 1, price: 1 },
  );

  const existingProductMap = new Map(existingProducts.map((p) => [p.url, p]));

  for (const product of products) {
    const existingProduct = existingProductMap.get(product?.url as string);

    if (existingProduct) {
      // Check if price has changed
      const priceChanged = existingProduct.price !== product.price;

      if (priceChanged) {
        updateOperations.push({
          updateOne: {
            filter: { url: product.url } as FilterQuery<TProduct>,
            update: {
              $set: {
                ...product,
                lastModified: priceChanged
                  ? new Date()
                  : existingProduct.lastModified,
                lastChecked: new Date(),
                done: false,
              },
            },
          },
        });
        updatedProducts.push(product);
      }
    } else {
      createOperations.push({
        insertOne: {
          document: {
            ...product,
            lastChecked: new Date(),
            lastModified: new Date(),
            done: true,
          },
        },
      });
      newProducts.push(product);
    }
  }

  // Execute bulk updates and inserts
  if (updateOperations.length > 0) {
    await Product.bulkWrite(updateOperations);
  }
  if (createOperations.length > 0) {
    await Product.bulkWrite(createOperations);
  }

  // Get all products with status
  const productsWithStatus = products.map((product) => {
    if (newProducts.some((newProduct: any) => newProduct.url === product.url)) {
      return { ...product, scrapeStatus: 'new' };
    } else if (
      updatedProducts.some(
        (updatedProduct: any) => updatedProduct.url === product.url,
      )
    ) {
      return { ...product, scrapeStatus: 'updated' };
    } else {
      return { ...product, scrapeStatus: 'old' };
    }
  });

  await History.create({
    url: fullUrl,
    totalProducts: products.length,
    totalPages,
    newProducts: createOperations.length,
    updatedProducts: updateOperations.length,
    scrapedBy: token?._id,
  });

  return {
    totalPages,
    products: productsWithStatus,
    newProducts: newProducts.length,
    updatedProducts: updatedProducts.length,
  };
};

export const ScrapeService = {
  scrape,
};
