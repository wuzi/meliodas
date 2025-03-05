import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  picture: string;

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

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  private tempPassword!: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptPassword(): Promise<void> {
    if (this.tempPassword == this.password) {
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  public comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
