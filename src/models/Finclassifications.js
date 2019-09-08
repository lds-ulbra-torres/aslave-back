export default (sequelize, DataType) => {
  const FinClassifications = sequelize.define('fin_classifications', {
    id_classification: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowIncrement: true,
      validate: {
        notEmpty: true,
      },
    },

    name_classification: {
      type: DataType.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    classifation_type: {
      type: DataType.STRING(1),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })

  return FinClassifications
}
