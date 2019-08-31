import db from '../config/db'
import { response, error } from './API'

const PeopleModel = db().models.people;

export const PeopleControllers = {

    index (req,res) {
        PeopleModel.findAll()
        .then(result => response (res, result) )
        .catch( error=> error (res, erro) )
    },

    get (req, res) {
        PeopleModel.getById( req.params.id )
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },

    store (req, res) {
        PeopleModel.create(req.body)
        .then( result => response(res,result)
             )
         .catch( erro => error(res,erro) )
    },

    update (req, res) {
        if( req.params.id_people )
            error(res, {}, "conteins id_people ")
        else
            PeopleModel.update(req.body, { where : { id_people : req.params.id} })
            .then( result => response(res, result) )
            .catch( erro => error(res, erro) )
    },

    delete (req, res) {
        PeopleModel.destroy({ where : { id_people : req.params.id} })
        .then( result => response(res, result) )
        .catch( erro => error(res, erro) )
    },
}