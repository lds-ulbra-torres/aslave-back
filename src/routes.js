import { Router } from 'express'
import multer from 'multer'
import cors from 'cors'
import Auth from './helpers/auth'
// Initialize Router
const router = Router()
// Cross-Origin Resource Sharing  ( CORS )
router.use(cors())
// Auth
const auth = Auth()
router.use(auth.initialize())
// Form-Data
router.use(multer().any())
// Controllers
import {
  UsersController,
  ProductsController,
  GroupProductsController,
  InputStocksController,
  OutputStocksController,
  FinancialClassificationsController,
  FinancialReleasesController,
  PeopleControllers,
} from './controllers'

// Endpoint functions common to all
const routers = (name, controller) => {
  controller.index
    ? router.get(`/${name}`, (req, res) => controller.index(req, res))
    : null
  controller.get
    ? router.get(`/${name}/:id`, (req, res) => controller.get(req, res))
    : null
  controller.store
    ? router.post(`/${name}`, (req, res) => controller.store(req, res))
    : null
  controller.update
    ? router.put(`/${name}/:id`, (req, res) => controller.update(req, res))
    : null
  controller.delete
    ? router.delete(`/${name}/:id`, (req, res) => controller.delete(req, res))
    : null
}

// EndPoints

router.get('/', (req, res) => res.send('Hello world'))
// Route authentication
router.post('/auth', new UsersController().validate)

// Middleware authentication routes
router.use(auth.authenticate())

// Route users
routers('user', new UsersController())

// Routes products
routers('product', new ProductsController())
router.get('/product-category/:id', new ProductsController().getByCategory)

// Routes Group or categories
routers('category', new GroupProductsController())

// Routes Input Stock
routers('stock-input', new InputStocksController())

// Routes Output Stock
routers('stock-output', new OutputStocksController())

// Routes Financial Realeases
routers('financial-releses', new FinancialReleasesController())

// Routes Financial Classifications
routers('financial-classifications', new FinancialClassificationsController())

//People
routers('people', new PeopleControllers())

module.exports = router
