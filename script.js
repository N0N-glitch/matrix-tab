/* =====================================================
   MATRIX OS - CYBERPUNK NEW TAB
   SCRIPT.JS
   ===================================================== */

/* =====================================================
   ELEMENTOS DA PÁGINA
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
   2. CHUVA DIGITAL MATRIX
   ===================================================== */

if (canvas) {
    const ctx = canvas.getContext('2d');

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>\\';

    const fontSize = 17;
    const frameInterval = 45;

    let columns = 0;
    let drops = [];

    let animationFrame = null;
    let lastFrameTime = 0;

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    function resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.floor(width * pixelRatio);
        canvas.height = Math.floor(height * pixelRatio);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        columns = Math.ceil(width / fontSize);

        const previousDrops = drops;
        drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = previousDrops[i] !== undefined
                ? previousDrops[i]
                : Math.random() * -100;
        }

        // Limpa o canvas depois de cada redimensionamento.
        ctx.clearRect(0, 0, width, height);
    }

    function drawMatrix(timestamp = 0) {
        if (document.hidden) {
            animationFrame = null;
            return;
        }

        if (timestamp - lastFrameTime < frameInterval) {
            animationFrame = requestAnimationFrame(drawMatrix);
            return;
        }

        lastFrameTime = timestamp;

        // Camada escura para criar o efeito de rasto.
        ctx.fillStyle = 'rgba(8, 13, 9, 0.12)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.fillStyle = '#00c853';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const character = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );

            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(character, x, y);

            if (
                y > window.innerHeight &&
                Math.random() > 0.985
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
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
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

    // Atualiza a animação quando o ecrã muda de tamanho ou orientação.
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    // Evita manter a animação ativa quando o separador não está visível.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopMatrix();
        } else {
            startMatrix();
        }
    });

    // Respeita a preferência do dispositivo por movimento reduzido.
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) {
            stopMatrix();
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        } else {
            startMatrix();
        }
    });
}


/* =====================================================
   3. SISTEMA DE ATALHOS DINÂMICOS
   ===================================================== */

const defaultShortcuts = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'StackOverflow', url: 'https://stackoverflow.com' }
];

// Ícones SVG dos atalhos padrão.
// São elementos visuais estáticos, não conteúdo fornecido pelo utilizador.

const shortcutIcons = {
    GitHub: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z"/>
        </svg>
    `,

    YouTube: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.3 3.7-6.3 3.7Z"/>
        </svg>
    `,

    ChatGPT: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3.2a4.2 4.2 0 0 1 4.1 3.2 4.2 4.2 0 0 1 3.1 6.4 4.2 4.2 0 0 1-2 6.8 4.2 4.2 0 0 1-7.1 1.2 4.2 4.2 0 0 1-6.2-4.3 4.2 4.2 0 0 1-.1-7.1A4.2 4.2 0 0 1 12 3.2Z"/>
                <path d="m8.2 6.1 7.6 4.4v7.3M4.8 9.2l7.5 4.4 6.5-3.7M7.2 17.2l7.5-4.3M12 3.2v7.4"/>
            </g>
        </svg>
    `,

    StackOverflow: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M17.2 20.2v-5.1h1.8V22H3v-6.9h1.8v5.1h12.4ZM6.2 17.7h9.9v-1.8H6.2v1.8Zm.3-4.2 9.7 2.1.4-1.8-9.7-2.1-.4 1.8Zm1.2-4.1 9 4.2.8-1.7-9-4.2-.8 1.7Zm2.3-3.8 7.7 6.2 1.2-1.5-7.7-6.2-1.2 1.5Zm4-3.8-1.5 1.1 5.8 8.1 1.5-1.1L14 1.8Z"/>
        </svg>
    `
};

function getStoredShortcuts() {
    try {
        const stored = localStorage.getItem('matrixShortcuts');

        if (!stored) {
            return [...defaultShortcuts];
        }

        const parsed = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return [...defaultShortcuts];
        }

        return parsed.filter(item =>
            item &&
            typeof item.name === 'string' &&
            typeof item.url === 'string'
        );

    } catch {
        return [...defaultShortcuts];
    }
}

function saveShortcuts(shortcuts) {
    try {
        localStorage.setItem(
            'matrixShortcuts',
            JSON.stringify(shortcuts)
        );
    } catch (error) {
        console.warn('Erro ao salvar atalhos:', error);
    }
}

