const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_auth'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// User Registration
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, hashedPassword, role], (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// User Login
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'All fields required' });

  const query = 'SELECT * FROM users WHERE email = ? AND role = ?';
  db.query(query, [email, role], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(404).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token, role: user.role });
  });
});

// Get all assignments
app.get('/assignments', (req, res) => {
  db.query('SELECT * FROM assignments ORDER BY created_at DESC', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Create a new assignment
app.post('/assignments', (req, res) => {
  const { title, description, due_date, resources, course_id } = req.body;
  const query = 'INSERT INTO assignments (title, description, due_date, resources, course_id) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [title, description, due_date, resources, course_id || null], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Assignment created successfully', id: result.insertId });
  });
});

// Update an assignment
app.put('/assignments/:id', (req, res) => {
  const { title, description, due_date, resources } = req.body;
  const query = 'UPDATE assignments SET title = ?, description = ?, due_date = ?, resources = ? WHERE id = ?';

  db.query(query, [title, description, due_date, resources, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Assignment updated successfully' });
  });
});

// Delete an assignment
app.delete('/assignments/:id', (req, res) => {
  db.query('DELETE FROM assignments WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Assignment deleted successfully' });
  });
});

// Get all courses
app.get('/courses', (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new course
app.post('/courses', (req, res) => {
  const { title, description, category, level, prerequisites } = req.body;
  const sql = 'INSERT INTO courses (title, description, category, level, prerequisites) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, category, level, prerequisites], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Course Added', id: result.insertId });
  });
});

// Delete a course
app.delete('/courses/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM courses WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Course Deleted' });
  });
});

// Update a course
app.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category, level, prerequisites } = req.body;
  const sql = 'UPDATE courses SET title = ?, description = ?, category = ?, level = ?, prerequisites = ? WHERE id = ?';
  db.query(sql, [title, description, category, level, prerequisites, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Course Updated' });
  });
});

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { course_id, title, file_type } = req.body;
  const file_path = `/uploads/${req.file.filename}`;

  db.query('INSERT INTO uploaded_content (course_id, title, file_type, file_path) VALUES (?, ?, ?, ?)',
    [course_id, title, file_type, file_path], (err) => {
      if (err) throw err;
      res.json({ message: 'File uploaded successfully' });
    });
});

app.get('/uploads', (req, res) => {
  const { course_id } = req.query;
  db.query('SELECT * FROM uploaded_content WHERE course_id = ?', [course_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM uploaded_content WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'File deleted successfully' });
  });
});

// Password Reset via Email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
});

app.post('/api/request-reset', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expireTime = Date.now() + 3600000;
    db.query('UPDATE users SET reset_token = ?, reset_expiry = ? WHERE email = ?',
      [token, expireTime, email], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating token' });

        const mailOptions = {
          from: 'your-email@gmail.com',
          to: email,
          subject: 'Password Reset Request',
          text: `Click to reset password: http://localhost:4200/reset-password?token=${token}`
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) return res.status(500).json({ message: 'Error sending email' });
          res.json({ message: 'Password reset link sent to email' });
        });
      });
  });
});

// API to Get Recommended Courses
app.get("/recommendations/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const query = `
    SELECT c.*
    FROM courses c
    WHERE c.id NOT IN (
        SELECT course_id FROM progress WHERE student_id = ?
    )
    ORDER BY RAND() LIMIT 5
  `;

  db.query(query, [studentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Course Lessons with Interactive Content
app.get("/courses/:courseId/lessons", (req, res) => {
  const courseId = req.params.courseId;
  const query = `
    SELECT l.id as lesson_id, l.title as lesson_title, l.content, m.id as material_id, m.type, m.url
    FROM lessons l
    LEFT JOIN materials m ON l.id = m.lesson_id
    WHERE l.course_id = ?
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const lessons = {};
    results.forEach(row => {
      if (!lessons[row.lesson_id]) {
        lessons[row.lesson_id] = { id: row.lesson_id, title: row.lesson_title, content: row.content, materials: [] };
      }
      if (row.material_id) {
        lessons[row.lesson_id].materials.push({ id: row.material_id, type: row.type, url: row.url });
      }
    });

    res.json(Object.values(lessons));
  });
});

