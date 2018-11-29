import db from '../config/db'
import { response, error } from './API'

const FinCalsificationsModel = db.models.Finclassificarions


export const FinClasificarionsController  = {
    index(req, res) {
        FinCalsificationsModel.findAll()
        .then(result => response( res, erro))
        .catch( erro => error(res, erro) )
    },

    get (req,res){
        FinCalsificationsModel.findAll({
            where:{
                id_classification: req.parms.id
            }
        })
        .then( result => response(res,result) )
        .catch(erro => error (res,err) )
    },

    store(req,res){
        FinCalsificationsModel.create(req.body)
        .then( result => response(res,result) )
        .catch(erro => error (res,erro) )

    },


    update(req,res){
        if(req.body.id_classification){
            error(res, {}, 'id_classification')}
        else{
            FinCalsificationsModel.update
            (req, body, { where:{
                id_classification:req.params.id
            }})
            .then( result => response (res, result) )
            .catch(erro =>error (res,erro) )
        }   
    
    },

    


    
}