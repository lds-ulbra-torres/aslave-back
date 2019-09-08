import Controller from './Controller'

import { stock_product_groups as GroupProductModel } from '../models'

export class GroupProductsController extends Controller {
  constructor() {
    super(GroupProductModel, 'id_group')
  }
}
