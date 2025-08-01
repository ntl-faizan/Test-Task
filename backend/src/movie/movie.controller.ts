import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':externalId')
  async getOrCreateMovie(@Param('externalId') externalId: string) {
    return this.movieService.findOrCreateMovieByExternalId(externalId);
  }
}