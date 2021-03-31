require('dotenv/config');

module.exports = [
    {
        name: "default",
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'docker',
        database: process.env.DB_NAME || 'tindev',
        entities: [`./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/modules/**/infra/typeorm/entities/*.{ts,js}`],
        migrations: [`./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/shared/infra/typeorm/{migrations,seed}/*.{ts,js}`],
        cli: {
          "migrationsDir" : `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/shared/infra/typeorm/migrations`
        }
    },
    {
      name: "mongo",
      type : "mongodb",
      host : 'localhost',
      port :  27017,
      database : 'tindev',
      useUnifiedTopology: true,
      entities : [
        `src/modules/**/infra/typeorm/schemas/*.ts`
      ]
    }
];
