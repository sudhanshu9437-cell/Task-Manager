# ✅ Task Manager

A simple, responsive **Task Manager** web app built with vanilla HTML, CSS, and JavaScript. It lets you add, edit, delete, and track tasks — with full persistence via `localStorage` so your tasks and their checked states survive page refreshes.

---

## 🌐 Live Demo

https://sudhanshu9437-cell.github.io/Task-Manager/

---

## 📸 Preview

```
┌─────────────────────────────────────┐
│  Task Manager          You can do it│
│  ░░░░░░░░░░░░░░░░░░░  [  2/5  ]     │
├─────────────────────────────────────┤
│  [ Add a new task...          ] [+]  │
├─────────────────────────────────────┤
│  ☑  Buy groceries          ✏️  🗑️   │
│  ☐  Read 10 pages          ✏️  🗑️   │
└─────────────────────────────────────┘
```

---

## ✨ Features

- **Add tasks** — type and click `+` or press Enter
- **Edit tasks** — click the ✏️ pen icon to edit inline
- **Delete tasks** — click the 🗑️ trash icon to remove
- **Check/uncheck tasks** — mark tasks as complete
- **Progress bar** — live visual progress (0% → 100%)
- **Score card** — shows `completed / total` count
- **Motivational message** — updates on task completion
- **Persistent storage** — tasks and checked states saved in `localStorage`
- **Fully responsive** — works on desktop, tablet, and mobile

---

## 🗂️ Project Structure

```
task-manager/
│
├── index.html       # App markup and layout
├── style.css        # Styling and responsive media queries
└── script.js        # All app logic and localStorage handling
```

---

---

## 🧠 How It Works

### Adding a Task
Type in the input field and click `+`. The task is appended to the list and saved to `localStorage`.

### Editing a Task
Click the ✏️ icon — the task text loads back into the input field. Edit it and click `+` to save the update.

### Deleting a Task
Click the 🗑️ icon. The task is removed from the DOM and from `localStorage`, including its checked state.

### Persistence (localStorage)
Two keys are used:

| Key | Value | Purpose |
|-----|-------|---------|
| `myTasks` | `JSON array of strings` | Stores all task texts |
| `checkedStates` | `JSON object {task: true}` | Stores which tasks are checked |

On page load, `getLocalStorage()` reads both keys and restores the full state — tasks AND their checked/unchecked state.

---

## 📱 Responsive Breakpoints

| Screen Size | Behaviour |
|-------------|-----------|
| `> 1024px` | Full layout, `width: 40%` container |
| `≤ 1024px` | Tablet: wider container, smaller progress bar |
| `≤ 768px` | Header and scorecard stack vertically |
| `≤ 480px` | Mobile: compact spacing, smaller fonts and buttons |

---

## 🛠️ Built With

- **HTML5** — semantic structure
- **CSS3** — flexbox, media queries, glassmorphism styling
- **Vanilla JavaScript** — DOM manipulation, event listeners
- **localStorage API** — client-side data persistence
- **Font Awesome 6** — icons for edit and delete buttons

---

## 🐛 Known Limitations

- Tasks with identical text share the same `localStorage` key in `checkedStates`, so checking one will check the other (since they are stored by task text as key).
- No drag-and-drop reordering support yet.
- No due dates or priority levels.

---

## 🔮 Future Improvements

- [ ] Due date support
- [ ] Task priority (High / Medium / Low)
- [ ] Drag-and-drop reordering
- [ ] Dark/light theme toggle
- [ ] Filter tasks (All / Active / Completed)

---

## 📄 License

This project is open source and free to use for personal and educational purposes.
