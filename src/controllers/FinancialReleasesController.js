import { response, error } from './API'
import Controller from './Controller'

import {
  financial_releases as FinancialReleasesModel,
  people as PeopleModel,
  fin_classifications as FinancialClassificationsModel,
} from '../models/FinancialReleasesModel'

export class FinancialReleasesController extends Controller {
  constructor() {
    super(FinancialReleasesModel, 'id_financial_release')
  }

  index(req, res) {
    this.actionModel('findAll', res, {
      include: [
        {
          model: PeopleModel,
          attributes: ['name'],
        },
        {
          model: FinancialClassificationsModel,
          attributes: ['name_classification'],
        },
      ],
    })
  }

  get(req, res) {
    this.actionModel('findAll', res, {
      where: { id_financial_release: req.params.id },
      include: [
        {
          model: PeopleModel,
          attributes: ['name'],
        },
        {
          model: FinancialClassificationsModel,
          attributes: ['name_classification'],
        },
      ],
    })
  }
}
