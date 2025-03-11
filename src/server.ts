import mongoose from 'mongoose';

import config from './app/config';
import app from './app';
import { Token } from './app/modules/token/token.model';
import { TOKEN_ACCESS } from './app/modules/token/token.constant';

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    const token = await Token.findOne({ access: TOKEN_ACCESS.ADMIN });

    if (!token) {
      await Token.create({
        access: TOKEN_ACCESS.ADMIN,
        token: config.admin_password,
        name: 'Admin',
        exp: new Date(),
      });
    }

    app.listen(config.port, () => {
      console.log(`🚀 Application Running on PORT : ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
