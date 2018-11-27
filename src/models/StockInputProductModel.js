export default (sequelize, DataType) => {
  const StockInput = sequelize.define('stock_input_products', {
    id_product: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    id_stock: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    unit_price_input: {
      type: DataType.DECIMAL(18,2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount_input: {
      type: DataType.DECIMAL(18,2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },{
      tableName: 'stock_input_products',
      createdAt: false,
      updatedAt: false
  })
  sequelize.models.stock_input.hasMany(StockInput, {foreignKey : 'id_stock', targetKey:'id_stock' })
  
  //StockInput.hasOne(sequelize.models.stock_input, {foreignKey : 'id_stock', targetKey:'id_stock' })
  return StockInput
}
