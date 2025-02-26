import httpStatus from 'http-status';
import { FilterQuery } from 'mongoose';
import puppeteer from 'puppeteer';
import { Product } from '../product/product.model';
import { TProduct } from '../product/product.type';
import AppError from '../../errors/AppError';

const scrape = async (fullUrl: string) => {
  if (!fullUrl) {
    throw new AppError(httpStatus.BAD_REQUEST, 'URL is required');
  }

  const url = new URL(fullUrl);
  const browser = await puppeteer.launch();
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
    }
  }

  // Execute bulk updates and inserts
  if (updateOperations.length > 0) {
    await Product.bulkWrite(updateOperations);
  }
  if (createOperations.length > 0) {
    await Product.bulkWrite(createOperations);
  }

  return { totalProducts: products.length, totalPages };
};

export const ScrapeService = {
  scrape,
};
