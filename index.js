const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const themeToggle = document.getElementById("themeToggle");
const addSound = document.getElementById("addSound");
const deleteSound = document.getElementById("deleteSound");

// Create "Clear All" button dynamically
const clearAllBtn = document.createElement("button");
clearAllBtn.textContent = "🧹 Clear All";
clearAllBtn.style.marginTop = "10px";
clearAllBtn.style.padding = "10px 15px";
clearAllBtn.style.border = "none";
clearAllBtn.style.borderRadius = "10px";
clearAllBtn.style.background = "#ff4d6d";
clearAllBtn.style.color = "white";
clearAllBtn.style.cursor = "pointer";
clearAllBtn.style.transition = "0.3s";
clearAllBtn.addEventListener(
  "mouseover",
  () => (clearAllBtn.style.transform = "scale(1.05)")
);
clearAllBtn.addEventListener(
  "mouseout",
  () => (clearAllBtn.style.transform = "scale(1)")
);
document.querySelector(".container").appendChild(clearAllBtn);

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all items?")) {
    document.querySelectorAll("#list li").forEach((li) => li.remove());
    saveItems();
  }
});

// Load saved items
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("shoppingList")) || [];
  saved.forEach((item) => createItem(item.text, item.done));
};

// Create a new item
function createItem(value, done = false) {
  // Prevent duplicates
  const existing = Array.from(document.querySelectorAll("#list li span")).some(
    (span) => span.textContent.toLowerCase() === value.toLowerCase()
  );
  if (existing) {
    alert("This item already exists!");
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = value;

  if (done) li.classList.add("done");

  // Toggle done
  span.addEventListener("click", () => {
    li.classList.toggle("done");
    saveItems();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "🗑️";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = () => {
    li.classList.add("fade-out");
    deleteSound.play();
    setTimeout(() => {
      li.remove();
      saveItems();
    }, 400);
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);

  saveItems();
}

// Add item
function addItem() {
  const value = input.value.trim();
  if (value === "") return;
  createItem(value);
  addSound.play();
  input.value = "";
}

// Save to local storage
function saveItems() {
  const items = [];
  document.querySelectorAll("#list li").forEach((li) => {
    items.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done"),
    });
  });
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

addBtn.addEventListener("click", addItem);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addItem();
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});
