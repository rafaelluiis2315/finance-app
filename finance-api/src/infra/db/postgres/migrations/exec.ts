import * as fs from 'fs';
import * as path from 'path';
import { Postgres } from '../postgres';
import 'dotenv/config';

const execMigrations = async () => {
  const client = new Postgres();
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith('.sql'));

  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const script = fs.readFileSync(filePath, 'utf8');

    await client.exec({ query: script });

    console.log(`Migration for file ${file} executed successfully.`);
  }

  console.log('All migrations executed successfully!');
};

execMigrations();
