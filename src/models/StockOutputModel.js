export default (sequelize, DataType) => {
    const StockOutput = sequelize.define('stock_output', {
      id_stock: {
        type: DataType.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      output_date: {
        type: DataType.DATE(),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sum_value: {
        type: DataType.DECIMAL(18,2),
        defaultValue:0.0
      },
      description: {
        type: DataType.STRING(),
        defaultValue:null
      },
      id_people: {
        type: DataType.INTEGER(11),
        references: {
          model: sequelize.models.people,
          key: 'id_people',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    }
    },{
        tableName: 'stock_output',
        createdAt: false,
        updatedAt: false
    })
    return StockOutput
  }
  