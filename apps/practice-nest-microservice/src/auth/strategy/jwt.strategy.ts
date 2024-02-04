import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/common/prisma-service/prisma.service';
import { JwtPayloadType } from '@app/common/types/typings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadType) {
    //getting the details of the signed in user
    if (payload) {
      console.log('the pay load => ', payload);

      const user = await this.prisma.user?.findUnique({
        where: {
          id: payload.id,
        },
      });
      delete user.password;
      console.log('user from payload => ', user);

      return user;
    } else {
      throw new ForbiddenException('You cant do this.');
    }
  }
}
