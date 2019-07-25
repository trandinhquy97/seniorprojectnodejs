module.exports = (sequelize, type)=>{
    return sequelize.define('store',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // userId: type.INTEGER,
        // statusId: type.INTEGER
    });
}