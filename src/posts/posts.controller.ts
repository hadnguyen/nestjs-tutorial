import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import FindOneParams from '../utils/findOneParams';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { PaginationParams } from '../utils/types/paginationParams';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor) // use with class-transformer
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  findAll(
    @Query() { offset, limit }: PaginationParams
  ) {
    return this.postsService.findAll(offset, limit);
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
