const { User, Role, Permission, ExpiredToken } = require('../utils/dbUtil')
const returnUtil = require("../utils/returnUtil")
const jwt = require("jsonwebtoken")

const tokenList = {};

const has_permission = (allowedPermission) => {
    return async (req, res, next) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const decoded = await jwt.verify(token, "secret_key")
            req.decoded = decoded
            console.log(JSON.stringify(decoded))
        
            let rawRoles = decoded.roles
            let permissions = []
            rawRoles.forEach(element => {
                let rawPermissions = element.permissions
                rawPermissions.forEach(e => {
                    permissions[e.name] = true
                })
            })
        
            let check = true
            console.log(allowedPermission)
            allowedPermission.forEach(element => {
                    if (permissions[element] !== true){
                        check = false
                    }
                }
            )
            if(check){
                next()
            } else{
                res.status(400).json(returnUtil.returnJson("Permission error: You don not have permission to do this", false))
            }
        } catch (error) {
            res.status(400).json(returnUtil.returnJson("Authorization error: Jwt expired", false))
        }
    }
}
const login = async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        },
        attributes: ['fullName', 'email'],
        include: [
            {
                model: Role,
                // attributes: ['fullName', 'email'],
                through: {
                    attributes: []
                },
                include: [{
                    model: Permission,
                    // attributes: ['fullName'],
                    through: {
                        attributes: []
                    }
                }],
            }]
    })
    // console.log(JSON.stringify(user))
    if (user) {
        const token = jwt.sign(user.toJSON(), "secret_key", {
            expiresIn: 900,
        })
        const refreshToken = jwt.sign(user.toJSON(), "secret_key2", {
            expiresIn: 86400
        });
        const response = {
            token,
            refreshToken,
        }
        tokenList[refreshToken] = user;
        res.status(200).json(returnUtil.returnJson(response));
    }
    else{
        res.status(400).json(returnUtil.returnJson("Login Error: Supplication about user is wrong", false))
    }
}
const logout = async (req, res) => {
    let token = req.body.token
    let success = await ExpiredToken.create({
        token: token
    })
    if(success){
        res.status(200).json(returnUtil.returnJson(null))
    } else {
        res.status(500).json(returnUtil.returnJson("Logout Error: Can not delete token", false))
    }
}

module.exports = {
    login,
    logout,
    has_permission
}