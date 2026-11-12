
/* =====================================================
   MATRIX TAB - MAIN SCRIPT
   ===================================================== */

const $ = (selector) => document.querySelector(selector);

const clockElement = $('#clock');
const dateElement = $('#date');
const canvas = $('#matrix-canvas');

const terminal = $('#draggable-terminal');
const terminalHeader = $('#terminal-drag-handle');
const terminalInput = $('#terminal-input');
const terminalOutput = $('#terminal-output');

const toggleTerminalButton = $('#toggle-terminal-btn');
const closeButton = $('#btn-close');
const minimizeButton = $('#btn-minimize');
const expandButton = $('#btn-expand');

const searchForm = $('#search-form');
const searchInput = $('#search-input');
const shortcutsGrid = $('#shortcuts-grid');
const addShortcutBtn = $('#add-shortcut-btn');
const shortcutCount = $('#shortcut-count');
const modeLabel = $('#mode-label');

const MODE_KEY = 'matrixTabMode';
const SHORTCUTS_KEY = 'matrixShortcuts';
const TERMINAL_POSITION_KEY = 'matrixTerminalPosition';

let matrixAnimationFrame = null;
let matrixLastFrame = 0;
let matrixDrops = [];
let matrixColumns = 0;

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let restorePosition = null;

/* =====================================================
   1. MATRIX MODE
   ===================================================== */

function isMatrixEnabled() {
    return document.body.classList.contains('normal-mode') === false;
}

function setMode(enabled) {
    document.body.classList.toggle('normal-mode', !enabled);

    try {
        localStorage.setItem(
            MODE_KEY,
            enabled ? 'matrix' : 'normal'
        );
    } catch {}

    if (modeLabel) {
        modeLabel.textContent = enabled
            ? 'SYSTEM ONLINE'
            : 'NORMAL MODE';
    }

    if (enabled) {
        startMatrix();
    } else {
        stopMatrix();
    }

    if (terminalOutput) {
        addTerminalMessage(
            enabled
                ? 'Matrix mode enabled.'
                : 'Matrix mode disabled.',
            'system-msg'
        );
    }
}

function loadMode() {
    let savedMode = 'matrix';

    try {
        savedMode = localStorage.getItem(MODE_KEY) || 'matrix';
    } catch {}

    setMode(savedMode !== 'normal');
}

/* =====================================================
   2. CLOCK AND DATE
   ===================================================== */

function updateClock() {
    if (!clockElement || !dateElement) return;

    const now = new Date();

    clockElement.textContent = now.toLocaleTimeString(
        'pt-BR',
        {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }
    );

    dateElement.textContent = now.toLocaleDateString(
        'pt-BR',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    );
}

updateClock();
setInterval(updateClock, 1000);

/* =====================================================
   3. MATRIX RAIN
   ===================================================== */

if (canvas) {
    const ctx = canvas.getContext('2d');

    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>\\';

    const fontSize = 17;
    const frameInterval = 45;

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

        matrixColumns = Math.ceil(width / fontSize);

        const previousDrops = matrixDrops;
        matrixDrops = [];

        for (let i = 0; i < matrixColumns; i++) {
            matrixDrops[i] =
                previousDrops[i] !== undefined
                    ? previousDrops[i]
                    : Math.random() * -100;
        }

        ctx.clearRect(0, 0, width, height);
    }

    function drawMatrix(timestamp = 0) {
        if (
            document.hidden ||
            !isMatrixEnabled() ||
            reducedMotion.matches
        ) {
            matrixAnimationFrame = null;
            return;
        }

        if (timestamp - matrixLastFrame < frameInterval) {
            matrixAnimationFrame =
                requestAnimationFrame(drawMatrix);
            return;
        }

        matrixLastFrame = timestamp;

        ctx.fillStyle = 'rgba(8, 13, 9, 0.12)';
        ctx.fillRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        ctx.fillStyle = '#00c853';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < matrixDrops.length; i++) {
            const character = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );

            const x = i * fontSize;
            const y = matrixDrops[i] * fontSize;

            ctx.fillText(character, x, y);

            if (
                y > window.innerHeight &&
                Math.random() > 0.985
            ) {
                matrixDrops[i] = 0;
            }

            matrixDrops[i]++;
        }

        matrixAnimationFrame =
            requestAnimationFrame(drawMatrix);
    }

    function startMatrix() {
        if (
            matrixAnimationFrame !== null ||
            !isMatrixEnabled() ||
            reducedMotion.matches ||
            document.hidden
        ) {
            return;
        }

        matrixLastFrame = 0;
        matrixAnimationFrame =
            requestAnimationFrame(drawMatrix);
    }

    function stopMatrix() {
        if (matrixAnimationFrame !== null) {
            cancelAnimationFrame(matrixAnimationFrame);
            matrixAnimationFrame = null;
        }

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopMatrix();
        } else {
            startMatrix();
        }
    });

    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) {
            stopMatrix();
        } else {
            startMatrix();
        }
    });

    window.matrixControls = {
        start: startMatrix,
        stop: stopMatrix
    };
}

