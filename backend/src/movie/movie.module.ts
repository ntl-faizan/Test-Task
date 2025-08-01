import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])], // ✅ This line registers the MovieRepository
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService] // Optional: export if needed elsewhere
})
export class MovieModule {}
