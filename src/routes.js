import { Router } from 'express'
import multer from 'multer'
import cors from 'cors'

// Initialize Router
const router = Router()
// Cross-Origin Resource Sharing  ( CORS ) 
router.use(cors())
router.use(multer().any())
// Cotrollers
import {  
    UsersController,
} from './controllers'

// EndPoints
router.get("/", (req,res) => res.send("Hello world") )

router.get('/user', UsersController.index)
router.post('/user', UsersController.store)   

module.exports = router