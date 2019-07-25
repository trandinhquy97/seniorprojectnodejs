module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        // typeId: type.INTEGER,
        price: type.INTEGER,
        // statusId: type.INTEGER,
        img: type.STRING
    });
}