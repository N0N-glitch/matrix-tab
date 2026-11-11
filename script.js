/* =====================================================
   MATRIX OS - CYBERPUNK NEW TAB
   SCRIPT.JS
   ===================================================== */


/* =====================================================
   1. ELEMENTOS PRINCIPAIS
   ===================================================== */

const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');

const canvas = document.getElementById('matrix-canvas');

const terminal = document.getElementById('draggable-terminal');
const terminalHeader = document.getElementById('terminal-drag-handle');

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const toggleTerminalButton = document.getElementById('toggle-terminal-btn');

const closeButton = document.getElementById('btn-close');
const minimizeButton = document.getElementById('btn-minimize');
const expandButton = document.getElementById('btn-expand');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


/* =====================================================
   2. RELÓGIO E DATA
   ===================================================== */

function updateClock() {

    if (!clockElement || !dateElement) return;

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    dateElement.textContent = now.toLocaleDateString('pt-BR', options);
}

updateClock();

setInterval(updateClock, 1000);


/* =====================================================
   3. CHUVA DIGITAL MATRIX
   ===================================================== */

if (canvas) {

    const ctx = canvas.getContext('2d');

    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>\\';

    const fontSize = 14;

    let columns = 0;
    let drops = [];

    let animationFrame = null;
    let lastFrameTime = 0;

    const frameInterval = 33;

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    function resizeCanvas() {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        columns = Math.ceil(width / fontSize);

        const previousDrops = drops;

        drops = [];

        for (let i = 0; i < columns; i++) {

            drops[i] = previousDrops[i] !== undefined
                ? previousDrops[i]
                : Math.random() * -100;

        }

    }

    function drawMatrix(timestamp = 0) {

        if (document.hidden) return;

        if (timestamp - lastFrameTime < frameInterval) {

            animationFrame = requestAnimationFrame(drawMatrix);

            return;
        }

        lastFrameTime = timestamp;

        const width = window.innerWidth;
        const height = window.innerHeight;

        ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';

        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff66';

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {

            const character = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );

            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(character, x, y);

            if (
                y > height &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;

            }

            drops[i]++;

        }

        animationFrame = requestAnimationFrame(drawMatrix);

    }

    function startMatrix() {

        if (animationFrame !== null) return;

        if (reducedMotion.matches) {

            ctx.fillStyle = '#0d0d0d';

            ctx.fillRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            return;
        }

        lastFrameTime = 0;

        animationFrame = requestAnimationFrame(drawMatrix);

    }

    function stopMatrix() {

        if (animationFrame !== null) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

        }

    }

    resizeCanvas();

    startMatrix();

    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('visibilitychange', () => {

        if (document.hidden) {

            stopMatrix();

        } else {

            startMatrix();

        }

    });

    reducedMotion.addEventListener('change', () => {

        stopMatrix();

        resizeCanvas();

        startMatrix();

    });

}


/* =====================================================
   4. SISTEMA DE PESQUISA
   ===================================================== */

function getSearchDestination(value) {

    const query = value.trim();

    if (!query) return null;

    if (/^https?:\/\//i.test(query)) {

        try {

            const url = new URL(query);

            if (!url.hostname || !url.hostname.includes('.')) {
                return null;
            }

            return url.href;

        } catch {

            return null;

        }

    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(query)) {

        return null;

    }

    const looksLikeAddress =
        !/\s/.test(query) &&
        (
            query.includes('.') ||
            query.startsWith('localhost') ||
            /^\d{1,3}(\.\d{1,3}){3}(:\d+)?(\/.*)?$/.test(query)
        );

    if (looksLikeAddress) {

        try {

            const url = new URL(`https://${query}`);

            return url.hostname ? url.href : null;

        } catch {

            return null;

        }

    }

    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;

}


if (searchForm && searchInput) {

    searchForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const destination = getSearchDestination(searchInput.value);

        if (!destination) {

            searchInput.setCustomValidity(
                'Introduza uma pesquisa ou um endereço válido.'
            );

            searchInput.reportValidity();

            return;

        }

        searchInput.setCustomValidity('');

        window.location.assign(destination);

    });

    searchInput.addEventListener('input', () => {

        searchInput.setCustomValidity('');

    });

}


