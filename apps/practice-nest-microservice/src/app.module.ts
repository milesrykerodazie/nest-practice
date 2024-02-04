import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@app/common/prisma-service/prisma.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
          },
        });
      },
    },
  ],
})
export class AppModule {}
