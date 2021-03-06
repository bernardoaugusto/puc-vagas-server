require('dotenv/config');

module.exports = [
    {
        name: "default",
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'pucvagas',
        entities: [`./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/modules/**/infra/typeorm/entities/*.{ts,js}`],
        migrations: [`./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/shared/infra/typeorm/{migrations,seed}/*.{ts,js}`],
        cli: {
          "migrationsDir" : `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/shared/infra/typeorm/migrations`
        }
    },
    {
      name: "mongo",
      type : "mongodb",
      host : process.env.MONGO_HOST || 'localhost',
      port : process.env.MONGO_PORT || 27017,
      database : process.env.MONGO_DBNAME || 'pucvagas',
      useUnifiedTopology: true,
      entities : [
        `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/modules/**/infra/typeorm/schemas/*.{ts,js}`
      ]
    }
];
