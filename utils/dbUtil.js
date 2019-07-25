const Sequelize = require("sequelize")

const UserModel = require("../models/user")
const RoleModel = require("../models/role")
const PermissionModel = require("../models/permission")
const OrderModel = require("../models/order")
const OrderLineModel = require("../models/orderLine")
const ProductModel = require("../models/product")
const TypeProductModel = require("../models/typeProduct")
const StatusOrderModel = require("../models/statusOrder")
const StatusProductModel = require("../models/statusProduct")
const StoreModel = require("../models/store")
const StatusStoreModel = require("../models/statusStore")
const ExpiredTokenModel = require("../models/expiredToken")
const CardLineModel = require("../models/cardLine")

// var config = {
//   username: 'root',
//   password: null,
//   database: 'test',
//   host: 'localhost',
//   dialect: 'mysql',
//   define: {
//     timestamps: false
//   },
//   // logging: false
// };
var config = {
  username: 'sql12299727',
  password: '1Dry9bRY9M',
  database: 'sql12299727',
  host: 'sql12.freesqldatabase.com',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  // logging: false
};
const db = new Sequelize(config.database, config.username, config.password, config)

console.log("connect successfull")

const User = UserModel(db, Sequelize)
const UserRole = db.define('user_role', {}, { timestamps: false });
const Role = RoleModel(db, Sequelize)
const RolePermission = db.define('role_permission', {}, { timestamps: false });
const Permission = PermissionModel(db, Sequelize)
const Order = OrderModel(db, Sequelize)
const OrderLine = OrderLineModel(db, Sequelize)
const Product = ProductModel(db, Sequelize)
const TypeProduct = TypeProductModel(db, Sequelize)
const StatusOrder = StatusOrderModel(db, Sequelize)
const StatusProduct = StatusProductModel(db, Sequelize)
const Store = StoreModel(db, Sequelize)
const StatusStore = StatusStoreModel(db, Sequelize)
const ExpiredToken = ExpiredTokenModel(db, Sequelize)
const CardLine = CardLineModel(db, Sequelize)

//Relationship
User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })
Role.belongsToMany(Permission, { through: RolePermission })
Permission.belongsToMany(Role, { through: RolePermission })

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderLine)
OrderLine.belongsTo(Order)

Product.hasMany(OrderLine)
OrderLine.belongsTo(Product)

TypeProduct.hasMany(Product)
Product.belongsTo(TypeProduct)

StatusOrder.hasMany(Order)
Order.belongsTo(StatusOrder)

StatusProduct.hasMany(Product)
Product.belongsTo(StatusProduct)

StatusStore.hasMany(Store)
Store.belongsTo(StatusStore)

StatusOrder.hasOne(StatusOrder)
StatusOrder.belongsTo(StatusOrder);

User.hasMany(CardLine)
CardLine.belongsTo(User)

Product.hasMany(CardLine)
CardLine.belongsTo(Product)

const wannaFake = true
db.sync({ force: wannaFake })
  .then(() => {
    console.log(`Database & tables created!`)
    if (wannaFake) {
      fakeDB()
    }
  })

const fakeDB = async () => {
  //Fake statusProduct
  let sttPro1 = await StatusProduct.create({
    name: "Available"
  })
  let sttPro2 = await StatusProduct.create({
    name: "Out of stock"
  })

  //Fake typeProduct
  let tPro1 = await TypeProduct.create({
    name: "Drinking"
  })
  let tPro2 = await TypeProduct.create({
    name: "Food"
  })

  //Fake Dish
  await Product.create({
    name: "Trứng vịt lộn luộc",
    price: 7000,
    statusProductId: 1,
    typeProductId: 1,
    img: "https://sohanews.sohacdn.com/thumb_w/660/2017/photo1506656714960-1506656715290-20-0-330-499-crop-1506656762384.jpg"
  })
  // await Product.create({
  //   name: "Phô mai que",
  //   price: 8000,
  //   statusProductId: sttPro1,
  //   typeProductId: tPro1,
  //   img: "https://beptruong.edu.vn/wp-content/uploads/2013/01/pho-mai-que.jpg"
  // })

  //Fake statusOrder
  await StatusOrder.create({
    name: "Sended",
    statusOrderId: null
  })
  await StatusOrder.create({
    name: "Sending",
    statusOrderId: 1
  })
  await StatusOrder.create({
    name: "Doing",
    statusOrderId: 2
  })
  await StatusOrder.create({
    name: "Ordered",
    statusOrderId: 3
  })
  await StatusOrder.create({
    name: "Cart",
    statusOrderId: 4
  })

  //Fake statusStore
  await StatusStore.create({
    name: "Open"
  })
  await StatusStore.create({
    name: "Close"
  })
  await StatusStore.create({
    name: "Upgrading"
  })



  //Fake permission
  const per1 = await Permission.create({
    name: "See ordered"
  })
  const per2 = await Permission.create({
    name: "Change order status"
  })
  const per3 = await Permission.create({
    name: "Analysis"
  })
  const per4 = await Permission.create({
    name: "Change dish status"
  })
  const per5 = await Permission.create({
    name: "Open close store"
  })
  const per6 = await Permission.create({
    name: "Manage user"
  })

  //Fake role
  const roleAdmin = await Role.create({
    name: "admin"
  })
  roleAdmin.addPermissions([per1, per2, per3, per4, per5, per6])
  const roleShipper = await Role.create({
    name: "shipper"
  })
  roleShipper.addPermissions([per1, per2])

  //Fake user
  const user1 = await User.create({
    //admin
    fullName: "Trần Đình Quý",
    email: "trandinhquy97@gmail.com",
    password: "123456",
    gender: 1,
    dob: "1997-02-10"
  })
  await user1.addRoles([roleAdmin])
  const user2 = await User.create({
    //shipper
    fullName: "Hà Xuân Sáng",
    email: "haxuansang@gmail.com",
    password: "123456",
    gender: 1,
    dob: "1997-02-10"
  })
  await user2.addRoles([roleShipper])

}
module.exports = {
  User,
  Role,
  Permission,
  Order,
  OrderLine,
  Product,
  TypeProduct,
  StatusOrder,
  StatusProduct,
  Store,
  StatusStore,
  ExpiredToken,
  CardLine
}