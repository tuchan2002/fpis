const dbConfig = require("../configs/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    port: dbConfig.PORT,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Mysql Connected.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};

db.sequelize = sequelize;

db.User = require("./user.js")(sequelize, DataTypes);
db.Product = require("./product.js")(sequelize, DataTypes);

// Associations
const createOneToManyRelation = function (manyModel, oneModel, foreignKey, as) {
  oneModel.hasMany(manyModel, {
    foreignKey,
    as,
  });

  manyModel.belongsTo(oneModel, {
    foreignKey,
    as,
  });
};

createOneToManyRelation(db.Product, db.User, "user_id", "user_product");

db.sequelize.sync({ alter: true }).then(() => {
  console.log("All models were synchronized successfully.");
});

module.exports = db;
