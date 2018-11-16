import { Router } from 'express'
import multer from 'multer'
import cors from 'cors'

// Initialize Router
const router = Router()
// Cross-Origin Resource Sharing  ( CORS ) 
router.use(cors())
// Form-Data
router.use(multer().any())
// Cotrollers
import {  
    PeopleControllers,
    UsersController, 
    CitiesController,
    StateController
} from './controllers'

// EndPoints
router.get("/", (req,res) => res.send("Hello world") )
//Uer
router.get('/user', UsersController.index)
router.post('/user', UsersController.store)   

//People
router.get('/people', PeopleControllers.index)
router.post('/people', PeopleControllers.store)

//Cities
router.get('/cities', CitiesController.index)
router.post('/cities', CitiesController.store)

//States
router.get('/states', StateController.index)
router.post('/states', StateController.store)

//
module.exports = router