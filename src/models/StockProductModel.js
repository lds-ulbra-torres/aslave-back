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
    unit_price: {
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
  StockProduct.hasOne(sequelize.models.stock_input_products, {foreignKey : 'id_product', targetKey:'id_product' })
  StockProduct.hasOne(sequelize.models.stock_output_products, {foreignKey : 'id_product', targetKey:'id_product' })
  sequelize.models.stock_output_products.hasMany(StockProduct, {foreignKey : 'id_product', targetKey:'id_product' })
  sequelize.models.stock_input_products.hasMany(StockProduct, {foreignKey : 'id_product', targetKey:'id_product' })  
  StockProduct.belongsTo(sequelize.models.stock_product_groups, {foreignKey : 'id_group', targetKey:'id_group' })
  StockProduct.belongsTo(sequelize.models.stock_input_products, {foreignKey : 'id_product', targetKey:'id_product' })  
  StockProduct.getAll = () => {
    return StockProduct.findAll({ 
      include : [{
        model: sequelize.models.stock_product_groups,
        attributes: ['name_group'],
      }] 
    })
  }
  StockProduct.getById = id_product => {
    return StockProduct.findAll({ 
      where : { id_product },
      include : [{
        model: sequelize.models.stock_product_groups,
        attributes: ['name_group'],
      }] 
    })
  }
  return StockProduct
}
