module.exports = (sequelize, type)=>{
    return sequelize.define('orderline',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // orderId: type.INTEGER,
        // productId: type.INTEGER,
        quantity: type.INTEGER
    });
}