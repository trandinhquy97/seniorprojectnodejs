module.exports = (sequelize, type)=>{
    return sequelize.define('expiredToken',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: type.STRING
        // createdAt: type.DATE,
        // userId: type.INTEGER,
        // statusId: type.INTEGER
    });
}