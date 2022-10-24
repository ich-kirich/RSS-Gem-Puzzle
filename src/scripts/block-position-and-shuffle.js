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
        const shuffledArray = shuffleArray(matrix.flat())
        matrix = getMatrix(shuffledArray)
        setPositionItems(matrix)
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

}