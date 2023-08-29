import {User} from '../../../models/models.js';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../../../utils/jwtHelper.js';
import sendEmail from '../../../utils/sendEmail.js';


export const login = async(req, res)=>{
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

        const passwordValidity = await bcrypt.compare(password, user_instance.password_hash);
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
        res.status(500).json({
            error : "An error occured on our server and we're working on it"
        })
        console.error(err)
    } 
}

export const createUser = async(req, res) =>{

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
}