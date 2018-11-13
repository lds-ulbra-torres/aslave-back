export default (sequelize, DataType) => {
    const StockOutput = sequelize.define('stock_output_products', {
      id_product: {
            type: DataType.INTEGER(11),
            references: {
              model: sequelize.models.stock_product,
              key: 'id_people',
            },
            allowNull: false,
            validate: {
              notEmpty: true,
            },
      },
      id_stock: {
        type: DataType.INTEGER(11),
        references: {
          model: sequelize.mod  els.stock_output,
          key: 'id_people',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      unit_prince_output: {
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
        tableName: 'stock_output',
        createdAt: false,
        updatedAt: false
    })
    return StockOutput
  }
  