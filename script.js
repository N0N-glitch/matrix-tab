
/* =========================================================
   MATRIX TAB 2.0
   Main application script
========================================================= */

const $ = (selector) => document.querySelector(selector);

const canvas = $('#matrix-canvas');

const clockElement = $('#clock');
const dateElement = $('#date');

const searchForm = $('#search-form');
const searchInput = $('#search-input');
const voiceSearchButton = $('#voice-search-btn');

const shortcutsGrid = $('#shortcuts-grid');
const shortcutCount = $('#shortcut-count');
const addShortcutButton = $('#add-shortcut-btn');

const previousPageButton = $('#prev-page-btn');
const nextPageButton = $('#next-page-btn');
const pageDots = $('#page-dots');

const modeLabel = $('#mode-label');

const terminal = $('#draggable-terminal');
const terminalHeader = $('#terminal-drag-handle');
const terminalInput = $('#terminal-input');
const terminalOutput = $('#terminal-output');

const toggleTerminalButton = $('#toggle-terminal-btn');
const closeButton = $('#btn-close');
const minimizeButton = $('#btn-minimize');
const expandButton = $('#btn-expand');

const MODE_KEY = 'matrixTabMode';
const SHORTCUTS_KEY = 'matrixShortcuts';
const TERMINAL_POSITION_KEY = 'matrixTerminalPosition';

const SHORTCUTS_PER_PAGE = 4;

/* =========================================================
   1. GENERAL STATE
========================================================= */

let currentPage = 0;
let currentShortcuts = [];

let matrixAnimationFrame = null;
let matrixLastFrame = 0;
let matrixDrops = [];
let matrixColumns = 0;

let matrixContext = null;
let matrixReducedMotion = null;

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let restorePosition = null;

let startMatrix = () => {};
let stopMatrix = () => {};

const defaultShortcuts = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' }
];

/* =========================================================
   2. ICONS
========================================================= */

const shortcutIcons = {
    'github': `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.04c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z"
            />
        </svg>
    `,

    'youtube': `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
            />
        </svg>
    `,

    'chatgpt': `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3.1a4.2 4.2 0 0 0-7.2 3 4.2 4.2 0 0 0-1.1 7.3 4.2 4.2 0 0 0 4.1 6.1 4.2 4.2 0 0 0 7.2 0 4.2 4.2 0 0 0 4.1-6.1 4.2 4.2 0 0 0-1.1-7.3 4.2 4.2 0 0 0-6-3Z"
            />
            <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m7.8 7.1 8.4 4.8m-8.4 0 8.4-4.8M12 3.1v17.8"
            />
        </svg>
    `,

    'stack overflow': `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M17.2 20.2v-5h2v7H3v-7h2v5h12.2ZM7 17.2h9v1.7H7v-1.7Zm.2-3.5 8.8 1.8-.35 1.65-8.8-1.8.35-1.65Zm1.1-3.4 8.1 3.7-.7 1.5-8.1-3.7.7-1.5Zm2-3.1 6.9 5.4-1.05 1.35-6.9-5.4 1.05-1.35Zm2.8-2.7 5.1 7.2-1.4 1-5.1-7.2 1.4-1Z"
            />
        </svg>
    `,

    'default': `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
            />
            <path
                d="M4 12h16M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
            />
        </svg>
    `
};

function getShortcutIcon(name) {
    const key = name.toLowerCase();

    if (shortcutIcons[key]) {
        return shortcutIcons[key];
    }

    if (key.includes('stack')) {
        return shortcutIcons['stack overflow'];
    }

    return shortcutIcons.default;
}

/* =========================================================
   3. MODE MANAGEMENT
========================================================= */

function isMatrixEnabled() {
    return !document.body.classList.contains('normal-mode');
}

function setMode(enabled, announce = true) {
    document.body.classList.toggle('normal-mode', !enabled);

    try {
        localStorage.setItem(
            MODE_KEY,
            enabled ? 'matrix' : 'normal'
        );
    } catch (error) {
        console.warn('Could not save display mode:', error);
    }

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

    if (announce && terminalOutput) {
        addTerminalMessage(
            enabled
                ? 'Matrix Mode enabled.'
                : 'Normal Mode enabled.',
            'system-msg'
        );
    }
}

