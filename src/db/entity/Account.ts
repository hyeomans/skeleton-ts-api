import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { AccountEmail } from './AccountEmail'

export enum AccountStatus {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  INVITED = 'invited',
  BLOCKED = 'blocked',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.CREATED })
  status: AccountStatus

  @OneToOne(() => AccountEmail, (accountEmail) => accountEmail.account)
  accountEmail: AccountEmail

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'time with time zone', name: 'updated_at' })
  updatedAt: string
}
