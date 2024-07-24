import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

BigInt.prototype['toJSON'] = function () { 
  return this.toString()
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();


  await app.listen(8080);
}
bootstrap();
