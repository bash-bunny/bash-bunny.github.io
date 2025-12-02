// Matrix Rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0'; // Green
    ctx.font = `${fontSize}px monospace`;
    
    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

setInterval(draw, 33); // ~30 FPS

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Fetch GitHub Repos
async function fetchRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    return await response.json();
}

async function loadRepos() {
    const repoList = document.getElementById('repo-list');
    const users = ['bash-bunny', 'paranoidsec']; // Your accounts
    
    for (const user of users) {
        const repos = await fetchRepos(user);
        repos.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'} (Stars: ${repo.stargazers_count})`;
            repoList.appendChild(li);
        });
    }
}

loadRepos();
