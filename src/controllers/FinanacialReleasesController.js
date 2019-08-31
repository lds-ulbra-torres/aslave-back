import db from '../config/db'
import { response, error } from './API'

const FinancialReleasesModel = db.models.FinancialReleases

export const FinanacialReleasesController = {
    index(req, res) {
        FinancialReleasesModel.findAll()
        .then( resul => response(res.result) )
        .catch( erro => error (res,erro) )  
    },

    get (req,res){
        FinancialReleasesModel.findAll({ where: { id_financial_release : req.parms.id}})
        .then(result => response (res,result) )
        .catch( erro => error (res,err) )

    },

    store(req, res) {
        FinancialReleasesModel.create(req.body)
        .then( result => respose(res,
        result) )
        .catch(erro => error (res, erro) )
    },


    update( req,res){
        if(req.body.id_financial_release)
            error(res, {}, 'conteins id_financial_release')
        else 
            FinancialReleasesModel.update
                (req, body, { where: { id_financial_release : req.params.id} })
                .then( result => response(res, result) )
                .catch( erro => error(res,erro) )
    },


    delete(req, res) {
        FinanacialReleasesController.destroy({
            where: { id_financial_release : req.params.id}}
            .then( result => response 
            (res, result) )
            .cath( erro => error(res,erro) )
        )
    }


}