export default (sequelize, DataType) => {
  const StockInput = sequelize.define(
    'stock_input_products',
    {
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
        type: DataType.DECIMAL(18, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      amount_input: {
        type: DataType.DECIMAL(18, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'stock_input_products',
      createdAt: false,
      updatedAt: false,
    }
  )
  sequelize.models.stock_input.hasMany(StockInput, {
    foreignKey: 'id_stock',
    targetKey: 'id_stock',
  })

  StockInput.deleteProducts = async (products, id_stock) =>
    await products.map(async product => {
      try {
        await StockInput.destroy({
          where: { id_stock, id_product: product.id_product },
        })
      } catch (error) {
        console.log(error)
      }
    })

  StockInput.addProducts = async (products, id_stock) =>
    await products.map(async product => {
      try {
        product.id_stock = id_stock
        await StockInput.create(product)
      } catch (error) {
        console.log(error)
      }
    })

  return StockInput
}
