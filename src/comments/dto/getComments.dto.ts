import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class GetCommentsDto {
  @Type(() => Number)
  @IsOptional()
  postId?: number;
}

export default GetCommentsDto;