function renderShortcuts() {
    if (!shortcutsGrid) return;

    shortcutsGrid.innerHTML = '';

    const shortcuts = getStoredShortcuts();

    shortcuts.forEach((item, index) => {
        const link = document.createElement('a');

        link.href = item.url;
        link.className = 'shortcut-card';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = `Abrir ${item.name}`;

        // Ícone conhecido ou ícone genérico para atalhos personalizados.
        const icon = document.createElement('span');
        icon.className = 'shortcut-icon';

        if (shortcutIcons[item.name]) {
            icon.innerHTML = shortcutIcons[item.name];
        } else {
            icon.textContent = '↗';
        }

        const name = document.createElement('span');
        name.className = 'shortcut-name';
        name.textContent = item.name;

        link.appendChild(icon);
        link.appendChild(name);

        // Remover um atalho com clique secundário ou toque prolongado.
        link.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            removeShortcut(index);
        });

        let pressTimer = null;

        link.addEventListener('pointerdown', () => {
            pressTimer = setTimeout(() => {
                removeShortcut(index);
            }, 750);
        });

        ['pointerup', 'pointerleave', 'pointercancel'].forEach(eventName => {
            link.addEventListener(eventName, () => {
                clearTimeout(pressTimer);
            });
        });

        shortcutsGrid.appendChild(link);
    });
}

function removeShortcut(index) {
    const shortcuts = getStoredShortcuts();
    const item = shortcuts[index];

    if (!item) return;

    if (confirm(`Deseja remover o atalho '${item.name}'?`)) {
        shortcuts.splice(index, 1);
        saveShortcuts(shortcuts);
        renderShortcuts();
    }
}

if (addShortcutBtn) {
    addShortcutBtn.addEventListener('click', () => {
        const name = prompt('Nome do atalho (ex.: Google):');

        if (!name || !name.trim()) return;

        let url = prompt('Endereço do site (ex.: https://google.com):');

        if (!url || !url.trim()) return;

        url = url.trim();

        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        try {
            const parsedUrl = new URL(url);

            if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
                alert('Endereço inválido.');
                return;
            }

            const shortcuts = getStoredShortcuts();

            shortcuts.push({
                name: name.trim(),
                url: parsedUrl.href
            });

            saveShortcuts(shortcuts);
            renderShortcuts();

        } catch {
            alert('Não foi possível reconhecer esse endereço.');
        }
    });
}

renderShortcuts();


/* =====================================================
   4. SISTEMA DE PESQUISA
   ===================================================== */

