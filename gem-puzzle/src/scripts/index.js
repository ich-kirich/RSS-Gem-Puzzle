import { StartStop, ClearСlock } from './time.js';
let isEnable = false
var audio = new Audio();
audio.src = './src/music/1.mp3';

export function createPosition(){
    var matr = [], countBlocks = 0
    window.onload = function() {
        let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
        countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
        countBlocks = countBlocks[blocks.length - 1]
        blocks[countBlocks - 1].style.display = 'none'
        matr = getMatrix(
            blocks.map((item) => Number(item.dataset.matrixId)), countBlocks
        ) 
        setPositionItems(matr);
        let taskElements = document.querySelector('.puzzle').querySelectorAll(`.block-puzzle`)
        for (let task of taskElements) {
            task.draggable = true;
        }
    };

    document.getElementById('shuffle').addEventListener('click', () =>{
        let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
        countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
        countBlocks = countBlocks[blocks.length - 1]
        blocks[countBlocks - 1].style.display = 'none'
        matr = getMatrix(
            blocks.map((item) => Number(item.dataset.matrixId)), countBlocks
        ) 
        let moves = document.querySelector('.moves')
        moves.innerHTML = 0
        ClearСlock()
        isEnable = true
        StartStop()
        let shuffledArray = shuffleArray(matr.flat())
        matr = getMatrix(shuffledArray, countBlocks)
        setPositionItems(matr)
    });

    document.querySelector('.puzzle').addEventListener('click', (event) => {
        if(isEnable){
            const blockNodes = event.target.closest('.block-puzzle')
            if(!blockNodes){
                return
            }
            let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
            countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
            countBlocks = countBlocks[blocks.length - 1]
            const blockNumber = Number(blockNodes.dataset.matrixId)
            const blockCoordinates = findCoordinatesByNumber(blockNumber, matr)
            const blankCoords = findCoordinatesByNumber(countBlocks, matr)
            const isValid = isValidForSwap(blockCoordinates, blankCoords)
            if(isValid){
                audio.play()
                swap(blankCoords, blockCoordinates, matr, countBlocks)
                setPositionItems(matr)
            }
        }
    });

    document.getElementById('easy').addEventListener('click', () =>{
        isEnable = true
        ClearСlock()
        StartStop()
        let moves = document.querySelector('.moves')
        moves.innerHTML = 0
        let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
        countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
        countBlocks = countBlocks[blocks.length - 1]
        blocks[countBlocks - 1].style.display = 'none'
        matr = getMatrix(
            blocks.map((item) => Number(item.dataset.matrixId)), countBlocks
        ) 
        let last = matr[Math.sqrt(countBlocks) - 1][matr[Math.sqrt(countBlocks) - 1].length - 1]
        let preLast = matr[Math.sqrt(countBlocks) - 1][matr[Math.sqrt(countBlocks) - 1].length - 2]
        matr[Math.sqrt(countBlocks) - 1][matr[Math.sqrt(countBlocks) - 1].length - 1] = preLast
        matr[Math.sqrt(countBlocks) - 1][matr[Math.sqrt(countBlocks) - 1].length - 2] = last
        setPositionItems(matr);
    });

    document.querySelector('.puzzle').addEventListener(`dragstart`, (evt) => {
        if(isEnable){
            evt.target.classList.add(`selected`);
        }
    })
      
    document.querySelector('.puzzle').addEventListener(`dragend`, (evt) => {
        if(isEnable){
            evt.target.classList.remove(`selected`);
        }
    });

    document.querySelector('.puzzle').addEventListener(`dragover`, (evt) => {
        if(isEnable){
            evt.preventDefault();
            const activeElement = document.querySelector(`.selected`);
            const currentElement = evt.target;
            const isMoveable = currentElement.classList.contains(`puzzle`);
            let blockNodes = activeElement
            if (isMoveable) {
                if(document.querySelector('.selected')){
                    activeElement.classList.remove(`selected`);
                    let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
                    countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
                    countBlocks = countBlocks[blocks.length - 1]
                    const blockNumber = Number(blockNodes.dataset.matrixId)
                    const blockCoordinates = findCoordinatesByNumber(blockNumber, matr)
                    const blankCoords = findCoordinatesByNumber(countBlocks, matr)
                    const isValid = isValidForSwap(blockCoordinates, blankCoords)
                    if(isValid){
                        audio.play()
                        swap(blankCoords, blockCoordinates, matr, countBlocks)
                        setPositionItems(matr)
                    }
                }
            }
            else{
                return;
            }
        }
    });
};

export function getMatrix(arr, countBlocks){
    let matrix = []
    let count = Math.sqrt(countBlocks)
    for(let i = 0; i < count; i++){
        matrix.push([])
    }
    let x = 0
    let y = 0

    for(let i = 0; i < arr.length; i++){
        if(x >= count){
            y++
            x = 0
        }
        matrix[y][x] = arr[i]
        x++
    }
    return matrix
};

export function setPositionItems(matrix){
    let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++){
            let value = matrix[y][x]
            let node = blocks[value - 1]
            setNodeStyles(node, x, y)
        }
    }
}

function setNodeStyles(node, x, y){
     const shiftPs = 100;
     node.style.transform = `translate3D(${x*shiftPs}%, ${y*shiftPs}%, 0)`
}

function shuffleArray(arr){
    return arr
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)
}

function findCoordinatesByNumber(number, matrix){
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] === number){
                return {x, y}
            }
        }
    }
    return null
}

function isValidForSwap(coords1, coords2){
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)
    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix, countBlocks){
    const coords1Number = matrix[coords1.y][coords1.x]
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
    matrix[coords2.y][coords2.x] = coords1Number
    if(isWon(matrix, countBlocks)){
        addWonclass();
    }
    let moves = document.querySelector('.moves')
    let numMoves = Number(moves.textContent)
    moves.innerHTML = numMoves + 1

}

function isWon(matrix, countBlocks){
    const winFlattArr = new Array(countBlocks).fill(0).map((_item, i) => i + 1)
    const flatMatrix = matrix.flat()
    for(let i = 0; i < winFlattArr.length; i++){
        if(flatMatrix[i] !== winFlattArr[i]){
            return false
        }   
    }
    return true
}

function addWonclass(){
    const wonClass = 'won'
    setTimeout(() => {
        let puzzle = document.querySelector('.puzzle')
        let winText = document.querySelector('.win-text')
        puzzle.classList.add(wonClass)
        winText.classList.add(wonClass)
        winText.classList.remove('win-text')
        isEnable = false
        setTimeout(() => {
            puzzle.classList.remove(wonClass)
            winText.classList.remove(wonClass)
            winText.classList.add('win-text')
            let moves = document.querySelector('.moves')
            moves.innerHTML = 0
            ClearСlock()
        }, 1000)
    }, 300)
}