/* =====================================================
   MATRIX OS - CYBERPUNK NEW TAB
   SCRIPT.JS
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

const shortcutsGrid = document.getElementById('shortcuts-grid');
const addShortcutBtn = document.getElementById('add-shortcut-btn');

/* =====================================================
   1. RELÓGIO E DATA
   ===================================================== */
function updateClock() {
    if (!clockElement || !dateElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('pt-BR', options);
}
updateClock();
setInterval(updateClock, 1000);

/* =====================================================
   2. CHUVA DIGITAL MATRIX
   ===================================================== */
if (canvas) {
    const ctx = canvas.getContext('2d');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>\\';
    const fontSize = 14;
    let columns = 0;
    let drops = [];
    let animationFrame = null;
    let lastFrameTime = 0;
    const frameInterval = 33;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        columns = Math.ceil(width / fontSize);
        const previousDrops = drops;
        drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = previousDrops[i] !== undefined ? previousDrops[i] : Math.random() * -100;
        }
    }

    function drawMatrix(timestamp = 0) {
        if (document.hidden) return;
        if (timestamp - lastFrameTime < frameInterval) {
            animationFrame = requestAnimationFrame(drawMatrix);
            return;
        }
        lastFrameTime = timestamp;

        ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const character = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(character, x, y);

            if (y > window.innerHeight && Math.random() > 0.975) {
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
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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
        if (document.hidden) stopMatrix();
        else startMatrix();
    });
}

/* =====================================================
   3. SISTEMA DE ATALHOS DINÂMICOS (LOCALSTORAGE)
   ===================================================== */
const defaultShortcuts = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'StackOverflow', url: 'https://stackoverflow.com' }
];

function getStoredShortcuts() {
    try {
        const stored = localStorage.getItem('matrixShortcuts');
        return stored ? JSON.parse(stored) : defaultShortcuts;
    } catch {
        return defaultShortcuts;
    }
}

function saveShortcuts(shortcuts) {
    try {
        localStorage.setItem('matrixShortcuts', JSON.stringify(shortcuts));
    } catch (e) {
        console.warn('Erro ao salvar atalhos', e);
    }
}

function renderShortcuts() {
    if (!shortcutsGrid) return;
    shortcutsGrid.innerHTML = '';
    const shortcuts = getStoredShortcuts();

    shortcuts.forEach((item, index) => {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'shortcut-btn';
        a.target = '_blank';
        a.textContent = `[ ${item.name} ]`;

        // Permitir remover com clique longo ou botão secundário
        a.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (confirm(`Deseja remover o atalho '${item.name}'?`)) {
                shortcuts.splice(index, 1);
                saveShortcuts(shortcuts);
                renderShortcuts();
            }
        });

        shortcutsGrid.appendChild(a);
    });
}

if (addShortcutBtn) {
    addShortcutBtn.addEventListener('click', () => {
        const name = prompt('Nome do Atalho (ex: Google):');
        if (!name) return;
        let url = prompt('URL do site (ex: https://google.com):');
        if (!url) return;
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        const shortcuts = getStoredShortcuts();
        shortcuts.push({ name, url });
        saveShortcuts(shortcuts);
        renderShortcuts();
    });
}

renderShortcuts();

/* =====================================================
   4. SISTEMA DE PESQUISA
   ===================================================== */
function getSearchDestination(value) {
    const query = value.trim();
    if (!query) return null;

    if (/^https?:\/\//i.test(query)) {
        try {
            const url = new URL(query);
            return url.hostname && url.hostname.includes('.') ? url.href : null;
        } catch {
            return null;
        }
    }

    const looksLikeAddress = !/\s/.test(query) && (query.includes('.') || query.startsWith('localhost'));
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
        if (!destination) return;
        window.location.assign(destination);
    });
}

/* =====================================================
   5. CONTROLO DO TERMINAL (LIGAR/DESLIGAR PELO BOTÃO)
   ===================================================== */
const TERMINAL_STORAGE_KEY = 'matrixTerminalPosition';
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let restorePosition = null;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getTerminalBounds() {
    if (!terminal) return { width: 0, height: 0, maxX: 0, maxY: 0 };
    const rect = terminal.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
        maxX: Math.max(0, window.innerWidth - rect.width),
        maxY: Math.max(0, window.innerHeight - rect.height)
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
        try {
            localStorage.setItem(TERMINAL_STORAGE_KEY, JSON.stringify({ x: finalX, y: finalY }));
        } catch {}
    }
}

