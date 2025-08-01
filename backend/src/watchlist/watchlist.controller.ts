import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { AddWatchlistDto } from './dto/add-watchlist.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Watchlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  addToWatchlist(@Body() dto: AddWatchlistDto, @Req() req) {
    return this.watchlistService.addToWatchlist(req.user.id, dto);
  }

  @Get()
  getWatchlist(@Req() req) {
    return this.watchlistService.getWatchlist(req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.watchlistService.removeFromWatchlistById(id);
  }
}
