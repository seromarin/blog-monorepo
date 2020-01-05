import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewUser } from './interfaces/newUser.interface'
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<NewUser>
  ) { }

  findUserByUsername = async ({ username, password }): Promise<NewUser> => await this.userModel.findOne({ username }).exec();

  findUserById = async (userID: string | number): Promise<any> => await this.userModel.findById(userID).exec();

  addNewUser = async (createUserDTO: CreateUserDTO): Promise<NewUser> => await new this.userModel(createUserDTO).save();

  // async findOneUserByUsername = (username: string): Promise<any | undefined> => this.user.find(user => user.username === username);


  // getPost = async (postID: number): Promise<Post> => await this.postModel.findById(postID).exec();

  // addPost = async (createPostDTO: CreatePostDTO): Promise<Post> => await new this.postModel(createPostDTO).save();

}
