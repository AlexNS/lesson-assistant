import 'dotenv/config';

export const DbConfig = {
    hostname: process.env['DB_HOSTNAME'] ?? 'localhost',
    username: process.env['DB_USERNAME'] ?? '',
    password: process.env['DB_PASSWORD'] ?? '',
    database: process.env['DB_DATABASE'] ?? 'la',
    dialect: process.env['DB_DIALECT'] ?? 'postgres',
}

export const AuthConfig = {
    saltRounds: process.env['SALT_ROUNDS'] ?? 5,
    jwtSecret: process.env['JWT_SECRET'] ?? 'hello'
}

export const UploadPath = process.env['UPLOAD_PATH'] ?? './uploads';


