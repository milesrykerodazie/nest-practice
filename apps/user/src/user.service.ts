import { PrismaService } from '@app/common/prisma-service/prisma.service';
import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUsers() {
    // const users = await this.prismaService.user.findMany({});

    // if (users?.length < 1) {
    //   return new NotFoundException('No user found.');
    // }

    return {
      success: true,
      message: 'All users',
    };
  }

  //get user
  async getUser(payload) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload?.id,
      },
    });

    if (!user) {
      return new NotFoundException('No user found');
    }

    delete user.password;
    return {
      success: true,
      message: 'All users',
      user,
    };
  }
}
