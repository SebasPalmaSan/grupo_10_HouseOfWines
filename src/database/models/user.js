module.exports = function(sequelize, DataTypes){
  let user = sequelize.define('user', {
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      avatar:{
        type: DataTypes.INTEGER,
      },
      admin:{
        type: DataTypes.BOOLEAN
      }
  },{
    tableName : 'users',
    timestamp : false,
  });
    user.associated= function(models){
      user.belongsTo(models.image,{
        foreignKey:"avatar",
        as: "avatar"
      });
      user.belongsToMany(model.image,{
        foreignKey:"products",
        as: "products"
      });
    }
    return user;
  };