import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn()
  url: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  total: number;

  @Column({
    default: 0,
  })
  completedItems: number;
}
