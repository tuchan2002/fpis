module.exports = {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    dialect: 'mysql',

    pool: {
        max: 8,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
