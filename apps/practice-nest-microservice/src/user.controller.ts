import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from './auth/guard';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  // @UseGuards(JwtGuard)
  @Get('all')
  async getUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }
  @UseGuards(JwtGuard)
  @Get()
  async getUser(@Body() payload: { id: string }) {
    console.log('the user id => ', payload);
    return this.client.send({ cmd: 'get_user' }, payload);
  }
}
