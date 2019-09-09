import { error } from './API'
import Controller from './Controller'

import {
  stock_products as ProductsModel,
  stock_input_products as InputProductsModel,
} from '../models'

export class ProductsController extends Controller {
  constructor() {
    super(ProductsModel, 'id_group')
  }

  get(req, res) {
    this.actionModel('getById', res, req.params.id)
  }

  getByCategory(req, res) {
    this.actionModel('findAll', res, { where: { id_group: req.params.id } })
  }

  store(req, res) {
    req.body.amount = 0
    this.actionModel('create', res, req.body)
  }

  update(req, res) {
    if (req.body.amount || req.body.id_product)
      error(res, {}, 'contains amount or id_product ')
    else
      this.actionModel(
        'update',
        res,
        (req.body, { where: { id_product: req.params.id } })
      )
  }

  delete(req, res) {
    InputProductsModel.count({ where: { id_product: req.params.id } })
      .then(count => {
        if (count === 0)
          this.actionModel(
            'destroy',
            res,
            (req.body, { where: { id_product: req.params.id } })
          )
        else error(res, {}, 'Product is being used')
      })
      .catch(err => error(res, err))
  }
}
