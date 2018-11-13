import db from '../config/db'
import { jwtSecret } from '../config/config'
import { response, error } from './API'
import jwt from "jwt-simple";

const  UserModel = db().models.user

export const UsersController  = {
    
    index (req, res) {
        UserModel.findAll({  attributes: { exclude: ['password'] } })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    get (req, res) {
        UserModel.findAll({ where : { id_user : req.params.id },  attributes: { exclude: ['password'] } })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    store (req, res) {
        UserModel.create(req.body)
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    update (req, res) {
        if(req.body.id_user)
            error(res, {}, 'conteins id_user')
        else
            UserModel.update(req.body, { where : { id_user : req.params.id} })
            .then( result => response(res, result) )
            .catch( erro => error(res, erro) )
    },

    delete (req, res) {
        UserModel.destroy({ where : { id_user : req.params.id} })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    validate (req, res) { 
        UserModel.validate(req.body.login, req.body.password)
        .then(result => response(res, {token: jwt.encode( { id: result.id_user } , jwtSecret) } ) )
        .catch( erro => error(res, erro)  )
    }
}

