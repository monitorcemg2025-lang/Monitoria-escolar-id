// js/students.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");
  const tbody = document.querySelector("#students-table tbody");
  const students = JSON.parse(localStorage.getItem("students") || "[]");

  const render = () => {
    if (!tbody) return;
    tbody.innerHTML = "";
    students.forEach((student) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${student.name}</td><td>${student.grade}</td>`;
      tbody.appendChild(tr);
    });
  };

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("student-name-input").value.trim();
    const grade = document.getElementById("student-grade-input").value.trim();

    if (!name || !grade) {
      alert("Preencha todos os campos.");
      return;
    }

    students.push({ name, grade });
    localStorage.setItem("students", JSON.stringify(students));
    render();
    form.reset();
  });

  render();
});