/* =====================================================
   4. SHORTCUTS
   ===================================================== */

const defaultShortcuts = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'StackOverflow', url: 'https://stackoverflow.com' }
];

const shortcutInitials = {
    GitHub: 'GH',
    YouTube: 'YT',
    ChatGPT: 'AI',
    StackOverflow: 'SO'
};

function getStoredShortcuts() {
    try {
        const stored = localStorage.getItem(SHORTCUTS_KEY);

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
            SHORTCUTS_KEY,
            JSON.stringify(shortcuts)
        );
    } catch (error) {
        console.warn('Could not save shortcuts:', error);
    }
}

function renderShortcuts() {
    if (!shortcutsGrid) return;

    shortcutsGrid.innerHTML = '';

    const shortcuts = getStoredShortcuts();

    if (shortcutCount) {
        shortcutCount.textContent =
            `${String(shortcuts.length).padStart(2, '0')} SITES`;
    }

    shortcuts.forEach((item, index) => {
        const link = document.createElement('a');

        link.href = item.url;
        link.className = 'shortcut-card';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = `Open ${item.name}`;

        const icon = document.createElement('span');
        icon.className = 'shortcut-icon';
        icon.textContent =
            shortcutInitials[item.name] ||
            item.name.substring(0, 2).toUpperCase();

        const name = document.createElement('span');
        name.className = 'shortcut-name';
        name.textContent = item.name;

        link.append(icon, name);

        link.addEventListener('contextmenu', event => {
            event.preventDefault();
            removeShortcut(index);
        });

        let pressTimer = null;

        link.addEventListener('pointerdown', () => {
            pressTimer = setTimeout(() => {
                removeShortcut(index);
            }, 750);
        });

        ['pointerup', 'pointerleave', 'pointercancel'].forEach(
            eventName => {
                link.addEventListener(eventName, () => {
                    clearTimeout(pressTimer);
                });
            }
        );

        shortcutsGrid.appendChild(link);
    });
}

function removeShortcut(index) {
    const shortcuts = getStoredShortcuts();
    const item = shortcuts[index];

    if (!item) return;

    if (confirm(`Remove the shortcut "${item.name}"?`)) {
        shortcuts.splice(index, 1);
        saveShortcuts(shortcuts);
        renderShortcuts();
    }
}

if (addShortcutBtn) {
    addShortcutBtn.addEventListener('click', () => {
        const name = prompt('Shortcut name:');

        if (!name || !name.trim()) return;

        let url = prompt('Website address:');

        if (!url || !url.trim()) return;

        url = url.trim();

        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }

        try {
            const parsedUrl = new URL(url);

            if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
                alert('Invalid website address.');
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
            alert('Could not recognize this address.');
        }
    });
}

renderShortcuts();

/* =====================================================
   5. SEARCH
   ===================================================== */

function getSearchDestination(value) {
    const query = value.trim();

    if (!query) return null;

    if (/^https?:\/\//i.test(query)) {
        try {
            const url = new URL(query);
            return url.hostname ? url.href : null;
        } catch {
            return null;
        }
    }

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

    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!isMatrixEnabled()) return;

        const destination =
            getSearchDestination(searchInput.value);

        if (destination) {
            window.location.assign(destination);
        }
    });
}

/* =====================================================
   6. TERMINAL POSITION
   ===================================================== */

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

