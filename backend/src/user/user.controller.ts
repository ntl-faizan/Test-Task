import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active users' })
  @ApiResponse({ status: 200, type: [User] })
  getActiveUsers(): Promise<User[]> {
    return this.userService.findActiveUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
