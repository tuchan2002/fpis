module.exports = {
    USER: process.env.USER_NAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE: process.env.DATABASE_NAME,
    PORT: process.env.DATABASE_PORT,
    HOST: process.env.DATABASE_HOST,
    dialect: 'mysql',

    pool: {
        max: 8,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
