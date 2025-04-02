import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaterialImage } from './material-image.entity';

export enum MaterialType {
  Permanent = 'PERMANENT',
  Consumable = 'CONSUMABLE',
}

export enum MaterialStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: MaterialType,
  })
  type: MaterialType;

  @Column({ default: '' })
  patrimonyNumber: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: MaterialStatus,
    default: MaterialStatus.Active,
  })
  status: MaterialStatus;

  @Column({ nullable: true, type: 'int' })
  quantity: number | null;

  @Column({ nullable: true, type: 'int' })
  minimum_quantity: number | null;

  @OneToMany(() => MaterialImage, (image) => image.material, { cascade: true })
  images: MaterialImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
