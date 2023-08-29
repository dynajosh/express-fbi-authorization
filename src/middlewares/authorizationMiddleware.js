const authorizeAccess = (requiredAccessLevel) => (req, res, next) => {
    const user = req.user;
    if (!user){
        return res.status(401).json({error: 'Unauthorised'})
    }

    if (user.user_level >= requiredAccessLevel) {
        next()
    } else {
        return res.status(403).json({error: 'Not Authorised to view this case'})
    }
}


export default authorizeAccess;