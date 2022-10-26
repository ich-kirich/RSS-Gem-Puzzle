import { StartStop, ClearСlock, continueTime } from './time.js';
import { setPos, createBlocks } from './sizes.js';
var isEnable = false, isSound = true, Load = false, isResult = false, isWin = false;
var audio = new Audio();
audio.src = './src/music/1.mp3';
var loadKey = 5000

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
        if(!isResult && isEnable){
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
                if(isSound){
                    audio.play()
                }
                swap(blankCoords, blockCoordinates, matr, countBlocks)
                setPositionItems(matr)
            }
        }
    });

    document.getElementById('easy').addEventListener('click', () =>{
        if(!isResult){
            ClearСlock()
            StartStop()
            isEnable = true
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
        }
    });

    document.getElementById('save').addEventListener('click', () =>{
        if(!isResult && isEnable){
            loadKey = 5000
            let moves = document.querySelector('.moves')
            let numMoves = Number(moves.textContent)
            let time = document.querySelector('.time')
            let date = time.textContent
            localStorage.setItem(loadKey, JSON.stringify(matr))
            localStorage.setItem('numMoves', JSON.stringify(numMoves))
            localStorage.setItem('time', JSON.stringify(date))
            document.getElementById('save-text').style.display = 'block'
            setTimeout(() => {
                document.getElementById('save-text').style.display = 'none'
            }, 1000)
            Load = true
        }
    });

    document.getElementById('load').addEventListener('click', () =>{
        if(localStorage.getItem(loadKey) !== null){
            Load = true
        }
        if(Load){
            matr = JSON.parse(localStorage.getItem(loadKey))
            isEnable = true
            let blocks
            switch(matr.length){
                case 3:
                    createBlocks(9)
                    blocks = document.querySelectorAll('.block-puzzle')
                    setPos()
                    break;
                case 4:
                    createBlocks(16)
                    blocks = document.querySelectorAll('.block-puzzle')
                    for(let i = 0; i < blocks.length; i++){
                        blocks[i].style.width = '25%'
                        blocks[i].style.height = '25%'
                    }
                    setPos()
                    break;
                case 5:
                    createBlocks(25)
                    blocks = document.querySelectorAll('.block-puzzle')
                    for(let i = 0; i < blocks.length; i++){
                        blocks[i].style.width = '20%'
                        blocks[i].style.height = '20%'
                    }
                    setPos()
                    break;
                case 6:
                    createBlocks(36)
                    blocks = document.querySelectorAll('.block-puzzle')
                    for(let i = 0; i < blocks.length; i++){
                        blocks[i].style.width = '16.7%'
                        blocks[i].style.height = '16.7%'
                    }
                    setPos()
                    break;
                case 7:
                    createBlocks(49)
                    blocks = document.querySelectorAll('.block-puzzle')
                    for(let i = 0; i < blocks.length; i++){
                        blocks[i].style.width = '14.3%'
                        blocks[i].style.height = '14.3%'
                    }
                    setPos()
                    break;
                case 8:
                    createBlocks(64)
                    blocks = document.querySelectorAll('.block-puzzle')
                    for(let i = 0; i < blocks.length; i++){
                        blocks[i].style.width = '12.5%'
                        blocks[i].style.height = '12.5%'
                    }
                    setPos()
                    break;
                default:
                    console.log('Wrong number of blocks')
            }
            setPositionItems(matr);
            let moves = document.querySelector('.moves')
            let time = document.querySelector('.time')
            moves.innerHTML = `${localStorage.getItem('numMoves')}`
            time.innerHTML = `${JSON.parse(localStorage.getItem('time'))}`
            let dateString = JSON.parse(localStorage.getItem('time')).split(':');
            continueTime(dateString)
        }
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
        if(isEnable && !isResult){
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
                        if(isSound){
                            audio.play()
                        }
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

    document.getElementById('results').addEventListener('click', () =>{
        if(!isWin){
            isResult = true
            showResults()
        }
    });

    document.getElementById('sound').addEventListener('click', () =>{
        if(isSound){
            document.getElementById('sound').style.backgroundColor = "green"
            audio.pause();
            isSound = false
        }
        else{
            document.getElementById('sound').style.backgroundColor = "#519595"
            audio.play();
            isSound = true
        }
    });

    const size3 = document.querySelector('.three')
    const size4 = document.querySelector('.four')
    const size5 = document.querySelector('.five')
    const size6 = document.querySelector('.six')
    const size7 = document.querySelector('.seven')
    const size8 = document.querySelector('.eight')

    size3.addEventListener('click', () =>{
        if(isEnable){
            isEnable = false
        }
    });

    size4.addEventListener('click', () =>{
        if(isEnable){
            isEnable = false
        }
    });

    size5.addEventListener('click', () =>{
        if(isEnable){
            isEnable = false
        }
    });

    size6.addEventListener('click', () =>{
        if(isEnable){
            isEnable = false
        }
    });

    size7.addEventListener('click', () =>{
        if(isEnable){
            isEnable = false
        }
    });

    size8.addEventListener('click', () =>{
        if(isEnable){
            isEnable = false
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
    isEnable = false
    isWin = true
    const wonClass = 'won'
    let forTop = []
    isEnable = false
    setTimeout(() => {
        let puzzle = document.querySelector('.puzzle')
        let winText = document.querySelector('.win-text')
        let time = document.querySelector('.time')
        puzzle.classList.add(wonClass)
        winText.classList.add(wonClass)
        winText.classList.remove('win-text')
        setTimeout(() => {
            puzzle.classList.remove(wonClass)
            winText.classList.remove(wonClass)
            winText.classList.add('win-text')
            let moves = document.querySelector('.moves')
            forTop[0] = moves.textContent
            forTop[1] = time.textContent
            addToTop(forTop)
            moves.innerHTML = 0
            ClearСlock()
            isWin = false
        }, 1000)
    }, 300)
}

function showResults(){
    let res = document.querySelector('.results-list')
    let li = document.querySelectorAll('.item')
    for(let i = 0; i < 10; i++){
        if(localStorage.getItem(`${i}`) !== '"-"' && localStorage.getItem(`${i}`) !== String(null) && localStorage.getItem(`${i}`) !== null){
            let str = JSON.parse(JSON.stringify(localStorage.getItem(`${i}`))).split(',')
            li[i].innerHTML = `${`You solved the puzzle in ${str[1]} and ${str[0]} moves`}`
        }
        else{
            li[i].innerHTML = `-`
        }
    }
    res.style.display = 'block'
    setTimeout(() => {
        res.classList.add('open')
        setTimeout(() => {
            res.classList.remove('open')
            setTimeout(() => {
                res.style.display = 'none'
                isResult = false
            }, 300)
        }, 4000)
    }, 300)
}

function addToTop(arrTop){
    for(let i = 0; i < 10; i++){
        let itemTop = JSON.stringify(localStorage.getItem(`${i}`));
        if(itemTop !== String(null) && itemTop !== String(undefined)){
            itemTop = JSON.parse(itemTop).split(',');
            let timeItem = itemTop[1].split(':')
            let timeArrTop = arrTop[1].split(':')
            if(Number(timeItem[0]) > Number(timeArrTop[0])){
                localStorage.setItem(`${i}`, arrTop)
                arrTop = itemTop
               }
            else if(Number(timeItem[0]) === Number(timeArrTop[0])){
                if(Number(timeItem[1]) > Number(timeArrTop[1])){
                    localStorage.setItem(`${i}`, arrTop)
                    arrTop = itemTop
                }
                else if(Number(timeItem[2]) > Number(timeArrTop[2])){
                    localStorage.setItem(`${i}`, arrTop)
                    arrTop = itemTop
                }
                else if(Number(timeItem[2]) === Number(timeArrTop[2])){
                    if(Number(itemTop[0]) > Number(arrTop[0])){
                        localStorage.setItem(`${i}`, arrTop)
                        arrTop = itemTop
                    }
                }
            }
        }
        else{
            if(arrTop !== String(null) && arrTop !== String(undefined)){
                localStorage.setItem(`${i}`, arrTop)
                arrTop = itemTop
            }
        }
    }
}