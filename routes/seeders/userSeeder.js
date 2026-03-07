const User = require('../../models/User');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
    console.log('🌱 กำลังสร้างข้อมูลจำลอง Users...');
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = [
            // 1. Admin Group (รหัส 01)
            { username: 'admin_fitlife', email: 'admin@fitlife.com', password: hashedPassword, rrole: 'admin', member_code: '01001' },
            
            // 2. Trainer Group (รหัส 03)
            { username: 'trainer_jack', email: 'jack.fit@gmail.com', password: hashedPassword, rrole: 'trainer', member_code: '03001' },
            { username: 'coach_sarah', email: 'sarah.yoga@gmail.com', password: hashedPassword, rrole: 'trainer', member_code: '03002' },
            { username: 'trainer_mike', email: 'mike.power@gmail.com', password: hashedPassword, rrole: 'trainer', member_code: '03003' },

            // 3. Member Group (รหัส 02)
            { username: 'somchai_s', email: 'somchai@mail.com', password: hashedPassword, rrole: 'member', member_code: '02001' },
            { username: 'jane_doe', email: 'jane.d@hotmail.com', password: hashedPassword, rrole: 'member', member_code: '02002' },
            { username: 'kitti_smart', email: 'kitti.s@outlook.com', password: hashedPassword, rrole: 'member', member_code: '02003' },
            { username: 'napa_healthy', email: 'napa.h@gmail.com', password: hashedPassword, rrole: 'member', member_code: '02004' },
            { username: 'bob_builder', email: 'bob.b@mail.com', password: hashedPassword, rrole: 'member', member_code: '02005' },
            { username: 'alice_wonder', email: 'alice.w@gmail.com', password: hashedPassword, rrole: 'member', member_code: '02006' },
            { username: 'charles_p', email: 'charles.p@mail.com', password: hashedPassword, rrole: 'member', member_code: '02007' },
            { username: 'david_strong', email: 'david.s@gmail.com', password: hashedPassword, rrole: 'member', member_code: '02008' },
            { username: 'emma_fit', email: 'emma.f@mail.com', password: hashedPassword, rrole: 'member', member_code: '02009' },
            { username: 'frank_gym', email: 'frank.g@outlook.com', password: hashedPassword, rrole: 'member', member_code: '02010' },
            { username: 'grace_yoga', email: 'grace.y@mail.com', password: hashedPassword, rrole: 'member', member_code: '02011' }
        ];

        await User.bulkCreate(users);
        console.log('✅ สร้างข้อมูล Users สำเร็จแล้ว!');
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาดในการสร้าง Users:', error);
    }
};

module.exports = seedUsers;