import { response, error } from './API'
import Controller from './Controller'

import {
    financial_releases as FinancialReleasesModel,
    people as PeopleModel,
    fin_classifications as FinancialClassificationsModel
} from '../models/FinancialReleasesModel'

export class FinancialReleasesController extends Controller {
    constructor() {
        super()
        this.model = FinancialReleasesModel
        this.id = 'id_financial_release'
    }

    index(req, res) {
        FinancialReleasesModel.findAll({ include: [{
            model: PeopleModel,
            attributes: ['name']
        },{
            model: FinancialClassificationsModel,
            attributes: ['name_classification']
        }] })
            .then(result => response(res, result))
            .catch(err => error(res, err))
    }

    get (req,res){
        FinancialReleasesModel.findAll({ where: { id_financial_release : req.params.id }, include: [{
            model: PeopleModel,
            attributes: ['name']
        },{
            model: FinancialClassificationsModel,
            attributes: ['name_classification']
        }] })
        .then(result => response(res, result))
        .catch(err => error(res, err))
    }
}