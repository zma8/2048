let boardSize=4;
const board=[];
let gameStatus='playing';
let score=0;

const boardEl=document.getElementById('game-board');
const scoreDis=document.getElementById('score');
const messageDis=document.getElementById('message');
const restartBtn=document.getElementById('restart');


function init(){
    score=0;
    gameStatus='playing';
    board=[];
    messageDis.textContent='';
//this will  create an array inside my board and fill if with 0
    for(let i=0;i<boardSize;i++){
        board.push(new Array(boardSize).fill(0));
    }
    addRandonTile();
    addRandonTile();
    render();

}


function addRandonTile(){
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board.length;j++){
            if(board[i][j]===0){
                board[i][j]=2;
                return;
            }
        }
    }

}

function render(){
boardEl.innerHTML='';

board.forEach(row=>{
    row.forEach(cell=>{
        const tile=document.createElement('div');
        tile.classList.add('tile');

    if(cell!==0){
        tile.textContent=cell;
        tile.classList.add(`tile${cell}`);

    }
    boardEl.appendChild(tile);

    });
});

scoreDis.textContent=`score is ${score}`;

if(gameStatus==='won'){
messageDis.textContent='you win';
}
else if(gameStatus==='lost'){
messageDis.textContent='game over';
}
else{
messageDis.textContent='';
}

}

document.addEventListener('keydown',(event)=>{
    if(event.key==='ArrowUp') move('up') ;
     if(event.key==='ArrowDown') move('down') ;
     if(event.key==='ArrowLeft') move('left') ;
     if(event.key==='ArrowRight') move('right') ;

});


