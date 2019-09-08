import { response, error } from './API'
import Controller from './Controller'

import {
  stock_output_products as StockOutputModel,
  user as UserModel,
} from '../models'

export class OutputStocksController extends Controller {
  constructor() {
    super(StockOutputModel, 'id_stock')
  }

  index(req, res) {
    StockOutputModel.findAll({
      attributes: [
        'id_stock',
        'createdAt',
        'unit_price_output',
        'amount_output',
        'unit_measurement',
      ],
      include: [
        {
          model: UserModel,
          attributes: ['full_name'],
        },
      ],
    })
      .then(result => response(res, result))
      .catch(erro => error(res, erro))
  }

  get(req, res) {
    StockOutputModel.findOne({
      where: { id_stock: req.params.id },
      include: [
        {
          all: true,
          nested: true,
          attributes: { exclude: ['password', 'login'] },
        },
      ],
    })
      .then(result => response(res, result))
      .catch(erro => error(res, erro))
  }
}
