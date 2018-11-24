export default (sequelize, DataType) => {

    const States = sequelize.define('states', {
        id_states: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncremnt: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        UF: {
            type: DataType.STRING(2),
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
    }, {
            tableName: 'states',
            createdAt: false,
            updatedAt: false
        })

    return States;

}