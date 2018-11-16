import db from '../config/db'
import { response, error } from './API'

const CitiesModel = db().models.cities;

export const CitiesController = {
 
    index(req, res) {
        CitiesModel.findAll()
            .then(result => response(res, result))
            .catch(error => error(res, erro))
    },

    store(req, res) {
        CitiesModel.create(req.body)
            .then(result => response(res, erro)
            )
            .catch(erro => error(res, erro))
    }
}