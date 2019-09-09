import { error } from './API'
import Controller from './Controller'

import {
  stock_input as StockInputModel,
  people as PeopleModel,
} from '../models'

export class InputStocksController extends Controller {
  constructor() {
    super(StockInputModel, 'id_stock')
  }

  index(req, res) {
    this.actionModel('findAll', res, {
      include: [
        {
          model: PeopleModel,
          attributes: ['name'],
        },
      ],
    })
  }

  get(req, res) {
    this.actionModel('getOne', res, req.params.id)
  }

  store(req, res) {
    this.actionModel('creator', res, req.body)
  }

  update(req, res) {
    if (req.body.amount || req.body.id_group || req.body.id_product)
      error(res, {}, 'contains amount or id_group or id_product ')
    else this.actionModel('updater', res, (req.body, req.params.id))
  }

  _delete(req, res) {
    this.actionModel('delete', res, req.params.id)
  }
}
