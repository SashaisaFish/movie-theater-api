const { Show } = require("./Show");
const { User } = require("./User");

Show.belongsToMany(User, { through: "User_Shows" });
User.belongsToMany(Show, { through: "User_Shows" });

module.exports = { Show, User };
