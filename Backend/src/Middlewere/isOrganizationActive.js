import ErrorHandler from "../Utlis/ErrorHandler.js"

export const isOrganizationActive = (req, res, next) => {
    // console.log(req.user);
  if(req.user.role == "owner"){
     next()
  }

  else {
      if(!req.user.organizationId.isActive){
        next(new ErrorHandler(403, "Organization is inActive"))
    }
    
    next()
  }

}