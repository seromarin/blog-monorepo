import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BlogModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@blog-cluster-xmwwh.gcp.mongodb.net/test?retryWrites=true&w=majority`,
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    ),   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
