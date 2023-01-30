import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/authentication/graphql-jwt-auth.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CreatePostInput } from './inputs/post.input';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.findAll();
    return posts.items;
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.postsService.create(createPostInput, context.req.user);
  }
}
