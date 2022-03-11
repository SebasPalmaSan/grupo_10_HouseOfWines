module.exports = function(sequelize, DataTypes){
  let alias = "Image";
  let cols = {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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

    Image.associated= function(models){
      Image.hasMany(models.product,{
        foreignKey:"products",
        as: "products"
      });
      Image.hasMany(models.user,{
        foreignKey:"users",
        as: "users"
      });
    }
    return Image;
  };