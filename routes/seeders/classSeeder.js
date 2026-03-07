// ไฟล์: seeders/classSeeder.js
const Class = require('../models/Class');

const seedClasses = async () => {
    console.log('🌱 กำลังสร้างข้อมูลจำลอง Classes...');
    const classData = [
            // สายโยคะและยืดเหยียด (Mind & Body)
            { className: 'Yoga Basics', scheduleTime: 'จันทร์ 08:00 - 09:00', capacity: 20, trainerId: 1, description: 'คลาสโยคะพื้นฐาน เหมาะสำหรับผู้เริ่มต้น เน้นการหายใจและยืดเหยียด' },
            { className: 'Vinyasa Flow', scheduleTime: 'พุธ 18:00 - 19:00', capacity: 15, trainerId: 1, description: 'โยคะแบบต่อเนื่อง เน้นความลื่นไหลของท่าทางและการเผาผลาญ' },
            { className: 'Pilates Reformer', scheduleTime: 'อังคาร 10:00 - 11:00', capacity: 10, trainerId: 2, description: 'พิลาทิสบนเครื่อง Reformer กระชับสัดส่วนและแกนกลางลำตัว' },
            { className: 'Stretching & Mobility', scheduleTime: 'ศุกร์ 09:00 - 10:00', capacity: 25, trainerId: 1, description: 'คลาสยืดกล้ามเนื้อ ลดออฟฟิศซินโดรมและเพิ่มความยืดหยุ่น' },
            { className: 'Sound Healing & Meditation', scheduleTime: 'อาทิตย์ 16:00 - 17:00', capacity: 30, trainerId: 2, description: 'บำบัดด้วยเสียงและทำสมาธิ ผ่อนคลายความเครียดจากวันทำงาน' },

            // สายคาร์ดิโอและลดน้ำหนัก (Cardio & Burn)
            { className: 'HIIT Bootcamp', scheduleTime: 'จันทร์ 18:30 - 19:30', capacity: 20, trainerId: 3, description: 'คาร์ดิโอแบบหนักสลับเบา เผาผลาญไขมันขั้นสุดในเวลาสั้น' },
            { className: 'Indoor Cycling (Spinning)', scheduleTime: 'พฤหัสบดี 19:00 - 20:00', capacity: 15, trainerId: 4, description: 'ปั่นจักรยานเข้าจังหวะเพลงสุดมันส์ ปั้นช่วงล่างให้แข็งแรง' },
            { className: 'Aqua Aerobics', scheduleTime: 'เสาร์ 08:30 - 09:30', capacity: 20, trainerId: 2, description: 'แอโรบิกในน้ำ ลดแรงกระแทก เหมาะสำหรับทุกเพศทุกวัย' },
            { className: 'Body Combat', scheduleTime: 'พุธ 19:30 - 20:30', capacity: 25, trainerId: 3, description: 'คาร์ดิโอที่ผสมผสานศิลปะการต่อสู้ สนุกและเรียกเหงื่อได้ดีมาก' },
            { className: 'Kettlebell Burn', scheduleTime: 'ศุกร์ 18:00 - 19:00', capacity: 12, trainerId: 4, description: 'ใช้ Kettlebell เป็นหลักในการออกกำลังกายแบบ Full-body' },

            // สายสร้างกล้ามเนื้อและความแข็งแรง (Strength)
            { className: 'Powerlifting 101', scheduleTime: 'อังคาร 18:00 - 19:30', capacity: 8, trainerId: 4, description: 'เรียนรู้ท่าพื้นฐาน Squat, Bench Press, Deadlift อย่างถูกต้อง' },
            { className: 'BodyPump', scheduleTime: 'จันทร์ 19:30 - 20:30', capacity: 20, trainerId: 3, description: 'เวทเทรนนิ่งเข้าจังหวะเพลง สร้างกล้ามเนื้อทุกส่วนของร่างกาย' },
            { className: 'CrossFit Fundamentals', scheduleTime: 'พฤหัสบดี 07:00 - 08:00', capacity: 15, trainerId: 4, description: 'เตรียมความพร้อมร่างกายสู่การเล่นครอสฟิตแบบเข้มข้น' },
            { className: 'TRX Suspension Training', scheduleTime: 'พุธ 12:00 - 13:00', capacity: 12, trainerId: 3, description: 'ใช้แรงต้านจากสาย TRX และน้ำหนักตัวเพื่อสร้างความแข็งแรง' },
            { className: 'Core & Abs Blast', scheduleTime: 'ศุกร์ 12:30 - 13:00', capacity: 20, trainerId: 2, description: '30 นาทีเน้นๆ กับการสร้างซิกซ์แพ็กและแกนกลางลำตัว' },

            // สายเต้นและทักษะพิเศษ (Dance & Specialty)
            { className: 'Zumba Dance Party', scheduleTime: 'อังคาร 19:00 - 20:00', capacity: 30, trainerId: 1, description: 'เต้นซุมบ้าจังหวะละติน สนุกจนลืมไปเลยว่ากำลังออกกำลังกาย' },
            { className: 'Muay Thai Cardio', scheduleTime: 'ศุกร์ 19:00 - 20:30', capacity: 15, trainerId: 3, description: 'คาร์ดิโอมวยไทย ปล่อยพลังและคลายเครียดได้ดีเยี่ยม' },
            { className: 'K-Pop Dance Cover', scheduleTime: 'เสาร์ 14:00 - 15:30', capacity: 20, trainerId: 1, description: 'เรียนเต้นโคฟเวอร์เพลง K-Pop สุดฮิต อัปเดตเพลงใหม่ทุกเดือน' },
            { className: 'Calisthenics Basics', scheduleTime: 'อาทิตย์ 10:00 - 11:30', capacity: 15, trainerId: 4, description: 'บอดี้เวทขั้นสูงแบบยิมนาสติก สร้างกล้ามเนื้อด้วยน้ำหนักตัว' },
            { className: 'Senior Fitness', scheduleTime: 'จันทร์ 10:00 - 11:00', capacity: 15, trainerId: 2, description: 'คลาสออกกำลังกายเบาๆ สำหรับผู้สูงวัย เน้นการทรงตัวและข้อต่อ' }
        ];

    await Class.bulkCreate(classData);
    console.log('✅ สร้างข้อมูล Classes สำเร็จแล้ว!');
};

module.exports = seedClasses;