/* =====================================================
   5. SISTEMA DE JANELAS DO TERMINAL
   ===================================================== */

const TERMINAL_STORAGE_KEY = 'matrixTerminalPosition';

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let restorePosition = null;


/* =====================================================
   6. LIMITES DA JANELA
   ===================================================== */

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


function getTerminalBounds() {
    if (!terminal) return { width: 0, height: 0, maxX: 0, maxY: 0 };
    const rect = terminal.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width);
    const maxY = Math.max(0, window.innerHeight - rect.height);

    return {
        width: rect.width,
        height: rect.height,
        maxX,
        maxY
    };
}


function setTerminalPosition(x, y, save = true) {

    if (!terminal) return;

    const bounds = getTerminalBounds();
    const finalX = clamp(x, 0, bounds.maxX);
    const finalY = clamp(y, 0, bounds.maxY);

    terminal.style.left = `${finalX}px`;
    terminal.style.top = `${finalY}px`;
    terminal.style.right = 'auto';
    terminal.style.bottom = 'auto';
    terminal.style.transform = 'none';

    if (save) {
        saveTerminalPosition(finalX, finalY);
    }

}


/* =====================================================
   7. GUARDAR E RECUPERAR POSIÇÃO
   ===================================================== */

function saveTerminalPosition(x, y) {
    try {
        const position = { x, y };
        localStorage.setItem(
            TERMINAL_STORAGE_KEY,
            JSON.stringify(position)
        );
    } catch (error) {
        console.warn('Não foi possível guardar a posição do terminal:', error);
    }
}


function loadTerminalPosition() {
    try {
        const saved = localStorage.getItem(TERMINAL_STORAGE_KEY);
        if (!saved) return null;

        const position = JSON.parse(saved);
        if (
            typeof position.x !== 'number' ||
            typeof position.y !== 'number' ||
            !Number.isFinite(position.x) ||
            !Number.isFinite(position.y)
        ) {
            return null;
        }

        return position;
    } catch (error) {
        console.warn('Erro ao recuperar posição do terminal:', error);
        return null;
    }
}


/* =====================================================
   8. INICIALIZAÇÃO DO TERMINAL
   ===================================================== */

function initializeTerminalPosition() {

    if (!terminal) return;

    const position = loadTerminalPosition();
    const rect = terminal.getBoundingClientRect();

    let x, y;

    if (position) {
        x = position.x;
        y = position.y;
    } else {
        x = (window.innerWidth - rect.width) / 2;
        y = window.innerHeight - rect.height - 30;
    }

    setTerminalPosition(x, y);

}


/* =====================================================
   9. ABRIR E FECHAR TERMINAL
   ===================================================== */

function openTerminal() {

    if (!terminal) return;

    const wasHidden = terminal.classList.contains('hidden');

    terminal.classList.remove('hidden');
    terminal.classList.remove('minimized');
    terminal.setAttribute('aria-hidden', 'false');

    if (wasHidden) {
        initializeTerminalPosition();
    }

    if (toggleTerminalButton) {
        toggleTerminalButton.setAttribute('aria-expanded', 'true');
    }

    if (terminalInput) {
        setTimeout(() => terminalInput.focus(), 50);
    }

}


function closeTerminal() {

    if (!terminal) return;

    terminal.classList.add('hidden');
    terminal.setAttribute('aria-hidden', 'true');

    if (toggleTerminalButton) {
        toggleTerminalButton.setAttribute('aria-expanded', 'false');
        toggleTerminalButton.focus();
    }

}


function toggleTerminal() {
    if (!terminal) return;

    if (terminal.classList.contains('hidden')) {
        openTerminal();
    } else {
        closeTerminal();
    }
}


if (toggleTerminalButton) {
    toggleTerminalButton.addEventListener('click', toggleTerminal);
}

