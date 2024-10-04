class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.buttons = Array.from({ length: 3 }, () => Array(3).fill(null));
        this.createBoard();
        this.addBackgroundAnimation();
    }

    createBoard() {
        const board = document.createElement('div');
        board.id = 'board';

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const button = document.createElement('button');
                button.addEventListener('click', () => this.onClick(i, j));
                board.appendChild(button);
                this.buttons[i][j] = button;
            }
        }

        document.body.appendChild(board);
    }

    addBackgroundAnimation() {
        const animationContainer = document.createElement('div');
        animationContainer.id = 'animation-container';
        document.body.appendChild(animationContainer);
    }

    onClick(row, col) {
        if (this.buttons[row][col].textContent === '') {
            this.buttons[row][col].textContent = this.currentPlayer;
            if (this.checkWinner(row, col)) {
                alert(`Player ${this.currentPlayer} wins!`);
                this.resetBoard();
            } else if (this.isDraw()) {
                alert("It's a draw!");
                this.resetBoard();
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    checkWinner(row, col) {
        if (this.buttons[row].every(button => button.textContent === this.currentPlayer)) {
            return true;
        }
        if (this.buttons.every(rowButtons => rowButtons[col].textContent === this.currentPlayer)) {
            return true;
        }
        if (row === col && this.buttons.every((rowButtons, index) => rowButtons[index].textContent === this.currentPlayer)) {
            return true;
        }
        if (row + col === 2 && this.buttons.every((rowButtons, index) => rowButtons[2 - index].textContent === this.currentPlayer)) {
            return true;
        }
        return false;
    }

    isDraw() {
        return this.buttons.flat().every(button => button.textContent !== '');
    }

    resetBoard() {
        this.buttons.flat().forEach(button => (button.textContent = ''));
        this.currentPlayer = 'X';
    }
}

window.onload = () => {
    new TicTacToe();
};
