const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const sequelize = require('./config/database');

// --- นำเข้า Routes ของทั้ง 4 คน ---
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const packageRoutes = require('./routes/packageRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes'); // 👈 ของคนที่ 4

const userController = require('./controllers/userController'); 

const app = express();

// 1. ตั้งค่า View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); 

// 3. Routes

// --- หน้าแรก (Home) ตกแต่งใหม่ให้สวยงาม ---
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FitLife Gym Management</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { 
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: white; margin: 0;
                }
                .container-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 3.5rem; border-radius: 25px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.3);
                }
                .btn-custom {
                    padding: 15px 35px; border-radius: 50px;
                    font-weight: bold; transition: 0.3s; margin: 10px;
                    text-decoration: none; display: inline-block;
                    font-size: 1.1rem;
                }
                .btn-user { background: #ffc107; color: #212529; border: none; }
                .btn-dash { background: #00d2ff; color: white; border: none; }
                .btn-class { background: #28a745; color: white; border: none; }
                .btn-package { background: #dc3545; color: white; border: none; }
                .btn-enroll { background: #6f42c1; color: white; border: none; } /* ปุ่มใหม่ */
                .btn-report { background: #e83e8c; color: white; border: none; } /* ปุ่มใหม่ */
                .btn-custom:hover { 
                    transform: translateY(-5px); 
                    box-shadow: 0 8px 20px rgba(0,0,0,0.4); 
                    opacity: 0.95; 
                }
            </style>
        </head>
        <body>
            <div class="container-card">
                <h1 style="font-size: 3.5rem; margin-bottom: 0.5rem;">🏋️‍♂️ FitLife Gym</h1>
                <p style="font-size: 1.3rem; opacity: 0.85; margin-bottom: 1.5rem;">ระบบบริหารจัดการสมาชิกและวิเคราะห์ข้อมูลอัจฉริยะ</p>
                <hr style="border-color: rgba(255,255,255,0.2); margin: 2rem 0;">
                <div>
                    <a href="/dashboard" class="btn-custom btn-dash">📊 ภาพรวม (Dashboard)</a>
                    <a href="/users" class="btn-custom btn-user">👥 สมาชิก (Users)</a><br>
                    <a href="/classes" class="btn-custom btn-class">📅 คลาสเรียน (Classes)</a>
                    <a href="/packages" class="btn-custom btn-package">📦 แพ็กเกจ (Packages)</a><br>
                    <a href="/enrollments" class="btn-custom btn-enroll">📝 ลงทะเบียน (Enrollments)</a>
                    <a href="/reports/members-in-class" class="btn-custom btn-report">📈 รายงาน (Reports)</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// กำหนด Route หลักของทุกคน
app.use('/users', userRoutes); 
app.use('/classes', classRoutes);
app.use('/packages', packageRoutes); 
app.use('/enrollments', enrollmentRoutes); // 👈 ของคนที่ 4
app.use('/reports', enrollmentRoutes);     // 👈 ของคนที่ 4

app.get('/dashboard', userController.dashboard);

// 4. Database Sync & Server Start
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log('--------------------------------------------------');
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log('--------------------------------------------------');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });