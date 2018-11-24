import db from '../config/db'
import { response, error } from './API'

const  StockOutputModel = db().models.stock_output_products

export const OutputStocksController  = {
    
    index (req, res) {
        StockOutputModel.findAll({attributes: ['id_stock','createdAt', 'unit_price_output'], include: [{
            model: db().models.user,
            attributes: ['full_name']
        }] })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    get (req, res) {
        StockOutputModel.findOne({ where : { id_stock : req.params.id },
            include: [{ all: true, nested: true, attributes: { exclude: ['password', 'login'] } }] 
        })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    store (req, res) {  
        StockOutputModel.create(req.body)
        .then( respo => response(res, respo) )
        .catch( erro => error(res, erro) )
    },

    update (req, res) {
        StockOutputModel.update(req.body, { where: { id_stock : req.params.id } })
        .then( respo => response(res, respo) )
        .catch( erro => error(res, erro) )
    },

    delete (req, res) {
        StockOutputModel.destroy({ where : { id_stock : req.params.id} })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },
}
