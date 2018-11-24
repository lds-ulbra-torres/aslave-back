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
            type: DataType.DECIMAL(11, 0),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
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
        id_cities: { 
            type: DataType.INTEGER(4),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    },
    {
        tableName: 'people',
        createdAt: false,
        updatedAt: false
    })
    sequelize.models.cities.hasOne(People, {foreignKey : 'id_cities', targetKey:'id_cities' })
    return People;

}