const User = require('../models/User');
const { Op } = require('sequelize');

const userController = {
    // GET: แสดงรายชื่อผู้ใช้ทั้งหมด
    index: async (req, res) => {
        try {
            const users = await User.findAll({ order: [['createdAt', 'DESC']] });
            res.render('users/index', { users });
        } catch (error) {
            res.status(500).send("Error fetching users: " + error.message);
        }
    },

    create: (req, res) => {
        res.render('users/create');
    },

    // POST: บันทึกข้อมูลผู้ใช้ใหม่
    store: async (req, res) => {
        try {
            const { username, email, password, rrole } = req.body;

            // 1. กำหนด Prefix ตาม Role
            let prefix = "02"; 
            if (rrole === 'admin') prefix = "01";
            else if (rrole === 'trainer') prefix = "03";

            // 2. ค้นหาเลขล่าสุดของกลุ่มนั้น
            const lastUser = await User.findOne({
                where: { member_code: { [Op.like]: `${prefix}%` } },
                order: [['member_code', 'DESC']]
            });

            let nextNumber = "001";
            if (lastUser && lastUser.member_code) {
                const currentNum = parseInt(lastUser.member_code.substring(2)); 
                nextNumber = (currentNum + 1).toString().padStart(3, '0');
            }

            const finalMemberCode = prefix + nextNumber;

            await User.create({
                username, email, password, rrole,
                member_code: finalMemberCode
            });

            res.redirect('/users');
        } catch (error) {
            // ✨ ส่วนที่อัปเกรด: ดักจับ Error ส่งกลับไปหน้าเว็บด้วยตัวแปร error
            let errorMessage = "เกิดข้อผิดพลาดในการบันทึก";
            
            if (error.name === 'SequelizeUniqueConstraintError') {
                errorMessage = "Username หรือ Email นี้มีคนใช้งานแล้วครับ!";
            } else if (error.errors && error.errors.length > 0) {
                errorMessage = error.errors[0].message; 
            }

            res.render('users/create', { error: errorMessage });
        }
    },

    show: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).send("ไม่พบสมาชิก");
            res.render('users/show', { user });
        } catch (error) {
            res.status(500).send("Server Error");
        }
    },

    edit: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            res.render('users/edit', { user });
        } catch (error) {
            res.status(404).send("User not found");
        }
    },

    // POST/PUT: อัปเดตข้อมูล - แก้ไข Logic การรันรหัสใหม่
    update: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, rrole } = req.body;

            // 1. ดึงข้อมูลสมาชิกเดิมมาตรวจสอบ
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).send("User not found");

            let updatedData = { username, email, rrole };

            // 2. ถ้ามีการเปลี่ยน Role (เปรียบเทียบค่าเดิมกับค่าใหม่จาก req.body)
            if (user.rrole !== rrole) {
                let prefix = "02"; 
                if (rrole === 'admin') prefix = "01";
                else if (rrole === 'trainer') prefix = "03";

                // ค้นหา ID ล่าสุดของกลุ่ม Role ใหม่
                const lastUser = await User.findOne({
                    where: { member_code: { [Op.like]: `${prefix}%` } },
                    order: [['member_code', 'DESC']]
                });

                let nextNumber = "001";
                if (lastUser && lastUser.member_code) {
                    const currentNum = parseInt(lastUser.member_code.substring(2));
                    nextNumber = (currentNum + 1).toString().padStart(3, '0');
                }

                // บันทึกรหัสใหม่ลงในข้อมูลที่จะอัปเดต
                updatedData.member_code = prefix + nextNumber;
            }

            // 3. ทำการอัปเดตลงฐานข้อมูล
            await User.update(updatedData, {
                where: { id: userId }
            });
            
            res.redirect('/users/' + userId);
        } catch (error) {
            res.status(400).send("Error updating user: " + error.message);
        }
    },

    destroy: async (req, res) => {
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.redirect('/users');
        } catch (error) {
            res.status(500).send("Error deleting user: " + error.message);
        }
    },

    dashboard: async (req, res) => {
        try {
            const adminCount = await User.count({ where: { rrole: 'admin' } });
            const trainerCount = await User.count({ where: { rrole: 'trainer' } });
            const memberCount = await User.count({ where: { rrole: 'member' } });
            
            res.render('dashboard', {
                stats: { adminCount, trainerCount, memberCount },
                total: adminCount + trainerCount + memberCount
            });
        } catch (error) {
            res.status(500).send("Error loading dashboard");
        }
    }
};

module.exports = userController;