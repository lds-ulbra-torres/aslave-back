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
    InputStocksController,
    OutputStocksController,
    FinancialClasificarionsController,
    FinancialReleasesController,
    PeopleControllers,
    CitiesController,
    StatesController
} from './controllers'

// Endpoint functions common to all
const routers = ( name, controller )=> { 
    controller.index ? router.get(`/${name}`, controller.index) : null
    controller.get ? router.get(`/${name}/:id`, controller.get) : null
    controller.store ? router.post(`/${name}`, controller.store) : null
    controller.update ? router.put(`/${name}/:id`, controller.update) : null
    controller.delete ? router.delete(`/${name}/:id`, controller.delete) : null
}

// EndPoints
router.get("/", (req,res) => res.send("Hello world") )
// Route authentication
router.post('/auth', UsersController.validate)

// Middlewares authentication routes
router.use(auth.authenticate())

// Route users
routers('user', UsersController)

// Routes products
routers('product', ProductsController)
router.get('/product-category/:id', ProductsController.getByCategory)

// Routes Group or categorys
routers('category', GroupProductsController)

// Routes Input Stock
routers('stock-input', InputStocksController)

// Routes Output Stock
routers('stock-output', OutputStocksController)

// Routes Financial Realeases
routers('financial-releses', FinancialReleasesController)

// Routes Financial Classifications
routers('financial-classifications', FinancialClasificarionsController)

//People
routers('people', PeopleControllers)

//Cities
routers('cities', CitiesController)

//States
routers('states', StatesController)

module.exports = router