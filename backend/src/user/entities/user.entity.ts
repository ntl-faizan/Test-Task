import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Watchlist } from 'src/watchlist/entities/watchlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  resetToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date | null;

  // ✅ Relations for future extension
  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlist: Watchlist[];
}
