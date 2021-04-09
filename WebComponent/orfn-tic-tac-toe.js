const {
    inherits
} = require("node:util");

const html = String.raw;
class TicTacToeBoard extends HTMLElement {
    getTemplate() {
        return html `
      <style>
      :host {
          --background-board: rgb(299, 214, 194);
      }
      #board {
        width: 540px;
        height: 540px;
        padding: 20px;
        background: var(--background-board, rgb(229, 214, 194));
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
      };
    </style>
    <div id="board"></div>`
    }
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = this.getTemplate();
        this.winner = false;
        this.positionsPlayed = [];
        this.player1Plays = [];
        this.player2Plays = [];
        this.turn = 1;
        this.player1Turns = 0;
        this.player2Turns = 0;
        this.a = [0, 3, 6, 0, 1, 2, 0, 2];
        this.b = [1, 4, 7, 3, 4, 5, 4, 4];
        this.c = [2, 5, 8, 6, 7, 8, 8, 6];
        for (let j = 0; j < 9; j++) {
            const newBox = document.createElement('tic-tac-toe-box');
            newBox.addEventListener('click', () => {
                if (this.turn % 2 == 1) {
                    newBox.setAttribute('symbol', 'cross');
                    this.positionsPlayed[this.turn - 1] = j;
                    this.player1Turns++;
                } else {
                    newBox.setAttribute('symbol', 'circle');
                    this.positionsPlayed[this.turn - 1] = j;
                    this.player2Turns++;
                }
                this.turn++;
                if (this.turn > 5) {
                    let incremento = 0;
                    let incremento2 = 1;
                    for (let index = 0; index < this.player1Turns; index++) {
                        this.player1Plays.push(this.positionsPlayed[incremento]);
                        incremento = incremento + 2;
                    }
                    for (let i = 0; i < this.player2Turns; i++) {
                        this.player2Plays.push(this.positionsPlayed[incremento2]);
                        incremento2 = incremento2 + 2;
                    }
                    if (this.winner === false) {
                        for (let i = 0; i < 8; i++) {
                            if (this.player1Plays.includes(this.a[i]) && this.player1Plays.includes(this.b[i]) && this.player1Plays
                                .includes(this.c[i])) {
                                console.log("Gano jugador 1");
                                this.winner = true;
                            }
                        }
                        for (let i = 0; i < 8; i++) {
                            if (this.player2Plays.includes(this.a[i]) && this.player2Plays.includes(this.b[i]) && this.player2Plays
                                .includes(this.c[i])) {
                                console.log("Gano jugador 2");
                                this.winner = true;
                            }
                        }
                        if (this.player1Turns + this.player2Turns === 9) {
                            const tieEvent = new CustomEvent('tie');
                            this.dispatchEvent(tieEvent);
                            alert('Empate');
                        }
                    } else if (this.winner) {
                        const winEvent = new CustomEvent('player-win', {
                            detail: {
                                player: this.turn % 2
                            }
                        })
                        this.dispatchEvent(winEvent);
                    }
                }
            })
            this.shadowRoot.getElementById('board').appendChild(newBox);
        }
    }
}
class TicTacToeBox extends HTMLElement {
    getTemplate() {
        return html `
     <style>
      #box {
        width: 175px;
        height: 175px;
        background: rgb(254, 254, 240);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    <div id="box"></div>
     `
    }
    static get observedAttributes() {
        return ['symbol'];
    }
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = this.getTemplate();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'symbol' && oldValue === null) {
            const nameSymbol = newValue;
            const symbol = document.createElement(`${newValue}-symbol`);
            this.shadowRoot.getElementById('box').appendChild(symbol);
        }
    }
}
class TicTacToeCross extends HTMLElement {

    getTemplate() {
        return html `
     <style>
      :host {
        background: rgb(71, 69, 78);
        height: 100px;
        position: relative;
        width: 10px;
        transform: rotate(45deg);
        border-radius: 30px;
      }

      :host:after {
        background: rgb(71, 69, 78);
        content: "";
        height: 10px;
        left: -45px;
        position: absolute;
        top: 45px;
        width: 100px;
        border-radius: 30px;
      }
    </style>
     `
    }

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = this.getTemplate();
    }
}
class TicTacToeCircle extends HTMLElement {
    getTemplate() {
        return html `
     <style>
      :host {
        background: transparent;
        border: 10px solid rgb(184, 64, 57);
        width: 75px;
        height: 70px;
        border-radius: 50%;
      }
    </style>
     `
    }
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = this.getTemplate();
    }
}
window.customElements.define('tic-tac-toe-board', TicTacToeBoard);
window.customElements.define('tic-tac-toe-box', TicTacToeBox);
window.customElements.define('cross-symbol', TicTacToeCross);
window.customElements.define('circle-symbol', TicTacToeCircle);