function getSearchDestination(value) {
    const query = value.trim();

    if (!query) return null;

    // Se já for um endereço com HTTP ou HTTPS.
    if (/^https?:\/\//i.test(query)) {
        try {
            const url = new URL(query);

            return url.hostname ? url.href : null;

        } catch {
            return null;
        }
    }

    // Se parecer um domínio, tenta abrir diretamente.
    const looksLikeAddress =
        !/\s/.test(query) &&
        (query.includes('.') || query.startsWith('localhost'));

    if (looksLikeAddress) {
        try {
            const url = new URL(`https://${query}`);

            return url.hostname ? url.href : null;

        } catch {
            return null;
        }
    }

    // Caso contrário, faz uma pesquisa no Google.
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
   5. CONTROLO DO TERMINAL
   ===================================================== */

const TERMINAL_STORAGE_KEY = 'matrixTerminalPosition';

let isDragging = false;

let dragOffsetX = 0;
let dragOffsetY = 0;

let restorePosition = null;

function getViewportSize() {
    const viewport = window.visualViewport;

    return {
        width: viewport ? viewport.width : window.innerWidth,
        height: viewport ? viewport.height : window.innerHeight
    };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getTerminalBounds() {
    if (!terminal) {
        return {
            width: 0,
            height: 0,
            maxX: 0,
            maxY: 0
        };
    }

    const rect = terminal.getBoundingClientRect();
    const viewport = getViewportSize();

    return {
        width: rect.width,
        height: rect.height,
        maxX: Math.max(0, viewport.width - rect.width),
        maxY: Math.max(0, viewport.height - rect.height)
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
            localStorage.setItem(
                TERMINAL_STORAGE_KEY,
                JSON.stringify({
                    x: finalX,
                    y: finalY
                })
            );
        } catch {}
    }
}

function initializeTerminalPosition() {
    if (!terminal) return;

    try {
        const saved = localStorage.getItem(TERMINAL_STORAGE_KEY);

        const rect = terminal.getBoundingClientRect();
        const viewport = getViewportSize();

        if (saved) {
            const position = JSON.parse(saved);

            if (
                Number.isFinite(position.x) &&
                Number.isFinite(position.y)
            ) {
                setTerminalPosition(
                    position.x,
                    position.y,
                    false
                );

                return;
            }
        }

        setTerminalPosition(
            (viewport.width - rect.width) / 2,
            viewport.height - rect.height - 20,
            false
        );

    } catch {
        setTerminalPosition(20, 20, false);
    }
}

function keepTerminalOnScreen() {
    if (!terminal || terminal.classList.contains('hidden')) return;

    if (terminal.classList.contains('maximized')) return;

    const rect = terminal.getBoundingClientRect();

    setTerminalPosition(rect.left, rect.top);
}

function toggleTerminal() {
    if (!terminal) return;

    const isHidden = terminal.classList.contains('hidden');

    if (isHidden) {
        terminal.classList.remove('hidden');
        terminal.classList.remove('minimized');

        initializeTerminalPosition();

        if (terminalInput) {
            setTimeout(() => terminalInput.focus(), 100);
        }

    } else {
        terminal.classList.add('hidden');
    }
}

if (toggleTerminalButton) {
    toggleTerminalButton.addEventListener('click', toggleTerminal);
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        terminal.classList.add('hidden');
    });
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

            restorePosition = {
                x: rect.left,
                y: rect.top
            };

            terminal.classList.add('maximized');

            terminal.style.left = '';
            terminal.style.top = '';
            terminal.style.transform = '';

        } else {
            terminal.classList.remove('maximized');

            if (restorePosition) {
                setTerminalPosition(
                    restorePosition.x,
                    restorePosition.y
                );
            }
        }
    });
}


/* =====================================================
   6. ARRASTO DO TERMINAL
   ===================================================== */

if (terminalHeader && terminal) {
    terminalHeader.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        if (event.target.closest('.window-controls')) {
            return;
        }

        if (terminal.classList.contains('maximized')) {
            return;
        }

        isDragging = true;

        const rect = terminal.getBoundingClientRect();

        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        terminalHeader.setPointerCapture(event.pointerId);

        event.preventDefault();
    });

    terminalHeader.addEventListener('pointermove', (event) => {
        if (!isDragging) return;

        setTerminalPosition(
            event.clientX - dragOffsetX,
            event.clientY - dragOffsetY
        );
    });

    function stopDragging(event) {
        if (!isDragging) return;

        isDragging = false;

        try {
            terminalHeader.releasePointerCapture(event.pointerId);
        } catch {}
    }

    terminalHeader.addEventListener('pointerup', stopDragging);
    terminalHeader.addEventListener('pointercancel', stopDragging);
}

// Reposiciona o terminal quando a orientação ou a área visível muda.
window.addEventListener('resize', keepTerminalOnScreen);
window.addEventListener('orientationchange', keepTerminalOnScreen);

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', keepTerminalOnScreen);
    window.visualViewport.addEventListener('scroll', keepTerminalOnScreen);
}


/* =====================================================
   7. COMANDOS DO TERMINAL
   ===================================================== */

function processCommand(cmd) {
    if (!terminalOutput) return;

    const commandText = cmd.trim();

    if (!commandText) return;

    // Mostra o comando digitado como texto simples.
    // Isto evita que o conteúdo seja interpretado como HTML.
    const line = document.createElement('p');

    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'user@matrix-tab:~$';

    const command = document.createTextNode(` ${commandText}`);

    line.appendChild(prompt);
    line.appendChild(command);

    terminalOutput.appendChild(line);

    const response = document.createElement('p');
    response.className = 'system-msg';

    const lower = commandText.toLowerCase();

    if (lower === 'help') {
        response.textContent =
            'Comandos: help, clear, date, time, whoami, about';

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
        response.textContent =
            'Matrix OS v1.0.0 - Cyberpunk New Tab';

    } else {
        response.textContent =
            `Comando desconhecido: ${commandText}`;
    }

    terminalOutput.appendChild(response);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            processCommand(terminalInput.value);

            terminalInput.value = '';
        }
    });
}
