// src/favorite/favorite.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieModule } from 'src/movie/movie.module'; // ✅ import

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, User, Movie]),
    MovieModule, // ✅ add this
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
