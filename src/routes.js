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
} from './controllers'

// EndPoints
router.get("/", (req,res) => res.send("Hello world") )

// Route authentication
router.post('/auth', UsersController.validate)
// Middlewares authentication routes
router.use(auth.authenticate())
// Route users
router.get('/user', UsersController.index)
router.get('/user/:id', UsersController.get)
router.post('/user', UsersController.store)
router.put('/user/:id', UsersController.update)
router.delete('/user/:id', UsersController.delete)

module.exports = router