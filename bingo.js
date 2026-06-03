(function () {
    const STORAGE_KEY = 'sao_rafael_bingo_state_v1';
    const MIN_NUMBER = 1;
    const MAX_NUMBER = 75;
    const LETTER_ROWS = [
        { letter: 'B', start: 1, end: 15 },
        { letter: 'I', start: 16, end: 30 },
        { letter: 'N', start: 31, end: 45 },
        { letter: 'G', start: 46, end: 60 },
        { letter: 'O', start: 61, end: 75 }
    ];

    const elements = {
        callForm: document.getElementById('bingoCallForm'),
        numberInput: document.getElementById('bingoNumberInput'),
        currentLetter: document.getElementById('bingoCurrentLetter'),
        currentNumber: document.getElementById('bingoCurrentNumber'),
        status: document.getElementById('bingoStatus'),
        history: document.getElementById('bingoHistory'),
        boardGrid: document.getElementById('bingoBoardGrid'),
        btnUndo: document.getElementById('btnUndoNumber'),
        btnReset: document.getElementById('btnResetRound'),
        btnFullscreen: document.getElementById('btnFullscreen')
    };

    if (!elements.callForm || !elements.numberInput || !elements.boardGrid) {
        return;
    }

    const state = {
        markedNumbers: [],
        history: [],
        currentNumber: null,
        undoStack: []
    };

    function getLetterFromNumber(number) {
        if (number >= 1 && number <= 15) return 'B';
        if (number >= 16 && number <= 30) return 'I';
        if (number >= 31 && number <= 45) return 'N';
        if (number >= 46 && number <= 60) return 'G';
        return 'O';
    }

    function getDisplayNumber(number) {
        return String(number).padStart(2, '0');
    }

    function setStatus(message, isError) {
        if (!elements.status) {
            return;
        }

        elements.status.textContent = message;
        elements.status.classList.toggle('error', Boolean(isError));
    }

    function saveState() {
        const payload = {
            markedNumbers: state.markedNumbers,
            history: state.history,
            currentNumber: state.currentNumber
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (_) {
            // Ignore storage errors to keep the page functional in restricted environments.
        }
    }

    function sanitizeNumberList(list) {
        if (!Array.isArray(list)) {
            return [];
        }

        return Array.from(
            new Set(
                list
                    .map((value) => Number(value))
                    .filter((value) => Number.isInteger(value) && value >= MIN_NUMBER && value <= MAX_NUMBER)
            )
        );
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return false;
            }

            const parsed = JSON.parse(raw);
            state.markedNumbers = sanitizeNumberList(parsed.markedNumbers);
            state.history = sanitizeNumberList(parsed.history);
            state.currentNumber = Number.isInteger(parsed.currentNumber) ? parsed.currentNumber : null;
            state.undoStack = [];
            return true;
        } catch (_) {
            return false;
        }
    }

    function renderCurrentBall() {
        if (!elements.currentLetter || !elements.currentNumber) {
            return;
        }

        if (!Number.isInteger(state.currentNumber)) {
            elements.currentLetter.textContent = '-';
            elements.currentNumber.textContent = '--';
            return;
        }

        elements.currentLetter.textContent = getLetterFromNumber(state.currentNumber);
        elements.currentNumber.textContent = getDisplayNumber(state.currentNumber);
    }

    function renderHistory() {
        if (!elements.history) {
            return;
        }

        elements.history.innerHTML = '';

        if (state.history.length === 0) {
            const empty = document.createElement('span');
            empty.className = 'bingo-history-empty';
            empty.textContent = 'Nenhuma pedra chamada ainda.';
            elements.history.appendChild(empty);
            return;
        }

        state.history.slice().reverse().forEach((number) => {
            const item = document.createElement('span');
            item.className = 'bingo-history-item';
            item.textContent = `${getLetterFromNumber(number)}-${getDisplayNumber(number)}`;
            elements.history.appendChild(item);
        });
    }

    function buildBoardCell(number) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bingo-number';
        button.dataset.number = String(number);
        button.textContent = getDisplayNumber(number);
        button.setAttribute('aria-label', `Número ${number} chamado ${getLetterFromNumber(number)}`);
        button.disabled = true;

        const isMarked = state.markedNumbers.includes(number);
        button.classList.toggle('is-marked', isMarked);
        button.setAttribute('aria-pressed', String(isMarked));
        return button;
    }

    function renderBoard() {
        if (!elements.boardGrid) {
            return;
        }

        elements.boardGrid.innerHTML = '';

        LETTER_ROWS.forEach((row) => {
            const line = document.createElement('div');
            line.className = 'bingo-board-row';
            line.setAttribute('role', 'row');

            const letterTag = document.createElement('div');
            letterTag.className = 'bingo-row-letter';
            letterTag.textContent = row.letter;
            letterTag.setAttribute('aria-hidden', 'true');

            const numbersLine = document.createElement('div');
            numbersLine.className = 'bingo-row-numbers';

            for (let number = row.start; number <= row.end; number += 1) {
                numbersLine.appendChild(buildBoardCell(number));
            }

            line.appendChild(letterTag);
            line.appendChild(numbersLine);
            elements.boardGrid.appendChild(line);
        });
    }

    function refreshUi() {
        renderCurrentBall();
        renderHistory();
        renderBoard();
        saveState();
    }

    function callNumber(rawValue) {
        const parsed = Number(rawValue);

        if (!Number.isInteger(parsed) || parsed < MIN_NUMBER || parsed > MAX_NUMBER) {
            setStatus('Digite um número válido entre 1 e 75.', true);
            return;
        }

        if (state.history.includes(parsed)) {
            setStatus(`A pedra ${parsed} já foi chamada.`, true);
            return;
        }

        state.undoStack.push({
            history: state.history.slice(),
            currentNumber: state.currentNumber,
            markedNumbers: state.markedNumbers.slice()
        });

        state.history.push(parsed);
        state.currentNumber = parsed;

        if (!state.markedNumbers.includes(parsed)) {
            state.markedNumbers.push(parsed);
        }

        setStatus(`Pedra chamada: ${getLetterFromNumber(parsed)}-${getDisplayNumber(parsed)}.`, false);
        elements.numberInput.value = '';
        elements.numberInput.focus();
        refreshUi();
    }

    function undoLastCall() {
        const previous = state.undoStack.pop();
        if (!previous) {
            setStatus('Não há chamada anterior para desfazer.', true);
            return;
        }

        state.history = previous.history;
        state.currentNumber = previous.currentNumber;
        state.markedNumbers = previous.markedNumbers;
        setStatus('Última chamada desfeita.', false);
        refreshUi();
    }

    function resetRound() {
        state.history = [];
        state.currentNumber = null;
        state.markedNumbers = [];
        state.undoStack = [];
        setStatus('Rodada reiniciada. O painel foi limpo.', false);
        refreshUi();
    }

    function updateFullscreenButton() {
        if (!elements.btnFullscreen) {
            return;
        }

        elements.btnFullscreen.textContent = document.fullscreenElement ? 'Sair da tela cheia' : 'Tela cheia';
    }

    async function toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (_) {
            setStatus('Não foi possível alternar para tela cheia neste navegador.', true);
        }

        updateFullscreenButton();
    }

    function bindEvents() {
        elements.callForm.addEventListener('submit', (event) => {
            event.preventDefault();
            callNumber(elements.numberInput.value.trim());
        });

        elements.btnUndo.addEventListener('click', undoLastCall);
        elements.btnReset.addEventListener('click', resetRound);
        elements.btnFullscreen.addEventListener('click', toggleFullscreen);
        document.addEventListener('fullscreenchange', updateFullscreenButton);
    }

    function bootstrap() {
        loadState();

        bindEvents();
        refreshUi();
        updateFullscreenButton();
    }

    bootstrap();
})();
