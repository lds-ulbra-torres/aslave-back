export default (sequelize, DataType) => {
  const UnitMeansure = sequelize.define(
    'unit_meansure',
    {
      id_unit_meansure: {
        type: DataType.INTEGER(20),
        autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataType.STRING(3),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'unit_meansure',
      createdAt: false,
      updatedAt: false,
    }
  )
  UnitMeansure.hasMany(sequelize.models.stock_output_products, {
    foreignKey: 'unit_measurement',
    targetKey: 'id_unit_meansure',
  })
  sequelize.models.stock_output_products.hasOne(UnitMeansure, {
    foreignKey: 'id_unit_meansure',
    targetKey: 'unit_measurement',
  })
  return UnitMeansure
}
