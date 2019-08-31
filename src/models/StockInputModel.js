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
0
    products.map( product => {
       total += product.amount_input * product.unit_price_input
    })

    return total
  }


  // METHODS 
  StockInput.creator = async data => {
    try {
      const inputCreate = StockInput.create(data)
      await data.stock_input_products.map( async inputProducts => {
        try {
          inputProducts.id_stock = inputCreate.id_stock
          await sequelize.models.stock_input_products.create(inputProducts)
        } catch(error) {
          console.log(error)
        }
      })

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

  return StockInput
}
