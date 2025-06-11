CREATE DATABASE focusmate_db;

USE focusmate_db;

CREATE TABLE tasks (
	task_id CHAR(36) PRIMARY KEY,
    title VARCHAR(50),
    description TEXT,
    duration INT NOT NULL,
    start_time TIME,
    is_done BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id CHAR(36),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample data to insert into users table
INSERT INTO users (id, username, email, password, role)
VALUES (
  '11111111-1111-1111-1111-111111111111', 
  'santhosh', 
  'santhosh@example.com', 
  'hashed_password', 
  'user'
);

SELECT * FROM users;

-- Sample data to insert into tasks table
INSERT INTO tasks (task_id, title, description, duration, start_time, is_done, user_id)
VALUES 
(
  '22222222-2222-2222-2222-222222222222',
  'Learn React Basics',
  'Finish React hooks and components',
  60,
  '10:00:00',
  FALSE,
  '11111111-1111-1111-1111-111111111111'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Build FocusMate UI',
  'Create basic structure for FocusMate project',
  90,
  '12:00:00',
  FALSE,
  '11111111-1111-1111-1111-111111111111'
);

SELECT * FROM tasks;

-- testing query
SELECT 
    u.username,
    u.email,
    t.title,
    t.description,
    t.duration,
    t.start_time,
    t.is_done
FROM users u
JOIN tasks t ON u.id = t.user_id;



