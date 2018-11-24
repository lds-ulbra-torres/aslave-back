export default (sequelize, DataType) => {
    const Cities = sequelize.define('cities', {
        id_cities: {
            type: DataType.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        id_states: {
            type: DataType.INTEGER(11),allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'states',
                key: 'id_states',
            },
        },

        uf: {
            type: DataType.STRING(2),
        },

        name: {
            type: DataType.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

    },{
        tableName: 'cities',
        createdAt: false,
        updatedAt: false
    })

    return Cities

}