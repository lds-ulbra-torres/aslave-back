import Controller from './Controller'

import { people as PeopleModel } from '../models'

export class PeopleControllers extends Controller {
  constructor() {
    super(PeopleModel, 'id_people')
  }

  get(req, res) {
    this.actionModel('getById', res, req.params.id)
  }
}
