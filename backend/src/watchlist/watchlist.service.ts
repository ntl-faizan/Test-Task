import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { Repository } from 'typeorm';
import { AddWatchlistDto } from './dto/add-watchlist.dto';
import { User } from 'src/user/entities/user.entity';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly movieService: MovieService, // ✅ Injected
  ) {}

  async addToWatchlist(userId: number, dto: AddWatchlistDto): Promise<Watchlist> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // ✅ Check if already in watchlist
    const exists = await this.watchlistRepository.findOne({
      where: { movieId: dto.movieId, user: { id: userId } },
    });

    if (exists) return exists;

    // ✅ Ensure movie exists in local DB
    await this.movieService.findOrCreateMovieByExternalId(dto.movieId);

    // ✅ Add to watchlist
    const watchlistEntry = this.watchlistRepository.create({ ...dto, user });
    return this.watchlistRepository.save(watchlistEntry);
  }

  async removeFromWatchlist(userId: number, movieId: string): Promise<void> {
    const result = await this.watchlistRepository.delete({
      movieId,
      user: { id: userId },
    });

    if (!result.affected) {
      throw new NotFoundException('Watchlist entry not found');
    }
  }

  async removeFromWatchlistById(id: number): Promise<void> {
    const result = await this.watchlistRepository.delete({ id });
    if (!result.affected) throw new NotFoundException('Watchlist entry not found');
  }

  async getWatchlist(userId: number): Promise<Watchlist[]> {
    return this.watchlistRepository.find({
      where: { user: { id: userId } },
      order: { addedAt: 'DESC' },
      relations: ['user'], // optional: preload user relation
    });
  }
}
