import Controller from './Controller'

import {
    fin_classifications as FinancialClassificationsModel
} from '../models/FinancialReleasesModel'

export class FinancialClassificationsController extends Controller {
    constructor() {
        super()
        this.model = FinancialClassificationsModel
        this.id = 'id_classification'
    }
}