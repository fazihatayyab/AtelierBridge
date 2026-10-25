const {body, validationResult} = require("express-validator")

async function validateResult(req,res,next){
    const errors=  validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        }
        next();
    }


const registerUserValidationRules=[

    body("name")
    .isString()
    .withMessage("username must be a string")
    .isLength({min:3 ,max:20})
    .withMessage("Username must be obtween 3 and 20 characters"),

    body("email")
    .isEmail()
    .withMessage("Invalid Email adress"),

    body("password")
    .isLength({min:6})
    .withMessage("Passwords must be at least 6 characters long"),

    body("role")
    .isIn(["DESIGNER", "BRAND"])
    .withMessage("Role must be either DESIGNER or BRAND"),


   validateResult
]

module.exports={registerUserValidationRules}

