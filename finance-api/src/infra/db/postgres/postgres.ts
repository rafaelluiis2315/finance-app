import { Global, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { QueryParams } from './interfaces/query-params.interface';

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
  private client: PoolClient;

  private async connect() {
    this.client = await this.pool.connect();
  }

  private async query({ query, params }: QueryParams) {
    return (await this.client.query(query, params)).rows;
  }

  private async disconnect() {
    this.client.release();
  }

  async exec({ query, params }: QueryParams) {
    try {
      await this.connect();
      const result = await this.query({ query, params });
      return result;
    } finally {
      this.disconnect();
    }
  }
}
