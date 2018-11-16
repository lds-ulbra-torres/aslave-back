import { Router } from 'express'
import multer from 'multer'
import cors from 'cors'
import Auth from  './helpers/auth';
// Initialize Router
const router = Router()
// Cross-Origin Resource Sharing  ( CORS ) 
router.use(cors())
// Auth
const auth = Auth()
router.use(auth.initialize())
// Form-Data
router.use(multer().any())
// Cotrollers
import {  
    UsersController,
    ProductsController,
    GroupProductsController,
    PeopleControllers,
    CitiesController,
    StatesController
} from './controllers'

// EndPoints
router.get("/", (req,res) => res.send("Hello world") )
// Route authentication
router.post('/auth', UsersController.validate)
// Middlewares authentication routes
router.use(auth.authenticate())
// Route users

//User
router.get('/user', UsersController.index)
router.get('/user/:id', UsersController.get)
router.post('/user', UsersController.store)
router.put('/user/:id', UsersController.update)
router.delete('/user/:id', UsersController.delete)

// Routes products
router.get('/product', ProductsController.index)
router.get('/product/:id', ProductsController.get)
router.post('/product', ProductsController.store)
router.put('/product/:id', ProductsController.update)
router.delete('/product/:id', ProductsController.delete)
router.get('/product-category/:id', ProductsController.getByCategory)

// Routes Group or categorys
router.get('/category', GroupProductsController.index)
router.get('/category/:id', GroupProductsController.get)
router.post('/category', GroupProductsController.store)
router.put('/category/:id', GroupProductsController.update)
router.delete('/category/:id', GroupProductsController.delete)

//People
router.get('/people', PeopleControllers.index)
router.post('/people', PeopleControllers.store)

//Cities
router.get('/cities', CitiesController.index)
router.post('/cities', CitiesController.store)

//States
router.get('/states', StatesController.index)
router.post('/states', StatesController.store)

module.exports = router