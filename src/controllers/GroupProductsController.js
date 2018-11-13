import db from '../config/db'
import { response, error } from './API'

const  GroupProductModel = db().models.stock_product_groups

export const GroupProductsController  = {
    
    index (req, res) {
        GroupProductModel.findAll()
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    get (req, res) {
        GroupProductModel.findAll({ where : { id_group : req.params.id }})
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },
    store (req, res) {
        GroupProductModel.create(req.body)
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    update (req, res) {
        if(req.body.id_group)
            error(res, {}, 'conteins id_group')
        else
            GroupProductModel.update(req.body, { where : { id_group : req.params.id} })
            .then( result => response(res, result) )
            .catch( erro => error(res, erro) )
    },

    delete (req, res) {
        GroupProductModel.destroy({ where : { id_group : req.params.id} })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },
}

