import { Transform } from 'class-transformer';
import User from '../../users/entities/user.entity';
import Comment from '../../comments/comment.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  @Transform(({ value }) => {
    if (value !== null) {
      return value;
    }
  })
  public category?: string;

  @Index()
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @OneToMany(
    () => Comment,
    (comment: Comment) => comment.post,
  )
  public comments: Comment[];
}

export default Post;
