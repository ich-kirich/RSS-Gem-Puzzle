let isEnable = true
export function createPosition(){
    const puzzle = document.querySelector('.puzzle')
    const blocks = Array.from(document.querySelectorAll('.block-puzzle'))
    let countBlocks = blocks.map((item) => Number(item.dataset.matrixId))
    countBlocks = countBlocks[blocks.length - 1]
    blocks[countBlocks - 1].style.display = 'none'
    let matrix = getMatrix(
        blocks.map((item) => Number(item.dataset.matrixId)), countBlocks
    ) 
    setPositionItems(matrix);

    document.getElementById('shuffle').addEventListener('click', () =>{
        let shuffledArray = shuffleArray(matrix.flat())
        matrix = getMatrix(shuffledArray, countBlocks)
        setPositionItems(matrix)
    });

    puzzle.addEventListener('click', (event) => {
        if(isEnable){
            const blockNodes = event.target.closest('.block-puzzle')
            if(!blockNodes){
                return
            }
            const blockNumber = Number(blockNodes.dataset.matrixId)
            const blockCoordinates = findCoordinatesByNumber(blockNumber, matrix)
            const blankCoords = findCoordinatesByNumber(countBlocks, matrix)
            const isValid = isValidForSwap(blockCoordinates, blankCoords)
            if(isValid){
                swap(blankCoords, blockCoordinates, matrix, countBlocks)
                setPositionItems(matrix)
            }
        }
    });
};

function getMatrix(arr, countBlocks){
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

function setPositionItems(matrix){
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
            isEnable = true
        }, 1000)
    }, 300)
}