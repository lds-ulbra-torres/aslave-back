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
//  StockInput.hasOne(sequelize.models.stock_input_products, {foreignKey : 'id_stock', targetKey:'id_stock' })
  sequelize.models.people.hasMany(StockInput, {foreignKey : 'id_people', targetKey:'id_people' })
  StockInput.belongsTo(sequelize.models.people, {foreignKey : 'id_people', targetKey:'id_people' })
  StockInput.getOne = id_stock => {
    return StockInput.findAll({ where : {id_stock}, include: [{
        model: sequelize.models.stock_input_products,
        include: [{
          model: sequelize.models.stock_products
        }]
      }]
    });
   
  }

  // Utils
  const equals = (productA, productB) => {
    if ( productA.id_stock === productB.id_stock && productA.id_product === productB.id_product)
      if (productA.unit_price_input === productB.unit_price_input && productA.amount_input === productB.amount_input)
        return true

    return false
  }

  const containsAButNotB = (a = [], b = []) => a.filter( itemA => {
    if (!b.find( itemB => equals(itemB, itemA)))
      return itemA  
  })

  const sumValue = (products) => {
    let total = 0

    products.map( product => {
       total += product.amount_input * product.unit_price_input
    })

    return total
  }


  // METHODS 
  StockInput.creator = async data => {
    try {
      const inputCreate = await StockInput.create(data)
      await sequelize.models.stock_input_products.addProducts(data.stock_input_products, inputCreate.id_stock)

      return true

    } catch(error) {
      console.log(error)
      return error 
    }
  }

  StockInput.updater = async ( data, id_stock ) => {
    try {
      const productUpdate = {
        input_date: data.input_date,
        input_type: data.input_type,
        sum_value: sumValue(data.stock_input_products),
        id_people: data.id_people,
      }

      await StockInput.update(productUpdate, { where : { id_stock } })
      
      // SELECT ALL TABLE WITH PRODUCTS FROM STOCK_INPUT
      const inputProducts = await sequelize.models.stock_input_products.findAll({ where : { id_stock } })
      
      // PARSE
      let productDB = JSON.parse(JSON.stringify(inputProducts))
      let productReq = data.stock_input_products

      // FIND THE DIFFERENCE BETWEEN LIST
      let deleteProducts = containsAButNotB(productDB, productReq)
      let addProducts = containsAButNotB(productReq, productDB)

      // UPGRADES STOCKED PRODUCTS
      await sequelize.models.stock_input_products.deleteProducts(deleteProducts, id_stock)
      await sequelize.models.stock_input_products.addProducts(addProducts, id_stock)

      return true
    } catch (error) {
      console.log(error)
      return error
    }
  }

  StockInput.delete = async id_stock => {
    try {
      // SELECT ALL INPUT PRODUCTS
      let inputProducts = await sequelize.models.stock_input_products.findAll({ where : { id_stock } })
        
      inputProducts = JSON.parse(JSON.stringify(inputProducts))
        
      inputProducts.map( async inputProduct => {
        // SELECT INPUT_STOCK'S PRODUCTS
        let stockProduct = await sequelize.models.stock_products.findOne({ where : { id_product : inputProduct.id_product } })
        
        stockProduct = JSON.parse(JSON.stringify(stockProduct))
        
        const productUpdate = {
          amount :  stockProduct.amount - inputProduct.amount_input
        }
  
        sequelize.models.stock_products.update( productUpdate, { where : { id_product: stockProduct.id_product }})
      })
      
      const stockInputDelete = await StockInput.destroy({ where : { id_stock } })

      return stockInputDelete
    } catch(error) {
      console.log(error)
      return error
    }
  }

  return StockInput
}
