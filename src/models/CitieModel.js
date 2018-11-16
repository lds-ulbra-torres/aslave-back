export default (sequelize, Datatype) => {
    const Cities = sequelize.define('cities', {
        id_cities: {
            type: Datatype.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        id_states: {
            type: Datatype.INTEGER(11),allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'states',
                key: 'id_states',
            },
        },

        uf: {
            type: Datatype.STRING(2),
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
        updateAt: false
    })

    return Cities

}