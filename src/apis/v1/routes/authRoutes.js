import {User} from '../../../models/models.js';
import express from 'express';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../../../utils/jwtHelper.js';
import sendEmail from '../../../utils/sendEmail.js';


const router = express.Router();


router.post('/login', async (req, res)=> {
    /*  #swagger.tags = ['Auth']
  #swagger.path = '/api/auth/login'
  #swagger.summary = 'User login route'
  #swagger.description = 'User login route Returns access and refresh tokens'
   */
   /*    
   #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User Login',
                schema: {
                    email: 'example@example.com',
                    password: 'password',
                }
        } */
    
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({
            error: "Email and Passwords are required fields"
        })
    }
    try {
        const user_instance = User.findOne({
            where: {
                email : email
            }
        })

        if (!user_instance) {
            res.status(401).json({
                error: "Incorrect Details"
            })
        }

        const passwordValidity = await bcrypt.compare(password, user.password_hash);
        if (!passwordValidity) {
            res.status(401).json({
                error: "Incorrect Details"
            })
        } else {
            const tokens = jwtTokens(user_instance)
            res.status(200).json({
                tokens
            })
        }

    } catch (err) {
        res.status(400).json({
            error : "An error occured"
        })
        console.error(err)
    }
})


router.post('create-user', async(req, res)=>{
    /*  #swagger.tags = ['Auth']
  #swagger.path = '/api/auth/create-user'
  #swagger.summary = 'Create a user'
  #swagger.description = 'Create a user'
   */
   /*    
   #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Create User',
                schema: {
                    email: 'example@example.com',
                    level: 0
                }
        } */

    // Create user
    // Send an email to user to choose their password
    // Activate user after pasword has been chosen

    const {email, level} = req.body
    if (!email) {
        res.status(400).json({
            error: "Email is required"
        })
    }

    try {
        // Check if a user already exists
        if (User.findOne({
            where: {
                email:email
            }
        })) {
            res.status(400).json({
                error: "An agent with this email already exist"
            })
        }
        User.create({
            email:email,
            level:level,
        })
        // Send ann activation link
        sendEmail(email);
        
        res.status(200).json({
            message: "Agent Created and activation link has been sent"
        })


    } catch (err) {
        res.status(500).json({
            error: "An error occured"
        })

    }

})