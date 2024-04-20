import { Global, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Connect } from './interfaces/connect.interface';

@Global()
@Injectable()
export class Postgres {
  private pool: Pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
  });

  async connect(connect: Connect) {
    const client = await this.pool.connect();

    const results = await client.query(connect.query, connect.params);

    await client.release();

    return results.rows;
  }
}
