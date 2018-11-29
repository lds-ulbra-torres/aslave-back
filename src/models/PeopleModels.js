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
            unique: true
        }, 
        rg: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        documment: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        adress: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        number: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        neighborhood: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cep:{
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        id_cities: { 
            type: DataType.INTEGER(4),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'cities',
                key: 'id_cities',
            },
        },
    },
        {
            tableName: 'people',
            createdAt: false,
            updatedAt: false
        });

    return People;

}