function loadMode() {
    let savedMode = 'matrix';

    try {
        savedMode = localStorage.getItem(MODE_KEY) || 'matrix';
    } catch (error) {
        console.warn('Could not load display mode:', error);
    }

    setMode(savedMode !== 'normal', false);
}

/* =========================================================
   4. CLOCK AND DATE
========================================================= */

function updateClock() {
    if (!clockElement || !dateElement) {
        return;
    }

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

/* =========================================================
   5. MATRIX RAIN
========================================================= */

function initializeMatrix() {
    if (!canvas) {
        return;
    }

    matrixContext = canvas.getContext('2d');

    if (!matrixContext) {
        return;
    }

    matrixReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>\\';

    const fontSize = 17;
    const frameInterval = 48;

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

        matrixContext.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        matrixColumns = Math.ceil(width / fontSize);

        const previousDrops = matrixDrops;
        matrixDrops = [];

        for (let i = 0; i < matrixColumns; i++) {
            matrixDrops[i] =
                previousDrops[i] !== undefined
                    ? previousDrops[i]
                    : Math.random() * -100;
        }

        matrixContext.clearRect(0, 0, width, height);
    }

    function drawMatrix(timestamp = 0) {
        if (
            document.hidden ||
            !isMatrixEnabled() ||
            matrixReducedMotion.matches
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

        matrixContext.fillStyle = 'rgba(7, 12, 8, 0.13)';
        matrixContext.fillRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        matrixContext.font = `${fontSize}px monospace`;

        for (let i = 0; i < matrixDrops.length; i++) {
            const character = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );

            const x = i * fontSize;
            const y = matrixDrops[i] * fontSize;

            matrixContext.fillStyle =
                Math.random() > 0.985
                    ? '#d5ffe2'
                    : '#00c853';

            matrixContext.fillText(character, x, y);

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

    resizeCanvas();

    startMatrix = function () {
        if (
            matrixAnimationFrame !== null ||
            !isMatrixEnabled() ||
            matrixReducedMotion.matches ||
            document.hidden ||
            !matrixContext
        ) {
            return;
        }

        matrixLastFrame = 0;

        matrixAnimationFrame =
            requestAnimationFrame(drawMatrix);
    };

    stopMatrix = function () {
        if (matrixAnimationFrame !== null) {
            cancelAnimationFrame(matrixAnimationFrame);
            matrixAnimationFrame = null;
        }

        if (matrixContext) {
            matrixContext.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );
        }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopMatrix();
        } else {
            startMatrix();
        }
    });

    matrixReducedMotion.addEventListener('change', () => {
        if (matrixReducedMotion.matches) {
            stopMatrix();
        } else {
            startMatrix();
        }
    });
}

/* =========================================================
   6. SHORTCUT STORAGE
========================================================= */

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

        return parsed.filter(item => {
            if (
                !item ||
                typeof item.name !== 'string' ||
                typeof item.url !== 'string'
            ) {
                return false;
            }

            try {
                const url = new URL(item.url);

                return (
                    ['http:', 'https:'].includes(url.protocol) &&
                    item.name.trim().length > 0
                );
            } catch {
                return false;
            }
        });
    } catch (error) {
        console.warn('Could not load shortcuts:', error);
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
        alert('Could not save the shortcut in this browser.');
    }
}

/* =========================================================
   7. SHORTCUT PAGINATION
========================================================= */

function getPageCount() {
    return Math.max(
        1,
        Math.ceil(currentShortcuts.length / SHORTCUTS_PER_PAGE)
    );
}

