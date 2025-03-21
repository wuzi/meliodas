import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { FindAllMaterialsDto } from './dto/find-all-materials.dto';
import { Material } from './entities/material.entity';
import { MaterialImage } from './entities/material-image.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(MaterialImage)
    private readonly materialImageRepository: Repository<MaterialImage>,
  ) {}

  count() {
    return this.materialRepository.count();
  }

  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save(createMaterialDto);
  }

  findAll(findAllMaterialsDto?: FindAllMaterialsDto) {
    const { type } = findAllMaterialsDto || {};

    const queryBuilder = this.materialRepository
      .createQueryBuilder('material')
      .leftJoinAndSelect('material.images', 'images')
      .orderBy('material.createdAt', 'DESC');

    if (type) {
      queryBuilder.andWhere('material.type = :type', { type });
    }

    return queryBuilder.getMany();
  }

  findOne(id: string) {
    return this.materialRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  update(id: string, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  async remove(id: string) {
    await this.materialImageRepository.delete({ material: { id } });
    return this.materialRepository.delete(id);
  }

  async addImage(materialId: string, filename: string) {
    const material = await this.materialRepository.findOne({
      where: { id: materialId },
    });
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    const image = new MaterialImage();
    image.filename = filename;
    image.material = material;
    return this.materialImageRepository.save(image);
  }
}
