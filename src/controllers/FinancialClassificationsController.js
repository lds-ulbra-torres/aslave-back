import db from '../config/db'
import { response, error } from './API'

const FinancialClassificationsModel = db().models.fin_classifications


export const FinancialClasificarionsController  = {
    index(req, res) {
        FinancialClassificationsModel.findAll()
        .then(result => response(res, result))
        .catch( erro => error(res, erro) )
    },

    get (req,res){
        FinancialClassificationsModel.findAll({
            where:{
                id_classification: req.params.id
            }
        })
        .then( result => response(res,result) )
        .catch(erro => error (res, erro) )
    },

    store(req,res){
        FinancialClassificationsModel.create(req.body)
        .then( result => response(res, result) )
        .catch(erro => error (res, erro) )

    },

    update(req,res){
        if(req.body.id_classification){
            error(res, {}, 'id_classification')}
        else{
            FinancialClassificationsModel.update
            (req.body, { where:{
                id_classification:req.params.id
            }})
            .then( result => response (res, result) )
            .catch(erro =>error (res, erro) )
        }   
    
    },
    
}