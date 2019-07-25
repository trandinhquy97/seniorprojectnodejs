module.exports = (sequelize, type)=>{
    return sequelize.define('typeProduct',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:type.STRING,
    });
}