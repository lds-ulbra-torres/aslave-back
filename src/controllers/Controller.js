import { response, error } from './API'

export default class Controller {
  constructor(Model, ID) {
    this.model = Model
    this.id = ID
  }

  actionModel(action, res, params) {
    this.model[action](params)
      .then(result => response(res, result))
      .catch(err => error(res, err))
  }

  actionModelByID(action, res) {
    this.actionModel(action, res)
  }

  index(req, res) {
    this.actionModel('findAll', res)
  }

  get(req, res) {
    this.actionModelByID('findOne', res)
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
    this.actionModelByID('destroy', res)
  }
}
