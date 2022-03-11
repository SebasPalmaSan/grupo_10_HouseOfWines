module.exports = function(sequelize, DataTypes){
let alias = "User";
let cols = {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      adress:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      birthDate:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar:{
        type: DataTypes.INTEGER,
      },
      admin:{
        type: DataTypes.BOOLEAN
      }
  };

    let config = {
      tableName : 'users',
      timestamps : false,
  };

    let User = sequelize.define(alias, cols, config);

    User.associated= function(models){
      User.belongsTo(models.image,{
        foreignKey:"avatar",
        as: "avatar"
      });
      User.belongsToMany(models.product,{
        foreignKey:"products",
        as: "products"
      });
    }
    return User;
  };