function initializeTerminalPosition() {
    if (!terminal) return;
    try {
        const saved = localStorage.getItem(TERMINAL_STORAGE_KEY);
        const rect = terminal.getBoundingClientRect();
        if (saved) {
            const pos = JSON.parse(saved);
            setTerminalPosition(pos.x, pos.y, false);
            return;
        }
        setTerminalPosition((window.innerWidth - rect.width) / 2, window.innerHeight - rect.height - 20, false);
    } catch {
        setTerminalPosition(20, 20, false);
    }
}

function toggleTerminal() {
    if (!terminal) return;
    const isHidden = terminal.classList.contains('hidden');

    if (isHidden) {
        terminal.classList.remove('hidden');
        terminal.classList.remove('minimized');
        initializeTerminalPosition();
        if (terminalInput) setTimeout(() => terminalInput.focus(), 50);
    } else {
        terminal.classList.add('hidden');
    }
}

if (toggleTerminalButton) {
    toggleTerminalButton.addEventListener('click', toggleTerminal);
}

if (closeButton) {
    closeButton.addEventListener('click', () => terminal.classList.add('hidden'));
}

if (minimizeButton) {
    minimizeButton.addEventListener('click', () => {
        terminal.classList.toggle('minimized');
    });
}

if (expandButton) {
    expandButton.addEventListener('click', () => {
        const isMaximized = terminal.classList.contains('maximized');
        if (!isMaximized) {
            const rect = terminal.getBoundingClientRect();
            restorePosition = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
            terminal.classList.add('maximized');
            terminal.style.left = ''; terminal.style.top = ''; terminal.style.transform = '';
        } else {
            terminal.classList.remove('maximized');
            if (restorePosition) {
                setTerminalPosition(restorePosition.x, restorePosition.y);
            }
        }
    });
}

/* =====================================================
   6. ARRASTO DO TERMINAL (RATO E TOQUE)
   ===================================================== */
if (terminalHeader && terminal) {
    terminalHeader.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (event.target.closest('.window-controls')) return;
        if (terminal.classList.contains('maximized')) return;

        isDragging = true;
        const rect = terminal.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;
        terminalHeader.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    terminalHeader.addEventListener('pointermove', (event) => {
        if (!isDragging) return;
        setTerminalPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    });

    function stopDragging(event) {
        if (!isDragging) return;
        isDragging = false;
        try { terminalHeader.releasePointerCapture(event.pointerId); } catch {}
    }

    terminalHeader.addEventListener('pointerup', stopDragging);
    terminalHeader.addEventListener('pointercancel', stopDragging);
}

/* =====================================================
   7. COMANDOS DO TERMINAL
   ===================================================== */
function processCommand(cmd) {
    if (!terminalOutput) return;
    const commandText = cmd.trim();
    if (!commandText) return;

    const line = document.createElement('p');
    line.innerHTML = `<span class="prompt">user@matrix-tab:~$</span> ${commandText}`;
    terminalOutput.appendChild(line);

    const response = document.createElement('p');
    response.className = 'system-msg';

    const lower = commandText.toLowerCase();
    if (lower === 'help') {
        response.innerHTML = `Comandos: help, clear, date, time, whoami, about`;
    } else if (lower === 'clear' || lower === 'limpar') {
        terminalOutput.innerHTML = '';
        return;
    } else if (lower === 'date') {
        response.textContent = new Date().toLocaleDateString('pt-BR');
    } else if (lower === 'time') {
        response.textContent = new Date().toLocaleTimeString('pt-BR');
    } else if (lower === 'whoami') {
        response.textContent = 'user@matrix-tab';
    } else if (lower === 'about') {
        response.textContent = 'Matrix OS v1.0.0 - Cyberpunk New Tab';
    } else {
        response.textContent = `Comando desconhecido: ${commandText}`;
    }

    terminalOutput.appendChild(response);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand(terminalInput.value);
            terminalInput.value = '';
        }
    });
}
