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
            type: Datatype.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true,
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

    })

    return Cities

}