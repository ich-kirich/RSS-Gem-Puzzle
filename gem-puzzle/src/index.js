import './styles/normalize.css';
import './styles/index.scss';
import './scripts/index.js';
import './scripts/time.js';
import './music/1.mp3';
import './scripts/sizes.js';
import { createPosition } from './scripts/index.js';
import { chooseSize } from './scripts/sizes.js';
document.body.innerHTML = `
    <main>
        <div class="back">
            <div class="panel">
                <div class="buttons">
                    <button id="shuffle">Shuffle and start</button>
                    <button id="easy">For easy win</button>
                    <button id="save">Save</button>
                    <button id="load">Load</button>
                    <button id="results">Results</button>
                    <button id="sound">On/off sound</button>
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
            <div class="sizes">
                <p>Other sizes:</p>
                <div class="three">3x3</div>
                <div class="four">4x4</div>
                <div class="five">5x5</div>
                <div class="six">6x6</div>
                <div class="seven">7x7</div>
                <div class="eight">8x8</div>
            </div>
            <h2 class="win-text" id="win-text">Вы выиграли!</h2>
            <h2 class="save-text" id="save-text">Игра сохранена!</h2>
        </div>
        <div class="results-list">
            <p>Ваши результаты!</p>
            <ul>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
            </ul>
        </div>
    </main>
`;
chooseSize();
createPosition();