const Enrollment = require('../models/Enrollment');

module.exports = async () => {

  const data = [];

  for (let i = 1; i <= 20; i++) {

    data.push({

      enrollment_code: `05${String(i).padStart(4,'0')}`,

      userId: Math.floor(Math.random() * 10) + 1,

      classId: Math.floor(Math.random() * 10) + 1,

      status: Math.random() > 0.2 ? "active" : "cancelled"

    });

  }

  await Enrollment.bulkCreate(data);

  console.log("Enrollments Seeded");

};