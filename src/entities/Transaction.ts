import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "transactions" })
@Index(["source", "externalTransactionId"], { unique: true })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  source!: string;

  @Column({ type: "varchar" })
  externalTransactionId!: string;

  @Column({ type: "varchar" })
  partnerName!: string;

  @Column("decimal", {
    precision: 12,
    scale: 2,
  })
  amount!: string;

  @Column({
    type: "varchar",
    length: 3,
  })
  currency!: string;

  @Column({ type: "varchar" })
  status!: string;

  @Column({
    type: "timestamp with time zone",
  })
  occurredAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
