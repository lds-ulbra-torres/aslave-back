export default (sequelize, DataType) => {
    const StockProduct = sequelize.define('stock_products', {
      id_product: {
        type: DataType.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name_product: {
        type: DataType.STRING(250),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      unit_prince: {
        type: DataType.DECIMAL(18,2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      amount: {
        type: DataType.DECIMAL(18,2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      id_group: {
        type: DataType.INTEGER(11),
        references: {
          model: 'stock_product_groups',
          key: 'id_group',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    }
    },{
        tableName: 'stock_products',
        createdAt: false,
        updatedAt: false
    })
    return StockProduct
  }
  