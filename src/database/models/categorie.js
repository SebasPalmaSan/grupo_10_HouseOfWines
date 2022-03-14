module.exports = function(sequelize, DataTypes){
  let alias = "Categorie";
  let cols = {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
  };
    let config = {
      tableName : "categories",
      timestamps : false
    }


  let Categorie = sequelize.define(alias, cols, config);

    Categorie.associate = function(models){
      Categorie.hasMany(models.Product,{
        foreignKey:"ProductsID",
        as: "products"
      }); 
    }

    return Categorie;
};