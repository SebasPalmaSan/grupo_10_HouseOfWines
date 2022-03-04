module.exports = function(sequelize, DataTypes){
  let product = sequelize.define('product', {
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
  },{
    tableName : 'products',
    timestamp : false,
  });
    product.associated= function(models){
      product.hasMany(model.image,{
        foreignKey:"images",
        as: "images"
      });
      product.hasMany(model.categorie,{
        foreignKey:"categories",
        as: "categories"
      });
    }
    return product;
  };