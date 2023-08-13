import express from 'express';
import {CaseFile} from '../../../models/models.js'

const router = express.Router()



router.post('/create', async (req, res)=> {
   /*  #swagger.tags = ['Cases']
  #swagger.path = '/api/cases/create'
  #swagger.summary = 'Create new case file'
  #swagger.description = 'Create a new case file'
   */
   /*    
   #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Create Case File',
                schema: {
                    title: 'Case title',
                    level: 0,
                }
        } */
    if (!title || !level) {
        res.status(400).json({
            error: "Title and Level fields are required"
        })
    }
    try {
        await CaseFile.create({
            title:title,
            required_access_level: level
        })
        res.status(200).json({
            message: "New case opened"
        })
    } catch(err) {
        res.status(500).json({
            error: "An error occured on our server"
        })
        console.error(err)
    }
  

    

})



router.get('/open/:id', async (req, res)=> {
   /*  #swagger.tags = ['Cases']
  #swagger.path = '/api/cases/open/{id}'
  #swagger.summary = 'Open File'
  #swagger.description = 'Open File'
   */

  const file_id = req.params.id

  if (!file_id) {
    res.status(400).json({
        error: "No case id was provided"
    })
  }

  try {
    const case_file = await CaseFile.findOne({
        where: {
            file_id: file_id
        }
      })
    if (!case_file) {
        res.status(404).json({
            error: `Case file with id ${file_id} not found`
        })
    }

    res.status(200).json({
        message: case_file
    })

    
  } catch(err) {
    console.error(err)
    res.status(500).json({
        error: "An error occured on our server"
    })

  }

 

})