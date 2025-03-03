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

export enum Status {
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

  @Column()
  patrimonyNumber: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @OneToMany(() => MaterialImage, (image) => image.material, { cascade: true })
  images: MaterialImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
