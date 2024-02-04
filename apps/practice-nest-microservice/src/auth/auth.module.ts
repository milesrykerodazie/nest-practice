import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/common/prisma-service/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@app/common/prisma-service/prisma.service';
import { UserAuthHelperService } from './user.auth.helper.service';
import { JwtStrategy } from './strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserAuthHelperService,
    JwtStrategy,
    ConfigService,
  ],
})
export class AuthModule {}
