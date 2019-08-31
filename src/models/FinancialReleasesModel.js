export default (sequelize , DataType) =>{
    const FinancialReleases = sequelize.define('financial_releases', {
        id_financial_release:{
            type: DataType.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            calidate: {
                notEmpty: true,
            },
        },

        id_people :{
            type: DataType.INTEGER(11),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        id_classification:{
            type: DataType.INTEGER(11),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        type_mov:{
            type: DataType.STRING(1),
            allowNull: false,
            validade: {
                notEmpty: true,
            }
        },
    
        num_doc:{
            type: DataType.INTEGER(11),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        date_financial_release:{
            type: DataType.DATE(),
            allowNull: false,
            validade:{
                notEmpty: true,
            },
        },

        value:{
            type: DataType.DOUBLE(),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },


        due_date_pay: {
           type: DataType.DATE(),
           allowNUll: false,
           validate: {
               notEmpty: true,
           },
        },
        historic: {
            type: DataType.STRING(400),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

    })
    sequelize.models.fin_classifications.hasMany(FinancialReleases, {foreignKey : 'id_classification', targetKey:'id_classification' })
    FinancialReleases.belongsTo(sequelize.models.fin_classifications, {foreignKey : 'id_classification', targetKey:'id_classification' })
    FinancialReleases.search = query => {
        return FinancialReleases.findAll({ 
            include : [{
              model: sequelize.models.fin_classifications
            }],
            where : { }
          })
    }

    return FinancialReleases
}