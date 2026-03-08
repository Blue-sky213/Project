const Package = require('../models/Package');

const seedPackages = async () => {
    console.log('🌱 กำลังสร้างข้อมูลจำลอง Packages...');
    const packageData = [
        { package_name: '1-Month Unlimited', description: 'เล่นฟิตเนสและเข้าคลาสได้ไม่จำกัด ภายใน 1 เดือน', price: 1500, session_count: 999, duration_days: 30, is_active: true },
        { package_name: '3-Months Value', description: 'แพ็กเกจสุดคุ้ม 3 เดือน เล่นได้ทุกอย่าง', price: 4000, session_count: 999, duration_days: 90, is_active: true },
        { package_name: '1-Year VIP', description: 'สมาชิกรายปี พร้อมล็อกเกอร์ส่วนตัวและผ้าเช็ดตัวฟรี', price: 14000, session_count: 999, duration_days: 365, is_active: true },
        { package_name: '10-Class Pass', description: 'บัตรเข้าคลาสออกกำลังกาย 10 ครั้ง (ไม่มีวันหมดอายุ)', price: 2500, session_count: 10, duration_days: null, is_active: true },
        { package_name: '20-Class Pass', description: 'บัตรเข้าคลาสออกกำลังกาย 20 ครั้ง (ไม่มีวันหมดอายุ)', price: 4500, session_count: 20, duration_days: null, is_active: true },
        { package_name: 'Personal Trainer 10 Sessions', description: 'เทรนเนอร์ส่วนตัว 10 ชั่วโมง', price: 8000, session_count: 10, duration_days: 60, is_active: true },
        { package_name: 'Personal Trainer 20 Sessions', description: 'เทรนเนอร์ส่วนตัว 20 ชั่วโมง แถมฟรี 2 ชั่วโมง', price: 15000, session_count: 22, duration_days: 90, is_active: true },
        { package_name: 'Student 1-Month', description: 'แพ็กเกจราคาพิเศษสำหรับนักศึกษา (ต้องแสดงบัตร)', price: 999, session_count: 999, duration_days: 30, is_active: true },
        { package_name: 'Weekend Warrior', description: 'เข้าฟิตเนสได้เฉพาะวันเสาร์-อาทิตย์ (รายเดือน)', price: 800, session_count: 999, duration_days: 30, is_active: true },
        { package_name: 'Early Bird (Morning Only)', description: 'เข้าใช้บริการได้เฉพาะช่วง 06:00 - 12:00 น. (รายเดือน)', price: 1000, session_count: 999, duration_days: 30, is_active: false } // ตัวอย่างแพ็กเกจที่ปิดการขาย
    ];

    await Package.bulkCreate(packageData);
    console.log('✅ สร้างข้อมูล Packages จำนวน 10 รายการ สำเร็จแล้ว!');
};

module.exports = seedPackages;