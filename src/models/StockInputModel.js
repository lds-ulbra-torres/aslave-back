export default (sequelize, DataType) => {
    const StockInput = sequelize.define('stock_input', {
      id_stock: {
        type: DataType.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      input_date: {
        type: DataType.DATE(),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      input_type: {
        type: DataType.INTEGER(11),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sum_value: {
        type: DataType.DECIMAL(18,2),
        defaultValue:null
      },
      id_people: {
        type: DataType.INTEGER(11),
        references: {
          model: 'people',
          key: 'id_people',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    }
    },{
        tableName: 'stock_input',
        createdAt: false,
        updatedAt: false
    })
    return StockInput
  }
  