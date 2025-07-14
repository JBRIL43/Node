const apiBase = "/api";
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}
let userName = "";
// Fetch profile
fetch(`${apiBase}/profile`, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((res) => res.json())
  .then((data) => {
    userName = data.name;
    document.getElementById("profile").textContent = userName;
  })
  .catch(() => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
let currentTab = "pending";
let editingTaskId = null;

// Edit task modal logic (define globally, not inside loadTasks)
function editTaskPrompt(task) {
  editingTaskId = task._id;
  document.getElementById("modal-edit-task-name").value = task.name;
  document.getElementById("edit-task-modal").style.display = "flex";
  document.getElementById("modal-edit-task-name").focus();
}
function closeEditTaskModal() {
  document.getElementById("edit-task-modal").style.display = "none";
  editingTaskId = null;
}
document.getElementById("modal-edit-form").onsubmit = function (e) {
  e.preventDefault();
  const newName = document.getElementById("modal-edit-task-name").value.trim();
  if (!newName || !editingTaskId) return;
  fetch(`${apiBase}/tasks/${editingTaskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  })
    .then((res) => res.json())
    .then(() => {
      closeEditTaskModal();
      loadTasks(document.getElementById("search").value);
    });
};
function loadTasks(search = "") {
  fetch(`${apiBase}/tasks?search=${encodeURIComponent(search)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const ul = document.getElementById("tasks");
      ul.innerHTML = "";
      let filtered = (data.tasks || []).filter((task) =>
        currentTab === "pending"
          ? task.status === "pending"
          : task.status === "completed"
      );
      if (!filtered.length) {
        document.getElementById("no-task").style.display = "block";
        document.getElementById("task-form").style.display = "none";
      } else {
        document.getElementById("no-task").style.display = "none";
        document.getElementById("task-form").style.display = "flex";
        filtered.forEach((task) => {
          const li = document.createElement("li");
          li.innerHTML = `<span>${task.name}</span>`;
          const actions = document.createElement("span");
          actions.className = "task-actions";
          // Edit button
          const editBtn = document.createElement("button");
          editBtn.className = "edit-btn";
          editBtn.title = "Edit Task";
          editBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.3 5.7l2 2M3 17v-2.4a2 2 0 0 1 .6-1.4l8.7-8.7a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8l-8.7 8.7a2 2 0 0 1-1.4.6H3z"/></svg>';
          editBtn.onclick = () => editTaskPrompt(task);
          actions.appendChild(editBtn);
          // Status buttons
          if (task.status === "pending") {
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.onclick = () => updateTask(task._id, "completed");
            actions.appendChild(completeBtn);
          }
          if (task.status === "completed") {
            const pendingBtn = document.createElement("button");
            pendingBtn.textContent = "Mark Pending";
            pendingBtn.onclick = () => updateTask(task._id, "pending");
            actions.appendChild(pendingBtn);
          }
          // Delete button with icon
          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.title = "Delete Task";
          deleteBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
          deleteBtn.onclick = () => deleteTask(task._id);
          actions.appendChild(deleteBtn);
          li.appendChild(actions);
          ul.appendChild(li);
        });
        // Edit task modal logic (define globally, not inside loadTasks)
        function editTaskPrompt(task) {
          editingTaskId = task._id;
          document.getElementById("modal-edit-task-name").value = task.name;
          document.getElementById("edit-task-modal").style.display = "flex";
          document.getElementById("modal-edit-task-name").focus();
        }
        function closeEditTaskModal() {
          document.getElementById("edit-task-modal").style.display = "none";
          editingTaskId = null;
        }
        document.getElementById("modal-edit-form").onsubmit = function (e) {
          e.preventDefault();
          const newName = document
            .getElementById("modal-edit-task-name")
            .value.trim();
          if (!newName || !editingTaskId) return;
          fetch(`${apiBase}/tasks/${editingTaskId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newName }),
          })
            .then((res) => res.json())
            .then(() => {
              closeEditTaskModal();
              loadTasks(document.getElementById("search").value);
            });
        };
      }
    });
}
loadTasks();
document.getElementById("task-form").onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("task-name").value;
  fetch(`${apiBase}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then(() => {
      document.getElementById("task-name").value = "";
      loadTasks();
    });
};
function updateTask(id, status) {
  fetch(`${apiBase}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
    .then((res) => res.json())
    .then(() => loadTasks(document.getElementById("search").value));
}
function deleteTask(id) {
  fetch(`${apiBase}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then(() => loadTasks(document.getElementById("search").value));
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
function showTaskForm() {
  document.getElementById("add-task-modal").style.display = "flex";
  document.getElementById("modal-task-name").focus();
}
function closeAddTaskModal() {
  document.getElementById("add-task-modal").style.display = "none";
}
document.getElementById("modal-task-form").onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("modal-task-name").value.trim();
  if (!name) return;
  fetch(`${apiBase}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then(() => {
      document.getElementById("modal-task-name").value = "";
      closeAddTaskModal();
      loadTasks(document.getElementById("search").value);
    });
};
document.getElementById("search").addEventListener("input", function () {
  loadTasks(this.value);
});
document.getElementById("pending-tab").onclick = function () {
  currentTab = "pending";
  this.classList.add("active");
  document.getElementById("completed-tab").classList.remove("active");
  loadTasks(document.getElementById("search").value);
};
document.getElementById("completed-tab").onclick = function () {
  currentTab = "completed";
  this.classList.add("active");
  document.getElementById("pending-tab").classList.remove("active");
  loadTasks(document.getElementById("search").value);
};
