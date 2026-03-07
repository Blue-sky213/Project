const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const Class = require('../models/Class');

// =====================
// INDEX
// =====================
exports.index = async (req, res) => {

  const enrollments = await Enrollment.findAll({
    include: [User, Class]
  });

  res.render("enrollments/index", { enrollments });
};


// =====================
// CREATE PAGE
// =====================
exports.createPage = async (req, res) => {
  const users = await User.findAll({ where: { rrole: "member" } });
  const classes = await Class.findAll();

  // --- ส่วนที่เพิ่ม: คำนวณรหัสถัดไปเพื่อเอาไปโชว์ในหน้า Create ---
  const lastEnrollment = await Enrollment.findOne({ order: [['id', 'DESC']] });
  let nextId = 1;
  if (lastEnrollment) nextId = lastEnrollment.id + 1;
  const nextCode = `05${String(nextId).padStart(4, '0')}`;

  res.render("enrollments/create", { users, classes, nextCode }); // ส่ง nextCode ไปด้วย
};


// =====================
// CREATE (แก้ไขให้รันรหัสอัตโนมัติ)
// =====================
exports.create = async (req, res) => {
  try {
      // 1. ค้นหาข้อมูลการลงทะเบียนล่าสุด เพื่อเอามาทำรันนิ่งนัมเบอร์
      const lastEnrollment = await Enrollment.findOne({
          order: [['id', 'DESC']]
      });

      // 2. กำหนดเลขถัดไป
      let nextId = 1;
      if (lastEnrollment) {
          nextId = lastEnrollment.id + 1;
      }

      // 3. สร้างรหัสใหม่ เช่น 050001, 050002 (ให้ตรงกับที่เพื่อนคนที่ 4 ทำไว้ใน Seeder)
      const generatedCode = `05${String(nextId).padStart(4, '0')}`;

      // 4. เอาข้อมูลจากฟอร์ม มารวมกับรหัสที่สร้างขึ้นใหม่
      const enrollmentData = {
          userId: req.body.userId,
          classId: req.body.classId,
          status: req.body.status,
          enrollment_code: generatedCode // 👈 ใส่รหัสที่นี่!
      };

      // 5. บันทึกลงฐานข้อมูล
      await Enrollment.create(enrollmentData);

      res.redirect("/enrollments");
  } catch (error) {
      console.error("Error creating enrollment:", error);
      res.status(500).send("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.message);
  }
};


// =====================
// SHOW
// =====================
exports.show = async (req, res) => {

  const enrollment = await Enrollment.findByPk(req.params.id, {
    include: [User, Class]
  });

  res.render("enrollments/show", { enrollment });

};


// =====================
// EDIT PAGE
// =====================
exports.editPage = async (req, res) => {

  const enrollment = await Enrollment.findByPk(req.params.id);

  const users = await User.findAll({
    where: { rrole: "member" }
  });

  const classes = await Class.findAll();

  res.render("enrollments/edit", { enrollment, users, classes });

};


// =====================
// UPDATE
// =====================
exports.update = async (req, res) => {

  await Enrollment.update(req.body, {
    where: { id: req.params.id }
  });

  res.redirect("/enrollments");

};


// =====================
// DELETE
// =====================
exports.delete = async (req, res) => {

  await Enrollment.destroy({
    where: { id: req.params.id }
  });

  res.redirect("/enrollments");

};


exports.membersInClass = async (req,res)=>{
  const classes = await Class.findAll();

  let enrollments = [];

  if(req.query.classId){
    enrollments = await Enrollment.findAll({
      where:{ classId: req.query.classId },
      include:[User,Class]
    });
  };

  res.render("reports/membersInClass",{
    classes,
    enrollments
  });
};


exports.memberSchedule = async (req,res)=>{
  const members = await User.findAll({
    where:{ rrole:"member" }
  });

  let enrollments = [];

  if(req.query.userId){
    enrollments = await Enrollment.findAll({
      where:{ userId:req.query.userId },
      include:[User,Class]
    });
  };

  res.render("reports/memberSchedule",{
    members,
    enrollments
  });
};