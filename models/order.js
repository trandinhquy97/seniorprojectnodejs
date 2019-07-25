module.exports = (sequelize, type)=>{
    return sequelize.define('order',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: type.DATE,
        // userId: type.INTEGER,
        // statusId: type.INTEGER
    });
}