import { setPositionItems, getMatrix } from './index.js';
import { ClearСlock } from './time.js';

export function chooseSize(){
    const size3 = document.querySelector('.three')
    const size4 = document.querySelector('.four')
    const size5 = document.querySelector('.five')
    const size6 = document.querySelector('.six')
    const size7 = document.querySelector('.seven')
    const size8 = document.querySelector('.eight')

    size3.addEventListener('click', () =>{
        createBlocks(9)
        setPos()
    });

    size4.addEventListener('click', () =>{
        createBlocks(16)
        let blocks = document.querySelectorAll('.block-puzzle')
        for(let i = 0; i < blocks.length; i++){
            blocks[i].style.width = '25%'
            blocks[i].style.height = '25%'
        }
        setPos()
    });

    size5.addEventListener('click', () =>{
        createBlocks(25)
        let blocks = document.querySelectorAll('.block-puzzle')
        for(let i = 0; i < blocks.length; i++){
            blocks[i].style.width = '20%'
            blocks[i].style.height = '20%'
        }
        setPos()
    });

    size6.addEventListener('click', () =>{
        createBlocks(36)
        let blocks = document.querySelectorAll('.block-puzzle')
        for(let i = 0; i < blocks.length; i++){
            blocks[i].style.width = '16.7%'
            blocks[i].style.height = '16.7%'
        }
        setPos()
    });

    size7.addEventListener('click', () =>{
        createBlocks(49)
        let blocks = document.querySelectorAll('.block-puzzle')
        for(let i = 0; i < blocks.length; i++){
            blocks[i].style.width = '14.3%'
            blocks[i].style.height = '14.3%'
        }
        setPos()
    });

    size8.addEventListener('click', () =>{
        createBlocks(64)
        let blocks = document.querySelectorAll('.block-puzzle')
        for(let i = 0; i < blocks.length; i++){
            blocks[i].style.width = '12.5%'
            blocks[i].style.height = '12.5%'
        }
        setPos()
    });
}

function setPos(){
    var matr = [], countBlocks = 0
    let blocks = Array.from(document.querySelectorAll('.block-puzzle'))
    countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
    countBlocks = countBlocks[blocks.length - 1]
    blocks[countBlocks - 1].style.display = 'none'
    matr = getMatrix(
        blocks.map((item) => Number(item.dataset.matrixId)), countBlocks
    ) 
    setPositionItems(matr);
    ClearСlock()
    let moves = document.querySelector('.moves')
    moves.innerHTML = 0
}

function createBlocks(size){
    let puzzle = document.querySelector('.puzzle')
    puzzle.innerHTML = ''
    for(let i = 1; i <= size; i++){
        let newBlock = document.createElement('div')
        let newSpan = document.createElement('span')
        newSpan.textContent = `${i}`
        newBlock.appendChild(newSpan)
        newBlock.classList.add("block-puzzle")
        newBlock.setAttribute('data-matrix-id',`${i}`)
        puzzle.appendChild(newBlock)
    }
}