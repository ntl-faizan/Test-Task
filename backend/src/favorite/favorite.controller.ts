import { Controller, Post, Get, Body, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  addToFavorites(@Body() dto: AddFavoriteDto, @Req() req) {
    return this.favoriteService.addToFavorites(req.user.id, dto);
  }

  @Get()
  getFavorites(@Req() req) {
    return this.favoriteService.getFavorites(req.user.id);
  }

  @Delete(':id')
  removeFavorite(@Param('id') id: number, @Req() req) {
    return this.favoriteService.removeFavorite(req.user.id, id);
  }
}
