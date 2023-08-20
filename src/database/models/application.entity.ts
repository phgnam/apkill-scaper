import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Application {
  @PrimaryColumn()
  url: string;

  @Column({
    nullable: true,
  })
  appIconUrl: string;

  @Column({
    nullable: false,
  })
  category: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  modFeatures: string;

  @Column({
    nullable: true,
  })
  originalAPK: string;

  @Column({
    nullable: true,
  })
  packageName: string;

  @Column({
    nullable: true,
  })
  price: string;

  @Column({
    nullable: true,
  })
  publisher: string;

  @Column({
    nullable: true,
  })
  requires: string;

  @Column({
    nullable: true,
  })
  size: string;

  @Column({
    nullable: true,
  })
  version: string;

  @Column({
    nullable: true,
  })
  error: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