function setTerminalPosition(x, y, save = true) {
    if (!terminal) return;

    const rect = terminal.getBoundingClientRect();
    const viewport = getViewportSize();

    const maxX = Math.max(0, viewport.width - rect.width);
    const maxY = Math.max(0, viewport.height - rect.height);

    const finalX = clamp(x, 0, maxX);
    const finalY = clamp(y, 0, maxY);

    terminal.style.left = `${finalX}px`;
    terminal.style.top = `${finalY}px`;
    terminal.style.right = 'auto';
    terminal.style.bottom = 'auto';
    terminal.style.transform = 'none';

    if (save) {
        try {
            localStorage.setItem(
                TERMINAL_POSITION_KEY,
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
        const saved =
            localStorage.getItem(TERMINAL_POSITION_KEY);

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
    } catch {}

    const viewport = getViewportSize();
    const rect = terminal.getBoundingClientRect();

    setTerminalPosition(
        (viewport.width - rect.width) / 2,
        viewport.height - rect.height - 20,
        false
    );
}

function keepTerminalOnScreen() {
    if (
        !terminal ||
        terminal.classList.contains('hidden') ||
        terminal.classList.contains('maximized')
    ) {
        return;
    }

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

        setTimeout(() => {
            terminalInput?.focus();
        }, 100);
    } else {
        terminal.classList.add('hidden');
    }
}

toggleTerminalButton?.addEventListener('click', toggleTerminal);

closeButton?.addEventListener('click', () => {
    terminal.classList.add('hidden');
});

minimizeButton?.addEventListener('click', () => {
    terminal.classList.toggle('minimized');
});

expandButton?.addEventListener('click', () => {
    const isMaximized =
        terminal.classList.contains('maximized');

    if (!isMaximized) {
        const rect = terminal.getBoundingClientRect();

        restorePosition = {
            x: rect.left,
            y: rect.top
        };

        terminal.classList.add('maximized');
        terminal.style.left = '';
        terminal.style.top = '';
        terminal.style.bottom = '';
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

/* =====================================================
   7. TERMINAL DRAG
   ===================================================== */

if (terminalHeader && terminal) {
    terminalHeader.addEventListener('pointerdown', event => {
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

    terminalHeader.addEventListener('pointermove', event => {
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

window.addEventListener('resize', keepTerminalOnScreen);
window.addEventListener('orientationchange', keepTerminalOnScreen);

if (window.visualViewport) {
    window.visualViewport.addEventListener(
        'resize',
        keepTerminalOnScreen
    );
}

/* =====================================================
   8. TERMINAL OUTPUT
   ===================================================== */

function addTerminalMessage(message, className = 'system-msg') {
    if (!terminalOutput) return;

    const line = document.createElement('p');
    line.className = className;
    line.textContent = message;

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function addCommandLine(commandText) {
    const line = document.createElement('p');

    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'user@matrix-tab:~$';

    const command = document.createTextNode(` ${commandText}`);

    line.append(prompt, command);
    terminalOutput.appendChild(line);
}

function showHelp() {
    if (isMatrixEnabled()) {
        addTerminalMessage('Available commands:');
        addTerminalMessage('help              - Show available commands');
        addTerminalMessage('clear             - Clear terminal history');
        addTerminalMessage('date              - Show current date');
        addTerminalMessage('time              - Show current time');
        addTerminalMessage('about             - Show project information');
        addTerminalMessage('disable-matrix    - Switch to Normal Mode (alias: dm)');
        addTerminalMessage('enable-matrix     - Switch to Matrix Mode (alias: em)');
    } else {
        addTerminalMessage('Normal Mode is active.');
        addTerminalMessage('enable-matrix (em) - Return to Matrix Mode');
    }
}

/* =====================================================
   9. TERMINAL COMMANDS
   ===================================================== */

function processCommand(input) {
    if (!terminalOutput) return;

    const commandText = input.trim();

    if (!commandText) return;

    addCommandLine(commandText);

    const parts = commandText.toLowerCase().split(/\s+/);
    const command = parts[0];

    const matrixEnabled = isMatrixEnabled();

    if (command === 'help') {
        showHelp();
        return;
    }

    if (command === 'enable-matrix' || command === 'em') {
        if (matrixEnabled) {
            addTerminalMessage('Matrix mode is already enabled.');
        } else {
            setMode(true);
        }
        return;
    }

    if (!matrixEnabled) {
        addTerminalMessage(
            'Only enable-matrix (em) is available in Normal Mode.'
        );
        return;
    }

    if (command === 'disable-matrix' || command === 'dm') {
        setMode(false);
        return;
    }

    if (command === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }

    if (command === 'date') {
        addTerminalMessage(
            new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        );
        return;
    }

    if (command === 'time') {
        addTerminalMessage(
            new Date().toLocaleTimeString('en-US')
        );
        return;
    }

    if (command === 'about') {
        addTerminalMessage(
            'Matrix Tab v1.0.0 - Matrix-inspired New Tab.'
        );
        return;
    }

    addTerminalMessage(`Unknown command: ${commandText}`);
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', event => {
        if (event.key !== 'Enter') return;

        event.preventDefault();

        processCommand(terminalInput.value);
        terminalInput.value = '';
    });
}

/* =====================================================
   10. INITIALIZATION
   ===================================================== */

loadMode();
