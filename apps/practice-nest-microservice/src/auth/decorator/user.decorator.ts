import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('the request user => ', request?.user);

    const user = request?.user;
    console.log('the request user => ', user);

    return data ? user?.[data] : user;
  },
);
