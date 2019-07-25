const { User, Role, Permission } = require('../utils/dbUtil')
const returnUtil = require("../utils/returnUtil")
const list_all_user = async (req, res) => {
    try {
        let users = await User.findAll({
            // attributes: ['name', 'email'],
            // include: Role
            include: [
                {
                    model: Role,
                    // attributes: ['name'],
                    through: {
                        attributes: []
                    },
                    include: [{
                        model: Permission,
                        // attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }],
                }]
        })
        await console.log(JSON.stringify(users))
        await res.status(200).json(returnUtil.returnJson(users))
    } catch (error) {
        await res.status(500).json(returnUtil.returnJson(error.message, false))
    }

}
const add_user = async (req, res, next) => {
    // let user = await User.create(req.body)
    try {
        const body = req.body
        const roles = await Promise.all(
            body.roles.map(
                role=>Role.findOne({
                    where:{
                        name: role.name
                    }
                })
            )
        )
        //find exist email
        const existEmail = await User.findAll({
            where: {
                email: body.email
            }
        })

        if(existEmail.length>0) {
            res.status(400).json(returnUtil.returnJson("Validation error: Email is exist", false))
            return
        }
            

        
        const user = await User.create(body)
        await user.addRoles(roles)
        // await console.log(JSON.stringify(roles))
        await res.status(200).json(returnUtil.returnJson(user))
    } catch (error) {
        res.status(400).json(returnUtil.returnJson(error.message, false))
    }

}
const delete_user = async (req, res) => {
    try {
        const ret = await User.destroy({
            where: {
                id: req.body.id
            }
        })
        if(ret!==0)
            res.status(200).json(returnUtil.returnJson(ret))
        else
            res.status(400).json(returnUtil.returnJson("Validation error: ID is not exist", false))
    } catch (error) {
        res.status(400).json(returnUtil.returnJson(error.message, false))
    }
}
const update_user = async (req, res) => {
    try {
        const user = await User.findOne({
            where:{
                id: req.body.id
            }
        })
        if(user){
            const ret = await user.update({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.status(200).json(returnUtil.returnJson(ret))
        } else{
            res.status(400).json(returnUtil.returnJson("Validation error: ID is not exist", false))
        }
       
    } catch (error) {
        res.status(400).json(returnUtil.returnJson(error.message, false))
    }
  
}
const update_role_user = async (req, res) => {
    try {
        const user = await User.findOne({
            where:{
                id: req.body.id
            }
        })
        if(user){
            // user.setRoles([])
            const roles = await Promise.all(
                req.body.roles.map(
                    role=>Role.findOne({
                        where:{
                            id: role.id
                        }
                    })
                )
            )
            console.log(JSON.stringify(roles))
            user.setRoles(roles)
            res.status(200).json(returnUtil.returnJson(null))
        } else{
            res.status(400).json(returnUtil.returnJson("Validation error: ID is not exist", false))
            return
        }
    } catch (error) {
        res.status(400).json(returnUtil.returnJson(error.message, false))
    }

}
module.exports = {
    list_all_user,
    add_user,
    delete_user,
    update_user,
    update_role_user
}