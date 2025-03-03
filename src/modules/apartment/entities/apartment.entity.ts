import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';

@Entity({ schema: 'apartments', name: 'apartment' })
export class ApartmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public title!: string;

  @Column({ type: 'text', nullable: true })
  public description!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public country!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public city!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  public state!: string | null;

  @Column({ type: 'double precision', nullable: false, default: 0 })
  public price!: number;

  @Column({ type: 'varchar', nullable: false, default: 'USD', length: 10 })
  public currency!: string;

  @Column({ type: 'int', nullable: true })
  public rooms!: number | null;

  @Column({ type: 'double precision', nullable: false })
  public areaSqm!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column({ type: 'uuid' })
  public ownerId!: string;

  @Column({ type: 'uuid', nullable: true })
  public tenantId!: string | null;

  @ManyToOne(() => UserEntity, owner => owner.ownApartments, { onDelete: 'CASCADE' })
  public owner!: UserEntity;

  @ManyToOne(() => UserEntity, tenant => tenant.rentedApartments)
  public tenant!: UserEntity;
}
