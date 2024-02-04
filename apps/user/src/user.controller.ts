import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.getUsers();
  }
  //get user by id
  @Get()
  @MessagePattern({ cmd: 'get_user' })
  getUser(@Body() payload: { id: string }) {
    console.log('the id from micro => ', payload);

    return this.userService.getUser(payload);
  }
}
