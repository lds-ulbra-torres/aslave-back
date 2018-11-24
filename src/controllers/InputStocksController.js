import db from '../config/db'
import { response, error } from './API'

const  StockInputModel = db().models.stock_input

export const InputStocksController  = {
    
    index (req, res) {
        StockInputModel.findAll()
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    get (req, res) {
        StockInputModel.getOne(req.params.id)
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    store (req, res) {  
        StockInputModel.creator(req.body)
        .then( respo => response(res, respo) )
        .catch( erro => error(res, erro) )
    },

    update (req, res) {
        if(req.body.amount || req.body.id_group || req.body.id_product )
            error(res, {}, "conteins amount or id_group or id_product ")
        else
            StockInputModel.updator(req.body, req.params.id)
            .then( respo => response(res, respo) )
            .catch( erro => error(res, erro) )
    },

    delete (req, res) {
        StockInputModel.destroy({ where : { id_stock : req.params.id} })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },
}
