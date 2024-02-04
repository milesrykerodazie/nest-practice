import { PrismaService } from '@app/common/prisma-service/prisma.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserAuthHelperService } from './user.auth.helper.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const EXPIRE_TIME = 7 * 24 * 3600000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private userAuthHelperService: UserAuthHelperService,
    private config: ConfigService,
  ) {}

  // register user
  async register(payload: RegisterDto) {
    //check if email is in use
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (user) {
      throw new ConflictException('Email in use.');
    }

    //encrypting the password
    const hashedPassword = await argon.hash(payload?.password);
    //create new user
    const newUser = await this.prismaService.user.create({
      data: {
        name: payload?.name,
        email: payload?.email,
        password: hashedPassword,
        bio: payload?.bio,
      },
    });

    if (newUser) {
      return {
        success: true,
        message: 'Resisteration Successful!',
      };
    } else {
      return new BadRequestException();
    }
  }

  // login user
  async login(payload: LoginDto) {
    console.log('the payload => ', payload);

    //create new user
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    console.log('the user => ', user);

    if (!user) {
      return new ForbiddenException('Invalid Credentials');
    }
    //verify password
    const passwordOk = await argon.verify(user?.password, payload.password);

    if (!passwordOk) {
      return new ForbiddenException('Invalid password Credentials');
    }

    delete user?.password;
    const userDetail = {
      id: user?.id,
      name: user?.name,
    };

    const primary = await this.userAuthHelperService.signJwt(
      user?.id,
      user?.name,
    );
    const secondary = await this.userAuthHelperService.signRefreshJwt({
      id: user?.id,
      name: user?.name,
    });
    return {
      success: true,
      message: 'Login Successful!',
      userDetail,
      assesses: {
        primary,
        secondary,
        milesPeriod: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }
}
