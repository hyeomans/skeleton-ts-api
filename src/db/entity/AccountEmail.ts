import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Account } from './Account'

@Entity()
export class AccountEmail {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'time with time zone', name: 'updated_at' })
  updatedAt: string
}
