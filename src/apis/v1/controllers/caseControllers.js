import {CaseFile} from '../../../models/models.js';
import authorizeAccess from '../../../middlewares/authorizationMiddleware.js';



export const createCase = async (req, res) => {

    // Test to see if the required fields to create a case are provided. If they aren't throw an error otherwise, proceed to create

    if (!title || !level || !body) {
        res.status(400).json({
            error: "Title, Body and Level fields are required"
        })
    }
    try {
        await CaseFile.create({
            title:title,
            body:body,
            required_access_level: level,
            author: req.user.id
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
}


export const fetchCase = async (req, res)=>{
    const fileId = req.params.id

    if (!file_id) {
        res.status(400).json({
            error: "No case id was provided"
        })
      }
    
      try {
        const caseFile = await CaseFile.findByPk(fileId)
        
        // Check that the file with the id infact exists
        if (!caseFile) {
            res.status(404).json({
                error: `Case file with id ${fileId} not found`
            })
        }
        const requiredAccessLevel = caseFile.required_access_level;

        // Use the aurthorizeAccess middleware to check that the user has access to this case
        authorizeAccess(requiredAccessLevel)(req, res, ()=>{
            res.status(200).json(caseFile)
        })
    
        res.status(200).json({
            message: case_file
        })
    
      } catch(err) {
        console.error(err)
        res.status(500).json({
            error: "An error occured on our server"
        })
    
      }

}