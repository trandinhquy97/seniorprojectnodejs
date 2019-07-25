const returnCode = {
    1: "Validation error: Validation isEmail on email failed",
    2: "Validation error: Email is exist",
    3: "Validation error: ID is not exist",
    4: "Permission error: You don not have permission to do this",
    5: "Authorization error: Jwt expired",
    6: "Login Error: Supplication about user is wrong",
    7: "Logout Error: Can not delete token",
    8: "Upload file error: Cannot upload file",
    9: "Foreign Key Error: Check your status or product",
    10: "Big File Error: Choose file less than 5MB"
}
function getKeyByValue(object, value) {
    console.log("asdadadsa" + value)
    if (Object.keys(object).find(key => object[key] === value).length == 0)
        return value
    return Object.keys(object).find(key => object[key] === value);
}
const returnJson = (data, isSuccess = true) => {
    if (!isSuccess) {
        return {
            success: isSuccess,
            data: {
                error: getKeyByValue(returnCode, data)
            }
        }
    }
    else
        return {
            success: isSuccess,
            data: data
        }
}
module.exports = { returnJson }