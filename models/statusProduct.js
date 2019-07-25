module.exports = (sequelize, type)=>{
    return sequelize.define('statusProduct',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:type.STRING,
    });
}