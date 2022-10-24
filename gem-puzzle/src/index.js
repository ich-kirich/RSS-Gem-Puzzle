import './styles/normalize.css';
import './styles/index.scss';
import './scripts/index.js';
import './scripts/time.js';
import './music/1.mp3'
import { createPosition } from './scripts/index.js';
document.body.innerHTML = `
    <main>
        <div class="back">
            <div class="panel">
                <div class="buttons">
                    <button id="shuffle">Shuffle and start</button>
                </div>
                <div class="info">
                    <p>Moves: <span class="moves">0</span></p>
                    <p>Time: <span class="time">0:00</span></p>
                </div>
            </div>
            <div class="puzzle">
                <div class="block-puzzle" data-matrix-id="1"><span>1</span></div>
                <div class="block-puzzle" data-matrix-id="2"><span>2</span></div>
                <div class="block-puzzle" data-matrix-id="3"><span>3</span></div>
                <div class="block-puzzle" data-matrix-id="4"><span>4</span></div>
                <div class="block-puzzle" data-matrix-id="5"><span>5</span></div>
                <div class="block-puzzle" data-matrix-id="6"><span>6</span></div>
                <div class="block-puzzle" data-matrix-id="7"><span>7</span></div>
                <div class="block-puzzle" data-matrix-id="8"><span>8</span></div>
                <div class="block-puzzle" data-matrix-id="9"><span>9</span></div>
            </div>
            <div class="sizes"></div>
            <h2 class="win-text">Вы выиграли!</h2>
        </div>
    </main>
`;

createPosition();