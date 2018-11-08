export default class API {
    response(res, response = {}, msg = "OK"){
        res.status(200).json({status: 200, msg: msg,obj: response})
    }
    error(res, error = {}, msg = "Ocorreu um erro" ){
        console.log(error)
        res.status(400).json({status: 400, msg: msg , obj: {}})
    }
}
