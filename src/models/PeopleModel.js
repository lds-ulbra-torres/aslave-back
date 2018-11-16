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
        name: DataType.STRING,
        cpf_cnpj: {
            type: DataType.DECIMAL(11, 0),
            unique: true
        },
        rg: DataType.STRING,
        documment: DataType.STRING,
        adress: DataType.STRING,
        number: DataType.STRING,
        neighborhood: DataType.STRING,
        cep: DataType.STRING,
        id_cities: {
            type: DataType.INTEGER,

        },
    },
        {
            tableName: 'people',
            createdAt: false,
            updatedAt: false
        });

    return People;

}