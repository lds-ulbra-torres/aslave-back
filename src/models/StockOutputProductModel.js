export default (sequelize, DataType) => {
  const StockOutput = sequelize.define('stock_output_products', {
    id_stock: {
      type: DataType.INTEGER(20),
      autoIncrement: true,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    id_product: {
      type: DataType.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    id_user: {
      type: DataType.INTEGER(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    unit_price_output: {
      type: DataType.DECIMAL(18, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount_output: {
      type: DataType.DECIMAL(18, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    unit_measurement: {
      type: DataType.INTEGER(),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.STRING(),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })
  return StockOutput
}
