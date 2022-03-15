module.exports = function(sequelize, DataTypes){
  let alias = "Image";
  let cols = {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      url:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
  };
    let config = {
      tableName : 'images',
      timestamps : false,
  }

  let Image = sequelize.define(alias, cols, config);

    Image.associate = function(models){
      Image.hasMany(models.Product,{
        foreignKey:"ProductsID",
        as: "products"
      });
      Image.hasMany(models.User,{
        foreignKey:"User",
        as: "users"
      });
    }
    return Image;
  };