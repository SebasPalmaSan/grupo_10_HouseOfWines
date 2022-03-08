module.exports = function(sequelize, DataTypes){
  let alias = "Categorie";
  let cols = {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
  };
    let config = {
      tableName : "categories",
      timestamp : false
    }


  let Categorie = sequelize.define(alias, cols, config);

    Categorie.associated= function(models){
      Categorie.hasMany(models.product,{
        foreignKey:"products",
        as: "products"
      }); 
    }

    return Categorie;
};