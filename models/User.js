const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.json');
const env = "development";
const sequelize = new Sequelize(config[env]);
const shouldForceSync = false;
const bcrypt = require('bcryptjs')


sequelize.authenticate();

const User = sequelize.define('User', {
    "username": {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    "password": {
        type: DataTypes.STRING,
        allowNull: false
    }
});
if (shouldForceSync){
    User.sync({force: shouldForceSync});
}

/*
Copy and pasted from passport demo below
*/
//compares user password with password given
//this.password refers to the saved password that got hashed when account was created
User.prototype.validPassword = function(password) {
    console.log('validPassword in use')
    return bcrypt.compareSync(password, this.password);
};

//salting and hashing user.password
User.addHook("beforeCreate", function(user) {
    console.log('addHook in use')
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});


module.exports = User