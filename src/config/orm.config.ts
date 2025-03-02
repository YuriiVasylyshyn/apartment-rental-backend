import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/modules/**/entities/*.entity.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
