export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  // placeholders for Google and DB credentials
  google: {
    credentialsPath: process.env.GOOGLE_CREDENTIALS_PATH || '',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
};
