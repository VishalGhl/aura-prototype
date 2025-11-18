import { Pool } from 'pg';

// PostgreSQL connection pool using Neon.tech free database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Create new user
export async function createUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Check if user already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [userData.email]
    );
    
    if (existingUser.rows.length > 0) {
      throw new Error('User already exists with this email');
    }
    
    // Create user
    const result = await client.query(
      `INSERT INTO users (first_name, last_name, email, password, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id, first_name, last_name, email, created_at`,
      [userData.firstName, userData.lastName, userData.email, userData.password]
    );
    
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Find user by email
export async function findUserByEmail(email: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

// Find user by ID
export async function findUserById(id: number) {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}