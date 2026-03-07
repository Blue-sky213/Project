const express = require("express");
const router = express.Router();
const controller = require('../controllers/enrollmentController');

// 🚨 1. กลุ่ม Reports (ต้องอยู่บนสุด และตัดคำว่า /reports ออก เพราะ app.js จัดการให้แล้ว)
router.get('/members-in-class', controller.membersInClass);
router.get('/member-schedule', controller.memberSchedule);

// 🟢 2. กลุ่มหน้าทั่วไป
router.get("/", controller.index);
router.get("/create", controller.createPage);
router.post("/create", controller.create);

// ⚠️ 3. กลุ่มที่มี :id (ต้องอยู่ "ล่างสุด" เสมอ ไม่อย่างนั้นมันจะแย่งดักจับ URL อื่นหมด!)
router.get("/:id", controller.show);
router.get("/:id/edit", controller.editPage);
router.post("/:id/edit", controller.update);
router.post("/:id/delete", controller.delete);

module.exports = router;