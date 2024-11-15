import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: 'email', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', comment: 'phone', unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', comment: 'username' })
  username: string;

  @Column({ type: 'varchar', comment: 'role' })
  role: string;

  @Column({ type: 'varchar', comment: 'password', nullable: false })
  password: string;

  @Column({ type: 'tinyint', default: 1, comment: '1: inactive, 2: active' })
  status: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'created at',
  })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'updated at',
  })
  updated_at: Date;
}
