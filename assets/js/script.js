const gridData = {
    "A1": { name: "Avião", url: "https://placehold.co/100x100/ADD8E6/000000?text=Avião" },
    "B1": { name: "Maçã", url: "https://placehold.co/100x100/FFDDC1/000000?text=Maçã" },
    "C1": { name: "Formiga", url: "https://placehold.co/100x100/D3D3D3/000000?text=Formiga" },
    "A2": { name: "Bola", url: "https://placehold.co/100x100/FFECB3/000000?text=Bola" },
    "B2": { name: "Abelha", url: "https://placehold.co/100x100/FFFACD/000000?text=Abelha" },
    "C2": { name: "Gato", url: "https://placehold.co/100x100/E0BBE4/000000?text=Gato" },
    "A3": { name: "Xícara", url: "https://placehold.co/100x100/B2EBF2/000000?text=Xícara" },
    "B3": { name: "Bolo", url: "https://placehold.co/100x100/FFDAB9/000000?text=Bolo" },
    "C3": { name: "Donut", url: "https://placehold.co/100x100/FFC0CB/000000?text=Donut" },
    "A4": { name: "Peixe", url: "https://placehold.co/100x100/87CEEB/000000?text=Peixe" },
    "B4": { name: "Flor", url: "https://placehold.co/100x100/FFB6C1/000000?text=Flor" },
    "C4": { name: "Bola Futebol Americano", url: "https://placehold.co/100x100/D2B48C/000000?text=Futebol" }
};

const challenges = [
    { id: "c1", description: "A2 BOLA - FLOR", correctCells: ["A2", "B4"], color: "#FF6347", completed: false },
    { id: "c2", description: "A3 BOLA - XÍCARA", correctCells: ["A2", "A3"], color: "#4682B4", completed: false },
    { id: "c3", description: "A4 BOLO - PEIXE", correctCells: ["A4", "B3"], color: "#32CD32", completed: false },
    { id: "c4", description: "B1 BOLA - MAÇÃ", correctCells: ["B1", "A2"], color: "#FFD700", completed: false },
    { id: "c5", description: "B2 XÍCARA - ABELHA", correctCells: ["B2", "A3"], color: "#BA55D3", completed: false },
    { id: "c6", description: "B3 BOLO - GATO", correctCells: ["B3", "C2"], color: "#00CED1", completed: false },
    { id: "c7", description: "B4 FLOR - BOLO", correctCells: ["B4", "B3"], color: "#FF4500", completed: false },
    { id: "c8", description: "C1 GATO - FORMIGA", correctCells: ["C1", "C2"], color: "#6A5ACD", completed: false }
];

let selectedChallengeId = null;
let selectedImageCells = [];
let correctCount = 0;
const totalChallenges = challenges.length;

const gameGrid = document.getElementById('gameGrid');
const challengesList = document.getElementById('challengesList');
const feedbackMessage = document.getElementById('feedbackMessage');
const resetButton = document.getElementById('resetButton');

function renderGrid() {
    gameGrid.innerHTML = '';

    const emptyCell = document.createElement('div');
    gameGrid.appendChild(emptyCell);

    ['A', 'B', 'C'].forEach(col => {
        const header = document.createElement('div');
        header.className = 'grid-header';
        header.textContent = col;
        gameGrid.appendChild(header);
    });

    for (let row = 1; row <= 4; row++) {
        const rowLabel = document.createElement('div');
        rowLabel.className = 'grid-row-label';
        rowLabel.textContent = row;
        gameGrid.appendChild(rowLabel);

        ['A', 'B', 'C'].forEach(col => {
            const cellId = col + row;
            const cellData = gridData[cellId];

            const cellDiv = document.createElement('div');
            cellDiv.id = cellId;
            cellDiv.className = 'grid-cell';
            cellDiv.setAttribute('data-name', cellData.name);

            const img = document.createElement('img');
            img.src = cellData.url;
            img.alt = cellData.name;
            cellDiv.appendChild(img);

            cellDiv.addEventListener('click', () => handleImageClick(cellId));
            gameGrid.appendChild(cellDiv);
        });
    }
}

