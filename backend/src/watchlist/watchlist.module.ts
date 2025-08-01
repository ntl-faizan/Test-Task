// src/watchlist/watchlist.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { Watchlist } from './entities/watchlist.entity';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist, User, Movie])],
  controllers: [WatchlistController],
  providers: [WatchlistService, MovieService],
})
export class WatchlistModule {}
