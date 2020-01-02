import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneUserByUsername(username);
    if (user && user.password === password) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

}
