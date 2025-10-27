// js/schedules.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('schedule-form');
  const tbody = document.querySelector('#schedule-table tbody');
  const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');

  const render = () => {
    if (!tbody) return;
    tbody.innerHTML = '';
    schedules.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.monitor}</td><td>${s.date}</td><td>${s.entry}</td><td>${s.exit}</td>`;
      tbody.appendChild(tr);
    });
  };

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const monitor = document.getElementById('monitor-name')?.value || '';
    const date = document.getElementById('date')?.value || '';
    const entry = document.getElementById('entry-time')?.value || '';
    const exit = document.getElementById('exit-time')?.value || '';
    schedules.push({ monitor, date, entry, exit });
    localStorage.setItem('schedules', JSON.stringify(schedules));
    render();
    form.reset();
  });

  render();
});
