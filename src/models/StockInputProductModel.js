export default (sequelize, DataType) => {
    const StockInput = sequelize.define('stock_input_products', {
      id_product: {
        type: DataType.INTEGER(11),
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
        type: DataType.INTEGER(11),
        primaryKey: true,
        references: {
          model: 'stock_input',
          key: 'id_stock',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      unit_prince_input: {
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
    return StockInput
  }
  