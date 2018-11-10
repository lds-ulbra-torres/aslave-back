import { Router } from 'express'
// Initialize Router
const router = Router()

// Cotrollers
import {  
    UsersController,
} from './controllers'

// EndPoints
router.get("/", (req,res) => res.send("Hello world") )

router.get('/user', UsersController.index)
router.post('/user', UsersController.store)   

module.exports = router