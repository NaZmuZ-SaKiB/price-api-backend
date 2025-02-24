import mongoose from 'mongoose';

import config from './app/config';
import app from './app';

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    

    app.listen(config.port, () => {
      console.log(`🚀 Application Running on PORT : ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
