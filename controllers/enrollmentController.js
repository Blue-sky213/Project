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

  const users = await User.findAll({
    where: { rrole: "member" }
  });

  const classes = await Class.findAll();

  res.render("enrollments/create", { users, classes });
};


// =====================
// CREATE
// =====================
exports.create = async (req, res) => {

  await Enrollment.create(req.body);

  res.redirect("/enrollments");
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