import { response, error } from './API'
import Controller from './Controller'

import { people as PeopleModel } from '../models'

export class PeopleControllers extends Controller {
    constructor () {
        super()
        this.model = PeopleModel
        this.id = 'id_people'
    }
    get (req, res) {
        PeopleModel.getById(req.params.id)
        .then(result => response(res, result))
        .catch(err => error(res, err))
    }
}