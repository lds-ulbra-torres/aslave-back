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
  const route = (action, method, routeName) =>
    controller[action]
      ? router[method](routeName, (req, res) => controller[action](req, res))
      : null

  route('index', 'get', `/${name}`)
  route('get', 'get', `/${name}/:id`)
  route('store', 'post', `/${name}`)
  route('update', 'put', `/${name}/:id`)
  route('delete', 'delete', `/${name}/:id`)
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
