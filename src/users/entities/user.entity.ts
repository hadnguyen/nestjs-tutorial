import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from '../../address/entities/address.entity';
import Post from '../../posts/entities/post.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  public address: Address;

  @Column({ type: 'int', nullable: true })
  address_id?: number;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at: Date;
}

export default User;