function renderChallenges() {
    challengesList.innerHTML = '';
    challenges.forEach(challenge => {
        const challengeDiv = document.createElement('div');
        challengeDiv.id = `challenge-${challenge.id}`;
        challengeDiv.className = `challenge-item ${challenge.completed ? 'completed-challenge' : ''}`;
        challengeDiv.setAttribute('data-challenge-id', challenge.id);

        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'color-indicator';
        colorIndicator.style.backgroundColor = challenge.color;
        challengeDiv.appendChild(colorIndicator);

        const descriptionSpan = document.createElement('span');
        descriptionSpan.textContent = challenge.description;
        challengeDiv.appendChild(descriptionSpan);

        challengeDiv.addEventListener('click', () => handleChallengeClick(challenge.id));
        challengesList.appendChild(challengeDiv);
    });
}

function handleChallengeClick(challengeId) {
    if (challenges.find(c => c.id === challengeId).completed) {
        return;
    }

    if (selectedChallengeId) {
        document.getElementById(`challenge-${selectedChallengeId}`).classList.remove('selected-challenge');
    }

    selectedImageCells.forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.classList.remove('selected', 'incorrect-match', 'correct-match');
    });
    selectedImageCells = [];
    showFeedback('Agora clique nas duas imagens correspondentes!', false);

    selectedChallengeId = challengeId;
    document.getElementById(`challenge-${selectedChallengeId}`).classList.add('selected-challenge');
}

function handleImageClick(cellId) {
    if (!selectedChallengeId) {
        showFeedback('Por favor, selecione um desafio primeiro!', false);
        return;
    }

    const cell = document.getElementById(cellId);

    if (selectedImageCells.includes(cellId)) {
        selectedImageCells = selectedImageCells.filter(id => id !== cellId);
        cell.classList.remove('selected');
        showFeedback('Clique nas duas imagens correspondentes!', false);
        return;
    }

    selectedImageCells.push(cellId);
    cell.classList.add('selected');

    if (selectedImageCells.length === 2) {
        const currentChallenge = challenges.find(c => c.id === selectedChallengeId);
        const [correctCell1, correctCell2] = currentChallenge.correctCells;

        const isMatch = (selectedImageCells.includes(correctCell1) && selectedImageCells.includes(correctCell2));

        if (isMatch) {
            showFeedback('Correto! Muito bem!', true);
            currentChallenge.completed = true;
            correctCount++;

            document.getElementById(correctCell1).classList.add('correct-match');
            document.getElementById(correctCell2).classList.add('correct-match');
            document.getElementById(correctCell1).classList.remove('selected');
            document.getElementById(correctCell2).classList.remove('selected');

            document.getElementById(`challenge-${selectedChallengeId}`).classList.add('completed-challenge');
            document.getElementById(`challenge-${selectedChallengeId}`).classList.remove('selected-challenge');

            selectedChallengeId = null;
            selectedImageCells = [];

            if (correctCount === totalChallenges) {
                showFeedback('Parabéns! Você completou todos os desafios!', true);
            }
        } else {
            showFeedback('Incorreto. Tente novamente!', false);
            selectedImageCells.forEach(id => {
                document.getElementById(id).classList.add('incorrect-match');
            });

            setTimeout(() => {
                selectedImageCells.forEach(id => {
                    document.getElementById(id).classList.remove('selected', 'incorrect-match');
                });
                selectedImageCells = [];
                showFeedback('Selecione um desafio e clique nas imagens.', false);
            }, 1000);
        }
    }
}

function showFeedback(message, isCorrect) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = 'feedback-message';
    if (isCorrect) {
        feedbackMessage.classList.add('correct');
    } else {
        feedbackMessage.classList.add('incorrect');
    }
}

function resetGame() {
    selectedChallengeId = null;
    selectedImageCells = [];
    correctCount = 0;

    challenges.forEach(challenge => {
        challenge.completed = false;
    });

    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('selected', 'correct-match', 'incorrect-match');
    });

    document.querySelectorAll('.challenge-item').forEach(item => {
        item.classList.remove('selected-challenge', 'completed-challenge');
    });

    renderChallenges();

    showFeedback('Clique em um desafio para começar!', false);
}

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    renderChallenges();
    resetButton.addEventListener('click', resetGame);
});