import { response, error } from './API'

export default class Controller {
  constructor (){
    this.model
    this.id
  }

  index(req, res) {
    console.log(this)
    this.model.findAll()
      .then( result => response(res, result))
      .catch( err => error (res, err))  
  }

  get (req,res){
    this.model.findAll({ where: { [this.id] : req.params.id}})
      .then(result => response (res, result))
      .catch( err => error (res, err))
  }

  store(req, res) {
    this.model.create(req.body)
      .then( result => response(res, result))
      .catch(err => error (res, err))
  }

  update(req,res) {
    if(req.body[this.id])
      error(res, {}, `contains ${[this.id]}`)
    else 
      this.model.update(req.body, { where: { [this.id] : req.params.id} })
        .then( result => response(res, result))
        .catch( err => error(res, err))
  }

  delete(req, res) {
    this.model.destroy({ where: { [this.id] : req.params.id}})
      .then( result => response(res, result))
      .cath( err => error(res,err))
  }
}