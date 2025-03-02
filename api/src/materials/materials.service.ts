import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save(createMaterialDto);
  }

  findAll() {
    return this.materialRepository.find();
  }

  findOne(id: string) {
    return this.materialRepository.findOne({ where: { id } });
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  remove(id: number) {
    return this.materialRepository.delete(id);
  }
}