if (closeButton) {
    closeButton.addEventListener('click', closeTerminal);
}


/* =====================================================
   10. MINIMIZAR TERMINAL
   ===================================================== */

function minimizeTerminal() {
    if (!terminal) return;
    if (terminal.classList.contains('hidden')) return;

    if (terminal.classList.contains('minimized')) {
        terminal.classList.remove('minimized');
        if (terminalInput) terminalInput.focus();
    } else {
        terminal.classList.add('minimized');
    }
}

if (minimizeButton) {
    minimizeButton.addEventListener('click', minimizeTerminal);
}


/* =====================================================
   11. MAXIMIZAR E RESTAURAR TERMINAL
   ===================================================== */

function maximizeTerminal() {
    if (!terminal) return;

    const isMaximized = terminal.classList.contains('maximized');

    if (!isMaximized) {
        const rect = terminal.getBoundingClientRect();

        restorePosition = {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        };

        terminal.classList.remove('minimized');
        terminal.classList.add('maximized');

        terminal.style.left = '';
        terminal.style.top = '';
        terminal.style.bottom = '';
        terminal.style.right = '';
        terminal.style.transform = '';

    } else {
        terminal.classList.remove('maximized');

        if (restorePosition) {
            terminal.style.width = `${restorePosition.width}px`;
            terminal.style.height = `${restorePosition.height}px`;

            requestAnimationFrame(() => {
                setTerminalPosition(restorePosition.x, restorePosition.y);
                terminal.style.width = '';
                terminal.style.height = '';
            });
        } else {
            initializeTerminalPosition();
        }

        restorePosition = null;
    }

    if (expandButton) {
        const label = terminal.classList.contains('maximized') ? 'Restaurar terminal' : 'Maximizar terminal';
        expandButton.setAttribute('aria-label', label);
        expandButton.title = label;
    }
}

if (expandButton) {
    expandButton.addEventListener('click', maximizeTerminal);
}


/* =====================================================
   12. SISTEMA DE ARRASTO (POINTER EVENTS)
   ===================================================== */

if (terminalHeader && terminal) {

    terminalHeader.addEventListener('pointerdown', (event) => {

        if (event.pointerType === 'mouse' && event.button !== 0) return;

        if (event.target.closest('.window-controls')) return;

        if (
            terminal.classList.contains('hidden') ||
            terminal.classList.contains('minimized') ||
            terminal.classList.contains('maximized')
        ) {
            return;
        }

        isDragging = true;

        const rect = terminal.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        terminalHeader.classList.add('dragging');
        terminalHeader.setPointerCapture(event.pointerId);

        event.preventDefault();

    });

    terminalHeader.addEventListener('pointermove', (event) => {
        if (!isDragging) return;

        const newX = event.clientX - dragOffsetX;
        const newY = event.clientY - dragOffsetY;

        setTerminalPosition(newX, newY);
    });

    function stopDragging(event) {
        if (!isDragging) return;

        isDragging = false;
        terminalHeader.classList.remove('dragging');

        if (
            terminalHeader.hasPointerCapture &&
            terminalHeader.hasPointerCapture(event.pointerId)
        ) {
            terminalHeader.releasePointerCapture(event.pointerId);
        }
    }

    terminalHeader.addEventListener('pointerup', stopDragging);
    terminalHeader.addEventListener('pointercancel', stopDragging);
    terminalHeader.addEventListener('lostpointercapture', stopDragging);

}


/* =====================================================
   13. REDIMENSIONAMENTO DA TELA
   ===================================================== */

window.addEventListener('resize', () => {
    if (!terminal) return;
    if (
        terminal.classList.contains('hidden') ||
        terminal.classList.contains('maximized')
    ) {
        return;
    }

    const rect = terminal.getBoundingClientRect();
    setTerminalPosition(rect.left, rect.top);
});


/* =====================================================
   14. COMANDOS DO TERMINAL
   ===================================================== */

