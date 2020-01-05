import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NewUser } from 'src/users/interfaces/newUser.interface';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOneUserByUsername(username);
    const user = await this.usersService.findUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ username, password }) {
    const payload = {
      username,
      password,
    };
    try {
      const findUser = await this.usersService.findUserByUsername(payload);
      return findUser;
    } catch (error) {
      return new BadRequestException();
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ name, username, password, email, register_date }: CreateUserDTO) {
    const payload = {
      name,
      username,
      password,
      email,
      register_date,
    };
    try {
      const newUserModel = await this.usersService.addNewUser(payload)
      return newUserModel;
    } catch (error) {
      // console.error('Puto error', error)
      return new BadRequestException();
    }
  }
}
