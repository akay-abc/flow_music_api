import { Column, PrimaryGeneratedColumn } from 'typeorm';

class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'date when token was created',
  })
  created_at: Date;
}
