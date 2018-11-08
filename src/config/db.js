import Sequelize from 'sequelize'
import autoLoadModel from '../src/helpers/auto-load-model'

let db = null

module.exports = app => {
  if (!db) {
    const config = app.config.config
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )
    db = {
      sequelize,
      Sequelize,
      models: {}
    }
    db.models = autoLoadModel(sequelize)
  }
  
  return db
}
