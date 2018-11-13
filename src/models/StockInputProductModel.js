export default (sequelize, DataType) => {
    const StockInput = sequelize.define('stock_input_products', {
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
          model: sequelize.models.stock_input,
          key: 'id_people',
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
        tableName: 'stock_output',
        createdAt: false,
        updatedAt: false
    })
    return StockInput
  }
  