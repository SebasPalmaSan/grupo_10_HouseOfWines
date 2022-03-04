module.exports = function(sequelize, DataTypes){
  let categorie = sequelize.define('categorie', {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
  },{
    tableName : 'categories',
    timestamp : false,
  });
    categorie.associated= function(models){
      categorie.hasMany(model.product,{
        foreignKey:"products",
        as: "products"
      }); 
    }
    return categorie;
  };