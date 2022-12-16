import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({ 
    secret:"qwerty",
    signOptions:{expiresIn:"1d"}
    })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,UserService]
})
export class AuthModule {}
