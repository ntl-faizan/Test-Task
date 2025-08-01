import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFavoriteDto {
  externalMovieId(externalMovieId: any) {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({
    example: 12,
    description: 'ID of the movie to be added to favorites',
  })
  @IsNumber()
  movieId: string;;
}
