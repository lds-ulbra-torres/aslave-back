import db from '../config/db'
import { response, error } from './API'

const  StockInputModel = db().models.stock_input

export const InputStocksController  = {
    
    index (req, res) {
        StockInputModel.findAll({ include: [{
            model: db().models.people,
            attributes: ['name']
        }] })
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    },

    get (req, res) {
        StockInputModel.getOne(req.params.id)
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    },

    store (req, res) {  
        StockInputModel.creator(req.body)
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    },

    update (req, res) {
        if(req.body.amount || req.body.id_group || req.body.id_product )
            error(res, {}, "contains amount or id_group or id_product ")
        else
            StockInputModel.updater(req.body, req.params.id)
            .then( result => response(res, result) )
            .catch( err => error(res, err) )
    },

    delete (req, res) {
        StockInputModel.destroy({ where : { id_stock : req.params.id} })
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    },
}
