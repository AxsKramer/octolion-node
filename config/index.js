require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 4000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
  authAdminPassword: process.env.AUTH_AMIN_PASSWORD,
  authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
  authJWTSecret: process.env.AUTH_JWT_SECRET,
}

module.exports = config;