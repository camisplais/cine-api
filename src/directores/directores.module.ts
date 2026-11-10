import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DirectoresController } from './directores.controller.js';
import { DirectoresService } from './directores.service.js';
import { Director } from './entities/director.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  controllers: [DirectoresController],
  providers: [DirectoresService],
  exports: [DirectoresService],
})
export class DirectoresModule {}
