import { response, error } from './API'

export default class Controller {
  constructor(Model, ID) {
    this.model = Model
    this.id = ID
  }

  async actionModel(action, res, params) {
    this.model[action](params)
      .then(result => response(res, result))
      .catch(err => error(res, err))
  }

  index(req, res) {
    this.actionModel('findAll', res)
  }

  get(req, res) {
    this.actionModel('findOne', res, { where: { [this.id]: req.params.id } })
  }

  store(req, res) {
    this.actionModel('create', res, req.body)
  }

  update(req, res) {
    if (req.body[this.id]) 
      error(res, {}, `contains ${[this.id]}`)
    else
      this.actionModel(
        'update',
        res,
        (req.body, { where: { [this.id]: req.params.id } })
      )
  }

  delete(req, res) {
    this.actionModel('destroy', res, { where: { [this.id]: req.params.id } })
  }
}
