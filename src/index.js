import './styles/normalize.css';
import './styles/index.scss';
import './scripts/block-position-and-shuffle.js';
import './scripts/move-block.js';
import { createPosition } from './scripts/block-position.js';
import { shuffle } from './scripts/shuffle.js';
document.body.innerHTML = `
    <main>
        <div class="back">
            <div class="panel">
                <button id="shuffle">Shuffle and start</button>
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
        </div>
    </main>
`;

createPosition();
shuffle();