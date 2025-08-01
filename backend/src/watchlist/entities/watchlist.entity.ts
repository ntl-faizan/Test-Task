// src/watchlist/entities/watchlist.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('watchlist')
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: string; // External API movie ID

  @Column()
  title: string;

  @Column({ nullable: true })
  posterPath: string;

  @CreateDateColumn()
  addedAt: Date;

  @ManyToOne(() => User, (user) => user.watchlist, { onDelete: 'CASCADE' })
  user: User;
}
