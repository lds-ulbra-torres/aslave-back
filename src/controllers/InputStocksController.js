import { response, error } from './API'
import Controller from './Controller'

import { 
    stock_input as StockInputModel,
    people as PeopleModel
} from '../models'

export class InputStocksController extends Controller {
    constructor (){
        super()
        this.model = StockInputModel
        this.id = 'id_stock'
    }

    index (req, res) {
        StockInputModel.findAll({ include: [{
            model: PeopleModel,
            attributes: ['name']
        }] })
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    }

    get (req, res) {
        StockInputModel.getOne(req.params.id)
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    }

    store (req, res) {  
        StockInputModel.creator(req.body)
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    }

    update (req, res) {
        if(req.body.amount || req.body.id_group || req.body.id_product )
            error(res, {}, "contains amount or id_group or id_product ")
        else
            StockInputModel.updater(req.body, req.params.id)
            .then( result => response(res, result) )
            .catch( err => error(res, err) )
    }

    delete (req, res) {
        StockInputModel.delete(req.params.id)
        .then( result => response(res, result) )
        .catch( err => error(res, err) )
    }
}