// Update Student Progress
app.post("/progress", (req, res) => {
  const { studentId, lessonId, completionPercentage } = req.body;
  const query = `
    INSERT INTO progress (student_id, lesson_id, completion_percentage) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE completion_percentage = VALUES(completion_percentage), last_accessed = CURRENT_TIMESTAMP
  `;

  db.query(query, [studentId, lessonId, completionPercentage], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Progress updated successfully!" });
  });
});

// Get Announcements
app.get('/announcements', (req, res) => {
  db.query('SELECT * FROM announcements ORDER BY created_at DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create Announcement
app.post('/announcements', (req, res) => {
  const { title, message } = req.body;
  db.query('INSERT INTO announcements (title, message) VALUES (?, ?)', [title, message], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, message, created_at: new Date() });
  });
});


app.get('/generate-certificates', (req, res) => {
  const sql = 'SELECT id, name, course, completion_date FROM students WHERE completed = 1';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ message: 'Certificates generated!', data: results });
  });
});

app.get('/generate-performance-reports', (req, res) => {
  const sql = 'SELECT id, name, course, score, grade FROM student_performance';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ message: 'Performance reports generated!', data: results });
  });
});

app.get('/student-details', (req, res) => {
  db.query('SELECT * FROM students WHERE id = 1', (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result[0]); 
    }
  });
});

// API endpoint to get student by ID
app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;

  const query = 'SELECT * FROM students WHERE id = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length > 0) {
      res.json(results[0]);  // Send back the student data
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  });
});


// Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get student by ID
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json(result[0] || { message: "Student not found" });
  });
});

// Update attendance and engagement
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { attendance_percentage, engagement_score } = req.body;

  db.query(
    "UPDATE students SET attendance_percentage = ?, engagement_score = ? WHERE id = ?",
    [attendance_percentage, engagement_score, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Updated successfully" });
    }
  );
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Deleted successfully" });
  });
});

// GET all grades
app.get('/api/grades', (req, res) => {
  const query = 'SELECT * FROM grades';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching grades:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// GET grade by ID
app.get('/api/grades/:id', (req, res) => {
  const gradeId = req.params.id;
  const query = 'SELECT * FROM grades WHERE id = ?';
  db.query(query, [gradeId], (err, results) => {
    if (err) {
      console.error('Error fetching grade details:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(results[0]);
  });
});

// POST (Create) a new grade
app.post('/api/grades', (req, res) => {
  const { studentName, course, score, maxScore } = req.body;
  const query = 'INSERT INTO grades (studentName, course, score, maxScore) VALUES (?, ?, ?, ?)';
  db.query(query, [studentName, course, score, maxScore], (err, results) => {
    if (err) {
      console.error('Error creating grade:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: results.insertId, studentName, course, score, maxScore });
  });
});

// PUT (Update) a grade by ID
app.put('/api/grades/:id', (req, res) => {
  const gradeId = req.params.id;
  const { studentName, course, score, maxScore } = req.body;
  const query = 'UPDATE grades SET studentName = ?, course = ?, score = ?, maxScore = ? WHERE id = ?';
  db.query(query, [studentName, course, score, maxScore, gradeId], (err, results) => {
    if (err) {
      console.error('Error updating grade:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json({ id: gradeId, studentName, course, score, maxScore });
  });
});

// DELETE a grade by ID
app.delete('/api/grades/:id', (req, res) => {
  const gradeId = req.params.id;
  const query = 'DELETE FROM grades WHERE id = ?';
  db.query(query, [gradeId], (err, results) => {
    if (err) {
      console.error('Error deleting grade:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.status(204).send(); // No content
  });
});

app.get('/api/feedbacks', (req, res) => {
  const query = 'SELECT * FROM feedbacks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedbacks:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// API to get student performance data
app.get('/api/performance-reports', (req, res) => {
  let sql = 'SELECT * FROM progress';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Fetch all enrollments
app.get('/api/enrollments', (req, res) => {
  const query = 'SELECT * FROM enrollments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching enrollments:', err);
      res.status(500).send('Error fetching enrollments');
    } else {
      res.json(results);
    }
  });
});

// Update enrollment status
app.put('/api/enrollments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  const query = 'UPDATE enrollments SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, results) => {
    if (err) {
      console.error('Error updating enrollment status:', err);
      res.status(500).send('Error updating enrollment status');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Enrollment not found');
    } else {
      res.send({ message: `Enrollment ${status} successfully!` });
    }
  });
});

// API to Fetch Learning Content
app.get('/api/learning-content', (req, res) => {
  const query = 'SELECT * FROM learning_content';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching learning content:', err);
      res.status(500).json({ error: 'Failed to fetch learning content' });
      return;
    }
    res.json(results);
  });
});

// API to Add Learning Content
app.post('/api/learning-content', (req, res) => {
  const { title, type, file_path, description } = req.body;
  const query = 'INSERT INTO learning_content (title, type, file_path, description) VALUES (?, ?, ?, ?)';
  db.query(query, [title, type, file_path, description], (err, results) => {
    if (err) {
      console.error('Error adding learning content:', err);
      res.status(500).json({ error: 'Failed to add learning content' });
      return;
    }
    res.json({ id: results.insertId, message: 'Learning content added successfully' });
  });
});

// API to Fetch Assignments
app.get('/api/assignments', (req, res) => {
  const query = 'SELECT * FROM assignments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching assignments:', err);
      res.status(500).json({ error: 'Failed to fetch assignments' });
      return;
    }
    res.json(results);
  });
});

