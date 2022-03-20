module.exports = function(sequelize,DataTypes) {
  let alias = 'Category';
  let cols = {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  let config = {
    tableName: "categories",
    timestamps: false,
  }

  let Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
      Category.hasMany(models.Product,{
        foreignKey:'id',
        as: 'products'
      });
    }
    return Category;
}