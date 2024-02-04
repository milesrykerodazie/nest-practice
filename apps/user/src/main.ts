import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
    },
  });
  await app.listen();
  console.log('User service is running');
}
bootstrap();
