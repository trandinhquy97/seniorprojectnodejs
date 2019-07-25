module.exports = (sequelize, type)=>{
    return sequelize.define('statusOrder',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:type.STRING,
        // nextStatusId: type.INTEGER
    });
}