const sequelize = require('./config/database');
const seedUsers = require('./seeders/userSeeder');
const seedClasses = require('./seeders/classSeeder');
const seedPackages = require('./seeders/packageSeeder');
const seedEnrollments = require('./seeders/enrollmentSeeder'); // 👈 ดึงไฟล์ของคนที่ 4 มา

const runSeeder = async () => {
    try {
        console.log('--- Starting Database Seeding ---');
        await sequelize.authenticate();
        console.log('Database connection established.');

        await sequelize.sync({ force: true }); 
        console.log('Database tables created successfully.');

        // 🚨 ลำดับตรงนี้สำคัญมาก ต้องเรียงตามนี้เป๊ะๆ นะครับ
        await seedUsers();
        await seedClasses();
        await seedPackages();
        await seedEnrollments(); // 👈 ต้องรันเป็นอันสุดท้าย เพราะต้องใช้ข้อมูล User และ Class

        console.log('--- Seeding Process Completed ---');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

runSeeder();