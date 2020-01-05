import { Controller, Get, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  getUsers(
    @Res() res,
  ) {
    return 'Estoy triste y vacio'
  }

  @Get(':id')
  getUserById() {
    return 'Epa la arepa'
  }
}
