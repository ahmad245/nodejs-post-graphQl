module.exports.message=(name)=>{
return {
    all:`should return all ${name}`,
    userNotlogin:`should return 401 if user is not login`,
    userLoginvalidId:`should return a ${name} if user login and valid id is passed`,
    invalidId:`should return 404 if invalid id is passed`,
    noName:`should return 404 if no ${name} with the given id valid`,
    namelessthan:`should return 400 if ${name} lessthan 1 charachter`,
    morthan:`should return 400 if ${name} morthan 50 charachter`,
    saveName:`should save ${name} in database`,
    returnInBody:`should return ${name} in body`,
    idNotFound:`should return 404 if ${name} with the given id was not found`,
    updateIfInputValid:`should update the ${name} if input is valid`,
    returnUpdated:`should return the updated updated ${name} if it is valid`,
    deleteIfInputValid:`should delete the ${name} if input is valid`,
    returnDelete:`should return the removed ${name}`,
    noPermission:'should return 403 if user do not have permission',
    noActive:'should return 403 if user no active yet',
    withPermissionRead:`should return all ${name} if user has read permission `,
    withPermissionNotRead:`should return 403 if user have permission but do not have permission read`,
    withPermissionWrite:`should save ${name} if user has write permission `,
    withPermissionNotWrite:`should return 403 if user have permission but do not have permission write`,
    withPermissionUpdate:`should save ${name} if user has Update permission `,
    withPermissionNotUpdate:`should return 403 if user have permission but do not have permission Update`,
    withPermissionDelete:`should delete ${name} if user has Delete permission `,
    withPermissionNotDelete:`should return 403 if user have permission but do not have permission Delete`,
    notSamePerson:'should return 403 if It is not the same person who created the question'
  }
}