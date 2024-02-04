import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/common/prisma-service/prisma.service';
import { JwtPayloadType } from '@app/common/types/typings';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt.refresh',
) {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('REFRESH_SECRET'),
    });
  }

  async validate(payload: JwtPayloadType) {
    //getting the details of the signed in user
    if (payload) {
      console.log('the pay load from refresh => ', payload);

      const user = await this.prisma.user?.findUnique({
        where: {
          id: payload.id,
        },
      });
      delete user.password;
      return user;
    } else {
      throw new ForbiddenException('You cant do this.');
    }
  }
}
