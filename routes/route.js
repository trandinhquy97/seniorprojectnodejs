const user_controller = require("../controllers/userController")
const auth_controller = require("../controllers/authController")
const dish_controller = require("../controllers/dishController")

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.route('/api/login')
        .post(auth_controller.login)
    app.route('/api/logout')
        .post(auth_controller.logout)
    app.route('/api/users/')
        .get(auth_controller.has_permission(["Manage user"]), user_controller.list_all_user)
        .post(auth_controller.has_permission(["Manage user"]), user_controller.add_user)
        .delete(auth_controller.has_permission(["Manage user"]), user_controller.delete_user)
        .patch(auth_controller.has_permission(["Manage user"]), user_controller.update_user)
    app.route('/api/users/roles')
        .patch(user_controller.update_role_user)
    app.route('/api/dish')
        .post(dish_controller.add_product)
        .get(dish_controller.get_all_product)


}