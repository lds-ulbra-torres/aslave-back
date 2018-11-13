export default (sequelize, DataType) => {
    const StockProductGroup = sequelize.define('stock_product_groups', {
      id_group: {
        type: DataType.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name_group: {
        type: DataType.STRING(250),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },{
        tableName: 'stock_product_groups',
        createdAt: false,
        updatedAt: false
    })
    return StockProductGroup
  }
  