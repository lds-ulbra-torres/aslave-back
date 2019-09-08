import { response, error } from './API'
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
    this.model
      .getById(req.params.id)
      .then(result => response(res, result))
      .catch(err => error(res, err))
  }

  getByCategory(req, res) {
    this.model
      .findAll({ where: { id_group: req.params.id } })
      .then(result => response(res, result))
      .catch(err => error(res, err))
  }

  store(req, res) {
    req.body.amount = 0
    this.model
      .create(req.body)
      .then(result => response(res, result))
      .catch(err => error(res, err))
  }

  update(req, res) {
    if (req.body.amount || req.body.id_product)
      error(res, {}, 'contains amount or id_product ')
    else
      this.model
        .update(req.body, { where: { id_product: req.params.id } })
        .then(result => response(res, result))
        .catch(err => error(res, err))
  }

  delete(req, res) {
    InputProductsModel.count({ where: { id_product: req.params.id } })
      .then(count => {
        if (count === 0)
          this.model
            .destroy({ where: { id_product: req.params.id } })
            .then(result => response(res, result))
            .catch(err => error(res, err))
        else error(res, {}, 'Product is being used')
      })
      .catch(err => error(res, err))
  }
}
