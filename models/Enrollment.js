const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Class = require('./Class');

const Enrollment = sequelize.define("Enrollment", {
    enrollment_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'cancelled'),
        defaultValue: 'active'
    }
});

// กำหนดความสัมพันธ์ (Associations) เพื่อให้ตารางรู้จักกัน
Enrollment.belongsTo(User, { foreignKey: "userId" });
Enrollment.belongsTo(Class, { foreignKey: "classId" });

module.exports = Enrollment;