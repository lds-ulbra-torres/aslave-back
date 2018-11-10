export default (sequelize, DataType) => {
    const User = sequelize.define('user', {
      id_user: {
        type: DataType.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      full_name: {
        type: DataType.STRING(45),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      login: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataType.STRING(50),
        defaultValue:null
      },
      id_departament: {
        type: DataType.INTEGER(11),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    },
      {
        tableName: 'user',
        createdAt: false,
        updatedAt: false
      })
    return User
  }
  