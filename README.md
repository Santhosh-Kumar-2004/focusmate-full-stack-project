# FocusMate 🧠

**FocusMate** is a simple yet effective web app designed to help you plan your day using a time-blocking scheduler. Add tasks, set durations, and FocusMate will organize them into your day—making productivity effortless.

---

## 🚀 Features

- 📝 Add tasks with estimated duration
- 🕒 Smart time-slot scheduler (auto placement)
- ✅ Mark tasks as completed
- 📊 Clean, responsive UI
- 🔐 User login & registration (optional)
- ⚡ Built with React, FastAPI, and SQL

---

## 🛠 Tech Stack

- **Frontend**: React.js + Vite
- **Backend**: FastAPI (Python)
- **Database**: SQLite / PostgreSQL (via SQLAlchemy)
- **Auth**: JWT-based (optional for MVP)

---

## 🧠 How It Works

1. Add tasks with a name and estimated time.
2. Choose your available hours (e.g., 9 AM – 6 PM).
3. FocusMate fills your day with the best time slots.
4. Check off tasks as you complete them!

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/focusmate.git
cd focusmate

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend Setup
cd ../frontend
npm install
npm run dev
```

🎯 Future Improvements
Drag and drop rescheduling

Reminder notifications

Pomodoro timer integration

Daily summary and analytics

📜 License
This project is licensed under the MIT License.

💡 Inspiration
Built during a 48-hour hackathon to solve a simple yet universal problem—how to plan your day smarter.
