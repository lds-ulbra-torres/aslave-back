import db from '../config/db'
import { response, error } from './API'

const  UserModel = db().models.user

export const UsersController  = {
    
    index (req, res) {
        UserModel.findAll()
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    store (req, res) {
        UserModel.create(req.body)
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    }
}

