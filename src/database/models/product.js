module.exports = function(sequelize, DataTypes){
  let alias = "Product";
  let cols = {
        id:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        category:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description:{
          type: DataTypes.TEXT,
          allowNull: false,
        },
        review:{
          type: DataTypes.TEXT,
          allowNull: false,
        },
        discount:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        images:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
    };
  
    let config = {
      tableName : 'products',
      timestamps : false,
    };
  
    let Product = sequelize.define(alias, cols, config);
  
    Product.associate = function(models){
      Product.belongsTo(models.Image,{
        foreignKey:"images",
        as: "image"
      });
      Product.belongsTo(models.Category,{
        foreignKey:"category",
        as: "categories"
      });
      Product.belongsToMany(models.User,{
        foreignKey:"productID",
        through: "Users-Products",
        otherKey: "userID",
        as: "users",
        timestamps: false
      })
    }
    return Product;
};    