import db from '../config/db'
import { response, error } from './API'

const PeopleModel = db().models.people;

export const PeopleControllers = {

    index (req,res) {
        PeopleModel.findAll()
        .then(result => response (res, result) )
        .catch( error=> error (res, erro) )
    },

    store (req, res) {
        PeopleModel.create(req.body)
        .then( result => response(res,result)
         )
         .catch( erro => error(res,erro) )
    }
}