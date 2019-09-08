import md5 from 'md5'

export default (sequelize, DataType) => {
  const User = sequelize.define(
    'user',
    {
      id_user: {
        type: DataType.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
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
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataType.STRING(50),
        defaultValue: null,
        set(val) {
          this.setDataValue('password', md5(val))
        },
      },
    },
    {
      tableName: 'user',
      createdAt: false,
      updatedAt: false,
    }
  )
  User.isPassword = (encodedPassword, password) =>
    md5(password) == encodedPassword ? true : false
  User.validate = (login, password) => {
    password = md5(password)
    return User.findOne({
      attributes: ['id_user'],
      where: { login, password },
    })
  }
  User.hasMany(sequelize.models.stock_output_products, {
    foreignKey: 'id_user',
    targetKey: 'id_user',
  })
  sequelize.models.stock_output_products.belongsTo(User, {
    foreignKey: 'id_user',
    targetKey: 'id_user',
  })
  return User
}
