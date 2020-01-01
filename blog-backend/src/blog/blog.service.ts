import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {

  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>
  ) {}

  getPosts = async (): Promise<Post[]> => await this.postModel.find().exec();

  getPost = async (postID: number): Promise<Post> => await this.postModel.findById(postID).exec();

  addPost = async (createPostDTO: CreatePostDTO): Promise<Post> => await new this.postModel(createPostDTO).save();

  editPost = async (postID, createPostDTO: CreatePostDTO): Promise<Post>  => await this.postModel.findByIdAndUpdate(postID, createPostDTO, { new: true })

  deletePost = async (postID): Promise<any> => await this.postModel.findByIdAndRemove(postID).exec();

}