function appendCommandLine(command) {
    if (!terminalOutput) return;

    const line = document.createElement('p');
    const prompt = document.createElement('span');

    prompt.className = 'prompt';
    prompt.textContent = 'user@matrix-tab:~$ ';

    line.appendChild(prompt);
    line.appendChild(document.createTextNode(command));

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}


function getCommandURL(value) {
    const aliases = {
        github: 'https://github.com',
        youtube: 'https://youtube.com',
        google: 'https://google.com',
        chatgpt: 'https://chatgpt.com',
        stackoverflow: 'https://stackoverflow.com'
    };

    const normalized = value.trim().toLowerCase();

    if (aliases[normalized]) {
        return aliases[normalized];
    }

    if (!value.trim() || /\s/.test(value.trim())) {
        return null;
    }

    const destination = /^https?:\/\//i.test(value)
        ? value
        : `https://${value}`;

    try {
        const url = new URL(destination);

        if (url.protocol !== 'https:' && url.protocol !== 'http:') {
            return null;
        }

        if (!url.hostname.includes('.')) {
            return null;
        }

        return url.href;
    } catch {
        return null;
    }
}


function processCommand(cmd) {

    if (!terminalOutput) return;

    const commandText = cmd.trim();
    if (!commandText) return;

    appendCommandLine(commandText);

    const parts = commandText.match(/^(\S+)\s*([\s\S]*)$/);
    const mainCmd = parts[1].toLowerCase();
    const args = parts[2].trim();

    const response = document.createElement('p');
    response.className = 'system-msg';

    switch (mainCmd) {

        case 'help':
            response.innerHTML = `
                Comandos disponíveis:<br>
                - <span class="highlight">help</span>: Mostra os comandos disponíveis.<br>
                - <span class="highlight">clear</span>: Limpa o terminal.<br>
                - <span class="highlight">open [site]</span>: Abre um site.<br>
                - <span class="highlight">echo [texto]</span>: Exibe um texto.<br>
                - <span class="highlight">date</span>: Mostra data e hora.<br>
                - <span class="highlight">time</span>: Mostra a hora atual.<br>
                - <span class="highlight">about</span>: Informações do Matrix OS.<br>
                - <span class="highlight">whoami</span>: Mostra o utilizador atual.
            `;
            break;

        case 'clear':
        case 'limpar':
            terminalOutput.innerHTML = '';
            terminalOutput.scrollTop = 0;
            return;

        case 'date':
            response.textContent = new Date().toLocaleString('pt-BR');
            break;

        case 'time':
            response.textContent = new Date().toLocaleTimeString('pt-BR');
            break;

        case 'echo':
            response.textContent = args || 'Nada para repetir.';
            break;

        case 'whoami':
            response.textContent = 'user@matrix-tab';
            break;

        case 'about':
            response.textContent = 'Matrix OS v1.0.0 - Cyberpunk New Tab. Ambiente de navegação Matrix.';
            break;

        case 'open':
            if (!args) {
                response.textContent = 'Uso: open [github | youtube | google | chatgpt | domínio]';
            } else {
                const url = getCommandURL(args);
                if (!url) {
                    response.textContent = 'Endereço inválido. Utilize um domínio válido ou um dos atalhos disponíveis.';
                } else {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    response.textContent = `Abrindo ${url}...`;
                }
            }
            break;

        default:
            response.textContent = `Comando não reconhecido: '${mainCmd}'. Digite 'help' para ajuda.`;
            break;

    }

    terminalOutput.appendChild(response);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

}


/* =====================================================
   15. ENVIO DOS COMANDOS
   ===================================================== */

if (terminalInput) {

    terminalInput.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();

            const command = terminalInput.value.trim();
            if (!command) return;

            processCommand(command);
            terminalInput.value = '';
            terminalInput.focus();
        }

    });

}


/* =====================================================
   16. INICIALIZAÇÃO FINAL
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    initializeTerminalPosition();
});

console.log(
    '%c MATRIX OS ',
    'background: #00ff66; color: #000; font-weight: bold; padding: 5px;'
);

console.log(
    '%cSistema inicializado com sucesso.',
    'color: #00ff66;'
);