function renderShortcuts() {
    if (!shortcutsGrid) {
        return;
    }

    currentShortcuts = getStoredShortcuts();

    const pageCount = getPageCount();

    currentPage = Math.min(
        Math.max(currentPage, 0),
        pageCount - 1
    );

    const startIndex = currentPage * SHORTCUTS_PER_PAGE;

    const pageShortcuts = currentShortcuts.slice(
        startIndex,
        startIndex + SHORTCUTS_PER_PAGE
    );

    shortcutsGrid.innerHTML = '';

    pageShortcuts.forEach((item, pageIndex) => {
        const realIndex = startIndex + pageIndex;

        const link = document.createElement('a');
        link.className = 'shortcut-card';
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = `Open ${item.name}`;
        link.setAttribute('aria-label', `Open ${item.name}`);

        const icon = document.createElement('span');
        icon.className = 'shortcut-icon';
        icon.innerHTML = getShortcutIcon(item.name);

        const name = document.createElement('span');
        name.className = 'shortcut-name';
        name.textContent = item.name;

        link.append(icon, name);

        link.addEventListener('contextmenu', event => {
            event.preventDefault();
            removeShortcut(realIndex);
        });

        shortcutsGrid.appendChild(link);
    });

    if (shortcutCount) {
        shortcutCount.textContent =
            `${String(currentShortcuts.length).padStart(2, '0')} SITES`;
    }

    renderPagination();
}

function renderPagination() {
    if (!pageDots) {
        return;
    }

    const pageCount = getPageCount();

    pageDots.innerHTML = '';

    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className = 'page-dot';

        if (i === currentPage) {
            dot.classList.add('active');
        }

        dot.setAttribute('aria-label', `Go to page ${i + 1}`);
        dot.setAttribute(
            'aria-current',
            i === currentPage ? 'page' : 'false'
        );

        dot.addEventListener('click', () => {
            changePage(i);
        });

        pageDots.appendChild(dot);
    }

    if (previousPageButton) {
        previousPageButton.disabled = currentPage <= 0;
    }

    if (nextPageButton) {
        nextPageButton.disabled = currentPage >= pageCount - 1;
    }
}

function changePage(page) {
    const pageCount = getPageCount();

    if (page < 0 || page >= pageCount || page === currentPage) {
        return;
    }

    currentPage = page;

    shortcutsGrid.classList.remove('page-changing');

    void shortcutsGrid.offsetWidth;

    shortcutsGrid.classList.add('page-changing');

    renderShortcuts();

    setTimeout(() => {
        shortcutsGrid.classList.remove('page-changing');
    }, 220);
}

previousPageButton?.addEventListener('click', () => {
    changePage(currentPage - 1);
});

nextPageButton?.addEventListener('click', () => {
    changePage(currentPage + 1);
});

/* =========================================================
   8. ADD AND REMOVE SHORTCUTS
========================================================= */

function normalizeWebsiteAddress(value) {
    let address = value.trim();

    if (!address) {
        return null;
    }

    if (!/^https?:\/\//i.test(address)) {
        address = `https://${address}`;
    }

    try {
        const url = new URL(address);

        if (!['http:', 'https:'].includes(url.protocol)) {
            return null;
        }

        return url.href;
    } catch {
        return null;
    }
}

function addShortcut() {
    const name = prompt('Shortcut name:');

    if (!name || !name.trim()) {
        return;
    }

    const address = prompt('Website address:');

    if (!address || !address.trim()) {
        return;
    }

    const url = normalizeWebsiteAddress(address);

    if (!url) {
        alert('Please enter a valid website address.');
        return;
    }

    const shortcuts = getStoredShortcuts();

    shortcuts.push({
        name: name.trim(),
        url
    });

    saveShortcuts(shortcuts);

    currentPage = Math.floor(
        (shortcuts.length - 1) / SHORTCUTS_PER_PAGE
    );

    renderShortcuts();
}

function removeShortcut(index) {
    const shortcuts = getStoredShortcuts();
    const item = shortcuts[index];

    if (!item) {
        return;
    }

    const confirmed = confirm(
        `Remove the shortcut "${item.name}"?`
    );

    if (!confirmed) {
        return;
    }

    shortcuts.splice(index, 1);

    saveShortcuts(shortcuts);

    currentPage = Math.min(
        currentPage,
        Math.max(
            0,
            Math.ceil(shortcuts.length / SHORTCUTS_PER_PAGE) - 1
        )
    );

    renderShortcuts();
}

