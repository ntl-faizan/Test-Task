import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepo: Repository<Favorite>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,

    private movieService: MovieService,
  ) {}

async addToFavorites(userId: number, dto: AddFavoriteDto) {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');

  const movie = await this.movieService.findOrCreateMovieByExternalId(dto.movieId);

  const existingFavorite = await this.favoriteRepo.findOne({
    where: { user: { id: userId }, movie: { id: movie.id } },
  });
  if (existingFavorite) return existingFavorite;

  const favorite = this.favoriteRepo.create({
    user,
    movie,
  });

  return this.favoriteRepo.save(favorite);
}


  async getFavorites(userId: number) {
    return this.favoriteRepo.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });
  }

  async removeFavorite(userId: number, favoriteId: number) {
    const favorite = await this.favoriteRepo.findOne({
      where: { id: favoriteId, user: { id: userId } },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.favoriteRepo.remove(favorite);
  }
}
