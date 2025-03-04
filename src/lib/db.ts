import { sql } from '@vercel/postgres';

export async function executeQuery(query: string, values: (string | number | boolean)[] = []) {
  try {
    const result = await sql.query(query, values);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
} 