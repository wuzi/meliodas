import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Material } from './material.entity';

@Entity()
export class MaterialImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @ManyToOne(() => Material, (material) => material.images)
  material: Material;
}
