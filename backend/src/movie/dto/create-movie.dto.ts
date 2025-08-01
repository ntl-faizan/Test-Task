// src/movie/dto/create-movie.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: '12345', description: 'TMDB Movie ID or external ID' })
  @IsString()
  externalId: string;

  @ApiProperty({ example: 'The Matrix' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A computer hacker learns the truth about reality.' })
  @IsOptional()
  @IsString()
  overview?: string;

  @ApiProperty({ example: '/poster_path.jpg' })
  @IsOptional()
  @IsString()
  posterPath?: string;

  @ApiProperty({ example: '1999-03-31' })
  @IsOptional()
  @IsString()
  releaseDate?: string;
}
