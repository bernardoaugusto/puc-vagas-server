require('dotenv/config');

module.exports = [
    {
        name: "default",
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'docker',
        database: process.env.DB_NAME || tindev,
        entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
        migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
        cli: {
          "migrationsDir" : "./src/shared/infra/typeorm/migrations"
        }
    }
];
