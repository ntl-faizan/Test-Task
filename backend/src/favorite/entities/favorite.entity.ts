// src/favorite/entities/favorite.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Entity('favorites')
@Unique(['user', 'movie']) // Prevent duplicate favorites
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Movie, { eager: true, onDelete: 'CASCADE' })
  movie: Movie;

  @CreateDateColumn()
  createdAt: Date;
}
