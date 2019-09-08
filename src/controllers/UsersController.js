import { jwtSecret } from '../config/config'
import { response, error } from './API'
import jwt from "jwt-simple"
import md5 from 'md5'

import Controller from './Controller'
import { user as UserModel } from '../models'

export class UsersController extends Controller {
    constructor (){
        super()
        this.model = UserModel
        this.id = 'id_user'
    }

    index (req, res) {
        this.model.findAll({  attributes: { exclude: ['password'] } })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    }

    get (req, res) {
        this.model.findAll({ where : { id_user : req.params.id },  attributes: { exclude: ['password'] } })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    }

    validate (req, res) { 
        let login = req.body.login, password = req.body.password
        password = md5(password)
        
        this.model.findOne({
          attributes: ['id_user'],
          where : { login, password }
        })
        .then(result => {
            if(result)
                response(res, {token: jwt.encode( { id: result.id_user } , jwtSecret) } ) 
            else
                error(res, {}, 'usuário ou senha incorreta')
        })
        .catch( erro => error(res, {}, 'usuário ou senha incorreta')  )
    }
}

