import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) 
    private readonly authRepository: Repository<AuthEntity>
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    createAuthDto.password = await bcrypt.hash(createAuthDto.password,12);
    return await this.authRepository.save(createAuthDto);
  }

  findOneByEmail(email: string) {
    return this.authRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<AuthEntity> {
    return await this.authRepository.findOne({ where: { id } });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
