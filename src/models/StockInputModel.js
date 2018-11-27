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
    return StockInput.findAll({ where: { id_stock }, include: [{
      model: sequelize.models.stock_input_products,
    }] })
  }
  StockInput.creator = data => {
    return StockInput.create(data)
    .then( async result => {
        let res = []
        await data.stock_input_products.map( obj => {
            obj.id_stock = result.id_stock
            sequelize.models.stock_input_products.create(obj)
            .then(response => res.push(response))
            .catch(error => res.push(error))
        })            
        return res
    })
  }
  StockInput.updator = ( data, id_stock ) => {
    return StockInput.update(data, { where : { id_stock } })
    .then( () => {
        return sequelize.models.stock_input_products.findAll({ where : { id_stock } })
        .then( async obj => {
            let res = []
            let stock_input_products = JSON.stringify(data.stock_input_products)

            await data.stock_input_products.map( (item, index) => {

                if ( stock_input_products.indexOf(JSON.stringify(obj[index])) === -1 && obj[index] != null)
                    sequelize.models.stock_input_products.destroy({ 
                        where : { id_stock , id_product : obj[index].id_product }
                    })

            })

            obj = JSON.stringify(obj)
            
            await data.stock_input_products.map( async item => {

                if (  obj.indexOf(JSON.stringify(item)) === -1)
                  await sequelize.models.stock_input_products.create(item)
                  .then(response => res.push(response))
                  .catch( error => res.push(error))
            })

            return res
        })
    })
  }
  return StockInput
}