addShortcutButton?.addEventListener('click', addShortcut);

/* =========================================================
   9. SEARCH
========================================================= */

function getSearchDestination(value) {
    const query = value.trim();

    if (!query) {
        return null;
    }

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
        (
            query.includes('.') ||
            query.startsWith('localhost')
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

searchForm?.addEventListener('submit', event => {
    event.preventDefault();

    const destination = getSearchDestination(searchInput.value);

    if (destination) {
        window.location.assign(destination);
    }
});

/* =========================================================
   10. VOICE SEARCH
========================================================= */

function initializeVoiceSearch() {
    if (!voiceSearchButton) {
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        voiceSearchButton.disabled = true;
        voiceSearchButton.title =
            'Voice search is not supported by this browser.';
        voiceSearchButton.setAttribute(
            'aria-label',
            'Voice search is not supported'
        );
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('start', () => {
        voiceSearchButton.classList.add('listening');
        voiceSearchButton.title = 'Listening...';
    });

    recognition.addEventListener('result', event => {
        const transcript =
            event.results[0][0].transcript;

        searchInput.value = transcript;
        searchInput.focus();
    });

    recognition.addEventListener('end', () => {
        voiceSearchButton.classList.remove('listening');
        voiceSearchButton.title = 'Voice search';
    });

    recognition.addEventListener('error', event => {
        console.warn('Voice search error:', event.error);
        voiceSearchButton.classList.remove('listening');
    });

    voiceSearchButton.addEventListener('click', () => {
        try {
            recognition.start();
        } catch (error) {
            console.warn('Could not start voice search:', error);
        }
    });
}

/* =========================================================
   11. TERMINAL POSITION
========================================================= */

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
    if (!terminal) {
        return;
    }

    const rect = terminal.getBoundingClientRect();
    const viewport = getViewportSize();

    const finalX = clamp(
        x,
        8,
        Math.max(8, viewport.width - rect.width - 8)
    );

    const finalY = clamp(
        y,
        8,
        Math.max(8, viewport.height - rect.height - 8)
    );

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
        } catch (error) {
            console.warn('Could not save terminal position:', error);
        }
    }
}

