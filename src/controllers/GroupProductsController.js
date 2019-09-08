import Controller from './Controller'

import { stock_product_groups as GroupProductModel } from '../models'

export class GroupProductsController extends Controller {
    constructor() {
        super()
        this.model = GroupProductModel
        this.id = 'id_group'
    }
}

