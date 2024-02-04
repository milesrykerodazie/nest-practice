import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAuthHelperService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  //generating the accesstoken
  async signJwt(id: string, name: string): Promise<string> {
    const payload = {
      id,
      name,
    };

    const sign_secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '2d',
      secret: sign_secret,
    });
  }

  //generate refresh token
  async signRefreshJwt(args: { id: string; name: string }) {
    const payload = args;

    const refresh_secret = this.config.get('REFRESH_SECRET');

    return this.jwt.signAsync(payload, {
      secret: refresh_secret,
      expiresIn: '7d',
    });
  }
}
