module.exports = (sequelize, type)=>{
    return sequelize.define('statusStore',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
        //createdAt: type.DATE,
        // userId: type.INTEGER,
        // statusId: type.INTEGER
    });
}