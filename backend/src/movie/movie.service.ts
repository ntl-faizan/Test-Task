import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findOrCreateMovieByExternalId(externalId: string): Promise<Movie> {
    const existing = await this.movieRepository.findOne({
      where: { externalId },
    });

    if (existing) return existing;

    // Fetch from TMDB or another API
    const response = await axios.get<{ id: number; title: string; overview: string; poster_path: string; release_date: string }>(
      `https://api.themoviedb.org/3/movie/${externalId}?api_key=7bd29f3264eeb540e7496fe9e1a8ff7a`
    );

    const movieData = response.data;

    const newMovie = this.movieRepository.create({
      externalId: movieData.id.toString(),
      title: movieData.title,
      overview: movieData.overview,
      posterPath: movieData.poster_path,
      releaseDate: movieData.release_date,
    });

    return await this.movieRepository.save(newMovie);
  }

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.movieRepository.update(id, updateMovieDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    return this.movieRepository.remove(movie);
  }
}
