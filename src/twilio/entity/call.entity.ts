import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  callSid: string;

  @Column('varchar')
  called: string;

  @Column('varchar')
  direction: string;

  @Column('varchar')
  callerCountry: string;

  @Column('varchar')
  toCountry: string;

  @Column('varchar')
  to: string;

  @Column('varchar')
  fromNumber: string;

  @Column('varchar')
  accountSid: string;

  @Column('varchar')
  caller: string;

  @Column({ type: 'varchar', nullable: true })
  recordingUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
