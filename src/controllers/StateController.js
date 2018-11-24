import db from '../config/db'
import { response, error } from './API'

const StatesModel = db().models.states;

export const StatesController = {

    index(req, res) {
        StatesModel.findAll()
            .then(result => response(res, result))
            .catch(error => error(res, erro))
    },

    store(req, res) {
        StatesModel.create(req.body)
            .then(result => response(res, erro)
            )
            .catch(erro => error(res, erro))
    }
}