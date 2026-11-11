// --- 1. RELÓGIO E DATA ---
function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('pt-BR', options);
}
setInterval(updateClock, 1000);
updateClock();

// --- 2. CHUVA DE CÓDIGO MATRIX ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>\\';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- 3. TERMINAL INTERATIVO ---
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const commandText = input.value.trim();
        if (commandText !== '') {
            processCommand(commandText);
            input.value = '';
        }
    }
});

function processCommand(cmd) {
    // Exibe o comando digitado no histórico
    const userLine = document.createElement('p');
    userLine.innerHTML = `<span class="prompt">user@matrix-tab:~$</span> ${cmd}`;
    output.appendChild(userLine);

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const response = document.createElement('p');
    response.className = 'system-msg';

    switch (mainCmd) {
        case 'help':
            response.innerHTML = `Comandos disponíveis:<br>
            - <span class="highlight">help</span>: Mostra esta lista de comandos<br>
            - <span class="highlight">clear</span>: Limpa o terminal<br>
            - <span class="highlight">open [site]</span>: Abre um site (ex: open github, open youtube)<br>
            - <span class="highlight">echo [texto]</span>: Exibe um texto no terminal<br>
            - <span class="highlight">date</span>: Mostra a data atual`;
            break;

        case 'clear':
            output.innerHTML = '';
            return;

        case 'date':
            response.innerText = new Date().toLocaleString('pt-BR');
            break;

        case 'echo':
            response.innerText = args || 'Nada para repetir.';
            break;

        case 'open':
            if (!args) {
                response.innerText = 'Uso: open [github | youtube | google | chatgpt]';
            } else {
                let url = args.toLowerCase();
                if (!url.startsWith('http')) {
                    if (url === 'github') url = 'https://github.com';
                    else if (url === 'youtube') url = 'https://youtube.com';
                    else if (url === 'google') url = 'https://google.com';
                    else if (url === 'chatgpt') url = 'https://chatgpt.com';
                    else url = `https://${url}.com`;
                }
                window.open(url, '_blank');
                response.innerText = `Abrindo ${url}...`;
            }
            break;

        default:
            response.innerText = `Comando não reconhecido: '${mainCmd}'. Digite 'help' para ajuda.`;
            break;
    }

    output.appendChild(response);
    output.scrollTop = output.scrollHeight;
}
