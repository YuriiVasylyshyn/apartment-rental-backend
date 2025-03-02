import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { Role } from '../enums/role.enum';

@Entity({ schema: 'users', name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  public fullName!: string | null;

  @Column({ type: 'varchar', nullable: true, length: 255, unique: true })
  public email!: string | null;

  @Column({ type: 'text', nullable: false })
  public password!: string;

  @Column({ type: 'enum', enum: Role, nullable: false })
  public role!: Role;

  @Column({ type: 'boolean', default: false })
  public isRegistrationCompleted!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @OneToMany(() => ApartmentEntity, rentedApartments => rentedApartments.tenant)
  public rentedApartments!: ApartmentEntity[];

  @OneToMany(() => ApartmentEntity, ownApartments => ownApartments.owner)
  public ownApartments!: ApartmentEntity[];
}
