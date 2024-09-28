const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ecommerce_node', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const User = require('./User')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);
const Address = require('./Address')(sequelize, DataTypes);
const Payment = require('./Payment')(sequelize, DataTypes);

const applyAssociations = (sequelize) => {
  const { User, Product, Category, Order, OrderItem, Address, Payment } = sequelize.models;

  User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  User.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });

  Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Product.belongsToMany(Order, { through: OrderItem, as: 'orders' });

  Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

  Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Order.belongsToMany(Product, { through: OrderItem, as: 'products' });

  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });

  Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
};

applyAssociations(sequelize);

// Export sequelize and models
module.exports = { sequelize, Sequelize };