function initializeTerminalPosition() {
    if (!terminal) {
        return;
    }

    try {
        const saved = localStorage.getItem(
            TERMINAL_POSITION_KEY
        );

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
    } catch (error) {
        console.warn('Could not restore terminal position:', error);
    }

    const viewport = getViewportSize();
    const rect = terminal.getBoundingClientRect();

    setTerminalPosition(
        (viewport.width - rect.width) / 2,
        Math.max(8, viewport.height - rect.height - 20),
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

/* =========================================================
   12. TERMINAL CONTROLS
========================================================= */

function toggleTerminal() {
    if (!terminal) {
        return;
    }

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
    terminal?.classList.add('hidden');
});

minimizeButton?.addEventListener('click', () => {
    terminal?.classList.toggle('minimized');
});

expandButton?.addEventListener('click', () => {
    if (!terminal) {
        return;
    }

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
        terminal.style.right = '';
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

/* =========================================================
   13. TERMINAL DRAG
========================================================= */

if (terminalHeader && terminal) {
    terminalHeader.addEventListener('pointerdown', event => {
        if (
            event.pointerType === 'mouse' &&
            event.button !== 0
        ) {
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
        if (!isDragging) {
            return;
        }

        setTerminalPosition(
            event.clientX - dragOffsetX,
            event.clientY - dragOffsetY
        );
    });

    function stopDragging(event) {
        if (!isDragging) {
            return;
        }

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

/* =========================================================
   14. TERMINAL OUTPUT
========================================================= */

function addTerminalMessage(
    message,
    className = 'system-msg'
) {
    if (!terminalOutput) {
        return;
    }

    const line = document.createElement('p');

    line.className = className;
    line.textContent = message;

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function addCommandLine(commandText) {
    if (!terminalOutput) {
        return;
    }

    const line = document.createElement('p');

    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'user@matrix-tab:~$';

    const command = document.createTextNode(
        ` ${commandText}`
    );

    line.append(prompt, command);
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearTerminal() {
    terminalOutput.innerHTML = '';
}

function showHelp() {
    addTerminalMessage('Available commands:');

    addTerminalMessage('help              - Show available commands');
    addTerminalMessage('clear             - Clear terminal history');
    addTerminalMessage('date              - Show current date');
    addTerminalMessage('time              - Show current time');
    addTerminalMessage('about             - Show project information');
    addTerminalMessage('echo [text]       - Print a message');
    addTerminalMessage('open [site]       - Open a website');
    addTerminalMessage('disable-matrix    - Switch to Normal Mode (dm)');
    addTerminalMessage('enable-matrix     - Switch to Matrix Mode (em)');
}

/* =========================================================
   15. TERMINAL COMMANDS
========================================================= */

function getWebsiteFromCommand(value) {
    const websites = {
        github: 'https://github.com',
        youtube: 'https://youtube.com',
        google: 'https://google.com',
        chatgpt: 'https://chatgpt.com',
        stackoverflow: 'https://stackoverflow.com'
    };

    const key = value.trim().toLowerCase();

    if (websites[key]) {
        return websites[key];
    }

    return normalizeWebsiteAddress(value);
}

function processCommand(input) {
    if (!terminalOutput) {
        return;
    }

    const commandText = input.trim();

    if (!commandText) {
        return;
    }

    addCommandLine(commandText);

    const parts = commandText.split(/\s+/);
    const command = parts[0].toLowerCase();
    const argument = commandText.slice(parts[0].length).trim();

    const matrixEnabled = isMatrixEnabled();

    if (command === 'help') {
        showHelp();
        return;
    }

    if (
        command === 'enable-matrix' ||
        command === 'em'
    ) {
        if (matrixEnabled) {
            addTerminalMessage('Matrix Mode is already enabled.');
        } else {
            setMode(true);
        }

        return;
    }

    if (!matrixEnabled) {
        addTerminalMessage(
            'Normal Mode is active. Use enable-matrix or em to return.'
        );
        return;
    }

    if (
        command === 'disable-matrix' ||
        command === 'dm'
    ) {
        setMode(false);
        return;
    }

    if (command === 'clear') {
        clearTerminal();
        return;
    }

    if (command === 'date') {
        addTerminalMessage(
            new Date().toLocaleDateString('pt-BR', {
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
            new Date().toLocaleTimeString('pt-BR')
        );

        return;
    }

    if (command === 'about') {
        addTerminalMessage(
            'Matrix Tab v2.0.0 - Matrix-inspired New Tab experience.'
        );
        addTerminalMessage(
            'Built with HTML, CSS and vanilla JavaScript.'
        );
        return;
    }

    if (command === 'echo') {
        addTerminalMessage(argument || ' ');
        return;
    }

    if (command === 'open') {
        if (!argument) {
            addTerminalMessage(
                'Usage: open [site or website address]'
            );
            return;
        }

        const destination = getWebsiteFromCommand(argument);

        if (!destination) {
            addTerminalMessage('Invalid website address.');
            return;
        }

        window.open(
            destination,
            '_blank',
            'noopener,noreferrer'
        );

        addTerminalMessage(`Opening ${destination}`);
        return;
    }

    addTerminalMessage(`Unknown command: ${commandText}`);
}

terminalInput?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();

    processCommand(terminalInput.value);

    terminalInput.value = '';
});

/* =========================================================
   16. INITIALIZATION
========================================================= */

function initializeApp() {
    initializeMatrix();
    loadMode();

    currentShortcuts = getStoredShortcuts();
    renderShortcuts();

    initializeVoiceSearch();
}

initializeApp();
