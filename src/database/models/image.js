module.exports = function(sequelize, DataTypes){
  let image = sequelize.define('image', {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      url:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
  },{
    tableName : 'images',
    timestamp : false,
  });
    image.associated= function(models){
      image.hasMany(model.product,{
        foreignKey:"products",
        as: "products"
      });
      image.hasMany(model.user,{
        foreignKey:"users",
        as: "users"
      });
    }
    return image;
  };