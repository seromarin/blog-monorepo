import { Controller, Get, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Http2ServerRequest } from 'http2';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('blog')
export class BlogController {

  constructor(
    private blogService: BlogService,
  ) { }

  @Get('posts')
  async getPosts(
    @Res() res
  ) {
    const posts = await this.blogService.getPosts()
    return res.status(HttpStatus.OK).json(posts)
  }

  @Post('/post')
  async addPost(
    @Res() res,
    @Body() createPostDTO: CreatePostDTO
  ) {
      const newPost = await this.blogService.addPost(createPostDTO);
      return res.status(HttpStatus.OK).json({
          message: "Post has been submitted successfully!",
          post: newPost
      })
  }

}
