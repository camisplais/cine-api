import 'dotenv/config';

import { DataSource } from 'typeorm';
import { getDatabaseConfig } from '../config/database.config.js';

export const AppDataSource = new DataSource({
  ...getDatabaseConfig(),

  migrations: ['src/database/migrations/*.ts'],
});
