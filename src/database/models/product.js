module.exports = function(sequelize, DataTypes){
let alias = "Product";
let cols = {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      image:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  };

  let config = {
    tableName : 'products',
    timestamp : false,
  };

  let Product = sequelize.define(alias, cols, config);

    Product.associated= function(models){
      Product.hasMany(models.image,{
        foreignKey:"images",
        as: "images"
      });
      Product.hasMany(models.categorie,{
        foreignKey:"categories",
        as: "categories"
      });
    }
    return Product;
  };