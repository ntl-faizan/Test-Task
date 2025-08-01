import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  overview: string;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  releaseDate: string;
}
