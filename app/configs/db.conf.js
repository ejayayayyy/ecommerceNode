const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ecommerce_node", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); 
  }
};

module.exports = { sequelize, DataTypes, connectDB };