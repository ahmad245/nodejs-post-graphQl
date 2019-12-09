const Joi=require('joi');
const mongoose=require('mongoose');
Joi.objectId=require('joi-objectid')(Joi);


var permissionsSchema =new mongoose.Schema({
    name :  {type:String,default:'read'}
   
});

const Permissions=mongoose.model('permissions',permissionsSchema);

module.exports.permissionsSchema=permissionsSchema;
 const rolesSchema =new mongoose.Schema({
        name : {type:String,default:'reader'},
        permissions :{type:[ permissionsSchema]}
    });

    const Roles=mongoose.model('roles',rolesSchema);

    var nestedSchema = Joi.object().keys({
        name: Joi.string().min(1).required()
    });

    function validate(roles)
        {
            const schema={
                name:Joi.string().min(3).max(250).required(),
                permissions:Joi.array().items(nestedSchema).min(2).required()
            }
            return Joi.validate(roles,schema);
        }
    module.exports.Roles=Roles;
    module.exports.rolesSchema=rolesSchema;
    module.exports.Permissions=Permissions;
    module.exports.permissionsSchema=permissionsSchema;
    module.exports.validate=validate;