import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddWatchlistDto {
  @ApiProperty({
    description: 'Unique ID of the movie (usually from TMDB or similar)',
    example: '123456',
  })
  @IsString()
  movieId: string;

  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Poster image path (optional)',
    example: '/inception-poster.jpg',
  })
  @IsOptional()
  @IsString()
  posterPath?: string;
}