// API to Submit Assignment
app.post('/api/assignments/submit', (req, res) => {
  const { assignment_id, student_id, submission_file } = req.body;
  const query = 'INSERT INTO assignment_submissions (assignment_id, student_id, submission_file) VALUES (?, ?, ?)';
  db.query(query, [assignment_id, student_id, submission_file], (err, results) => {
    if (err) {
      console.error('Error submitting assignment:', err);
      res.status(500).json({ error: 'Failed to submit assignment' });
      return;
    }
    res.json({ id: results.insertId, message: 'Assignment submitted successfully' });
  });
});

// API to fetch all classes
app.get('/api/classes', (req, res) => {
  const sql = 'SELECT * FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API to add a new class
app.post('/api/classes', (req, res) => {
  const { title, description, start_time, meeting_link, teacher_id } = req.body;
  const sql = 'INSERT INTO classes (title, description, start_time, meeting_link, teacher_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, start_time, meeting_link, teacher_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// API to fetch posts
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API to fetch progress data
app.get('/api/progress', (req, res) => {
  const query = 'SELECT * FROM progress';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Fetch all quizzes
app.get('/api/quizzes', (req, res) => {
  const query = 'SELECT * FROM quizzes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching quizzes:', err);
      res.status(500).send('Error fetching quizzes');
    } else {
      res.json(results);
    }
  });
});

// Fetch a single quiz by ID
app.get('/api/quiz/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM quizzes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching quiz:', err);
      res.status(500).send('Error fetching quiz');
    } else if (results.length === 0) {
      res.status(404).send('Quiz not found');
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/api/quizAttempts', (req, res) => {
  const query = 'SELECT * FROM quiz_attempts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching quiz attempts:', err);
      return res.status(500).json({ error: 'Failed to fetch quiz attempts' });
    }
    res.json(results);
  });
});

// Fetch Quiz Attempt by ID
app.get('/api/quizAttempts/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM quiz_attempts WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching quiz attempt:', err);
      return res.status(500).json({ error: 'Failed to fetch quiz attempt' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Quiz attempt not found' });
    }
    res.json(results[0]);
  });
});

// API to fetch study materials
app.get('/api/materials', (req, res) => {
  const query = 'SELECT * FROM materials';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});