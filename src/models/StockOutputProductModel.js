export default (sequelize, DataType) => {
    const StockOutput = sequelize.define('stock_output_products', {
      id_product: {
        type: DataType.INTEGER(20),
        primaryKey: true,
        references: {
          model: 'stock_products',
          key: 'id_product',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      id_stock: {
        type: DataType.INTEGER(20),
        primaryKey: true,
        references: {
          model: 'stock_output',
          key: 'id_stock',
        },
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
    return StockOutput
  }
  