import { Transform } from 'class-transformer';
import User from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  @Transform(({value}) => {
    if (value !== null) {
      return value;
    }
  })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;
