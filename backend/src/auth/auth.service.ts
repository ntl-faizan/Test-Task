import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/Login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { randomBytes } from 'crypto';
import { NotFoundException, BadRequestException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;

    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        email,
        name,
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      });

      await this.userRepository.save(user);

      return { message: 'Signup successful' };
    } catch (err) {
      console.error('Signup error:', err);
      throw new InternalServerErrorException('Signup failed');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d', // You can also load from environment: process.env.JWT_EXPIRES_IN
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('Email not found');

    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await this.userRepository.save(user);

    // Use frontend URL for reset link
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3002';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    // You can log it or later integrate with email
    console.log(`Reset link: ${resetLink}`);

    return { message: 'Reset link generated (check console)' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { resetToken: dto.token },
    });
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Token is invalid or expired');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await this.userRepository.save(user);
    return { message: 'Password successfully reset' };
  }
}
