import db from '../config/db'
import { response, error } from './API'

const  ProductsModel = db().models.stock_products

export const ProductsController  = {
    
    index (req, res) {
        ProductsModel.getAll()
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    get (req, res) {
        ProductsModel.getById( req.params.id )
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    getByCategory (req, res) {
        ProductsModel.findAll({ where : { id_group : req.params.id }})
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    store (req, res) {
        req.body.amount = 0
        ProductsModel.create(req.body)
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    update (req, res) {
        if(req.body.amount || req.body.id_product )
            error(res, {}, "conteins amount or id_product ")
        else
            ProductsModel.update(req.body, { where : { id_product : req.params.id} })
            .then( result => response(res, result) )
            .catch( erro => error(res, erro) )
    },

    delete (req, res) {
        ProductsModel.destroy({ where : { id_product : req.params.id} })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },
}
