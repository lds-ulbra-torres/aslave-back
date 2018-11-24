export default (sequelize, DataType) => {
  const StockOutput = sequelize.define('stock_output_products', {
    id_product: {
      type: DataType.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    id_stock: {
      type: DataType.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    unit_price_output: {
      type: DataType.DECIMAL(18,2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount_output: {
      type: DataType.DECIMAL(18,2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },{
      tableName: 'stock_output_products',
      createdAt: false,
      updatedAt: false
  })
  sequelize.models.people.hasOne(StockOutput, {foreignKey : 'id_product', targetKey:'id_product' })
  sequelize.models.stock_output.hasOne(StockOutput, {foreignKey : 'id_stock', targetKey:'id_stock' })
  return StockOutput
}
