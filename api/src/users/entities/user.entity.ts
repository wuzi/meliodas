import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export enum UserCategory {
  Student = 'STUDENT',
  Collaborator = 'COLLABORATOR',
  Professor = 'PROFESSOR',
  Other = 'OTHER',
}

export enum UserProfile {
  Admin = 'ADMIN',
  ResearchCoordinator = 'RESEARCH_COORDINATOR',
  ExtensionCoordinator = 'EXTENSION_COORDINATOR',
  User = 'USER',
}

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: UserProfile,
    default: UserProfile.User,
  })
  profile: UserProfile;

  /**
   * Matrícula/SIAPE
   */
  @Column()
  registrationNumber: string;

  @Column({
    type: 'enum',
    enum: UserCategory,
  })
  category: UserCategory;

  @Column()
  course: string;

  @Column({ nullable: true })
  department?: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @Column({ nullable: true })
  photoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
