import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ApplicationVersion {
  @PrimaryColumn()
  url: string;

  @Column()
  packageName: string;

  @Column({
    nullable: true,
  })
  modFeatures: string;

  @Column({
    nullable: true,
  })
  size: string;

  @Column()
  versionNumber: string;

  @Column({
    nullable: true,
  })
  downloadUrl: string;

  @Column({
    nullable: true,
  })
  error: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
