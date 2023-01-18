import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entities/post.entity';
import PostNotFoundException from '../posts/exception/postNotFound.exception';
import User from '../users/entities/user.entity';
import { Cache } from 'cache-manager';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_POSTS_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
  }

  async create(createPostDto: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...createPostDto,
      author: user,
    });
    await this.postsRepository.save(newPost);
    await this.clearCache();
    return newPost;
  }

  async findAll(offset?: number, limit?: number) {
    const [items, count] = await this.postsRepository.findAndCount({
      relations: ['author'],
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return {
      items,
      count,
    };
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        author: true,
      },
    });
    if (post) {
      return post;
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    throw new PostNotFoundException(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(id, updatePostDto);
    const updatedPost = await this.postsRepository.findOneBy({ id: id });
    if (updatedPost) {
      await this.clearCache();
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.clearCache();
  }
}
