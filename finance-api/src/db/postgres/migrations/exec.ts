/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import { Postgres } from '../postgres';
const fs = require('fs');
const path = require('path');

const execMigrations = async () => {
  const filePath = path.join(__dirname, '01-init.sql');
  const script = fs.readFileSync(filePath, 'utf8');

  const client = new Postgres();
  await client.exec({ query: script });

  console.info('Migration executed successfully');
};

execMigrations();
