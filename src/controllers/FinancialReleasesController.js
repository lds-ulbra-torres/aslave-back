import db from '../config/db'
import { response, error } from './API'

const FinancialReleasesModel = db().models.financial_releases

export const FinancialReleasesController = {
    index(req, res) {
        FinancialReleasesModel.findAll({ include: [{
            model: db().models.people,
            attributes: ['name']
        },{
            model: db().models.fin_classifications,
            attributes: ['name_classification']
        }] })
        .then( result => response(res, result) )
        .catch( erro => error (res, erro) )  
    },

    get (req,res){
        FinancialReleasesModel.findAll({ where: { id_financial_release : req.params.id }, include: [{
            model: db().models.people,
            attributes: ['name']
        },{
            model: db().models.fin_classifications,
            attributes: ['name_classification']
        }] })
        .then(result => response (res, result) )
        .catch( erro => error (res, erro) )
    },

    store(req, res) {
        FinancialReleasesModel.create(req.body)
        .then( result => response(res, result) )
        .catch(erro => error (res, erro) )
    },


    update( req,res){
        if(req.body.id_financial_release)
            error(res, {}, 'conteins id_financial_release')
        else 
            FinancialReleasesModel.update(req.body, { where: { id_financial_release : req.params.id} })
                .then( result => response(res, result) )
                .catch( erro => error(res,erro) )
    },

    delete(req, res) {
        FinancialReleasesModel.destroy({
            where: { id_financial_release : req.params.id}})
            .then( result => response(res, result) )
            .catch( erro => error(res, erro) )
    }

}