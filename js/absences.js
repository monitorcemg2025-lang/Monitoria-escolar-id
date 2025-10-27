// js/absences.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('absence-form');
  const tbody = document.querySelector('#absences-table tbody');
  const absences = JSON.parse(localStorage.getItem('absences') || '[]');

  const render = () => {
    if (!tbody) return;
    tbody.innerHTML = '';
    absences.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${a.student}</td><td>${a.grade}</td><td>${a.date}</td><td>${a.reason}</td>`;
      tbody.appendChild(tr);
    });
  };

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const student = document.getElementById('student-name')?.value || '';
    const grade = document.getElementById('grade')?.value || '';
    const date = document.getElementById('absence-date')?.value || '';
    const reason = document.getElementById('reason')?.value || '';
    absences.push({ student, grade, date, reason });
    localStorage.setItem('absences', JSON.stringify(absences));
    render();
    form.reset();
  });

  render();
});
