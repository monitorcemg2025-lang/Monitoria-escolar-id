// js/auth.js
async function login(username, password) {
  try {
    const res = await fetch('data/mock-api.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao carregar dados de autenticação');
    const data = await res.json();
    const found = data.monitors?.find(m => m.username === username && m.password === password);
    return !!found;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = (document.getElementById('username')?.value || '').trim();
  const password = (document.getElementById('password')?.value || '').trim();
  const ok = await login(username, password);
  if (ok) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'main.html';
  } else {
    alert('Usuário ou senha incorretos.');
  }
});
