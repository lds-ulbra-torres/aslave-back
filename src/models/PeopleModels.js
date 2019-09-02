export default (sequelize, DataType) => {
    const People = sequelize.define('people', {
        id_people: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cpf_cnpj:{
            type: DataType.STRING(14),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [11, 14],
            },
        }, 
        rg: {
            type: DataType.STRING(20),
            defaultValue: ''
        },
        documment: {
            type: DataType.STRING(20),
        },
        adress: {
            type: DataType.STRING(20),
            defaultValue: ''
        },
        number: {
            type: DataType.STRING(20),
            allowNull: false,
            defaultValue: ''
        },
        neighborhood: {
            type: DataType.STRING(20),
            defaultValue: ''
        },
        cep:{
            type: DataType.STRING(20),
            defaultValue: ''
        },
        phone1:{
            type: DataType.STRING(20),
            defaultValue: ''
        },
        phone2:{
            type: DataType.STRING(20),
            defaultValue: ''
        },
        city: { 
            type: DataType.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        state : {
            type: DataType.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    },
    {
        tableName: 'people',
        createdAt: false,
        updatedAt: false
    })
    
    sequelize.models.financial_releases.belongsTo(People, {foreignKey : 'id_people', targetKey:'id_people' })    
    People.getById = id_people => {
        return People.findAll({ 
          where : { id_people }
        })
      }
    return People;

}