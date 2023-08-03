import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'hello',
      protoPath: join(__dirname, 'proto/hello.proto'),
      url: '127.0.0.1:50051',
    },
  });

  await app.startAllMicroservices();
  await app.listen(8080);
}
bootstrap();
