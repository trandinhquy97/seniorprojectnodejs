module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: type.STRING,
            allowNull: false
        },
        email:  {
            type: type.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password:  {
            type: type.STRING,
            allowNull: false
        },
        gender:{
            type: type.INTEGER,
            allowNull: false
        },
        dob:{
            type: type.DATE,
            allowNull: false
        }
    })
}