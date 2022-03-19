module.exports = function(sequelize, DataTypes){
  let alias = "User";
  let cols = {
        id:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
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
        avatar:{
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        admin:{
          type: DataTypes.BOOLEAN,
        }
    };
  
      let config = {
        tableName : 'users',
        timestamps : false,
    };
  
      let User = sequelize.define(alias, cols, config);
  
      User.associate = function(models){
        User.belongsTo(models.Image,{
          foreignKey:"avatar",
          as: "image"
        });
        User.belongsToMany(models.Product,{
          foreignKey:"userID",
          through: "Users-Products",
          otherKey:"productID",
          as: "products",
          timestamps: false
        });
      }
      return User;
    };