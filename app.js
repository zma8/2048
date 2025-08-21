//declare 
// SET board size to 4x4
let boardSize=4;
let board=[];
let prevBoard=[];
let prevScore=0;
let gameStatus='playing';
let score=0;

// GET board element, score display, message display, and restart button
const boardEl=document.getElementById('game-board');
const scoreDis=document.getElementById('score');
const messageDis=document.getElementById('message');
const restartBtn=document.getElementById('restart');
const toggleBtn=document.getElementById('dark-mode-toggle');
const undoBtn=document.getElementById('undo-btn');

//saving the best score of the game
let bestScore=localStorage.getItem('best')||0;
document.getElementById('best').innerText='best:' +bestScore;

//clear the page for starting the game 
function init(){
    score=0;
    gameStatus='Playing';
    board=[];
    messageDis.textContent='';

//this will  create an array inside my board and fill if with 0
    for(let i=0;i<boardSize;i++){
        board.push(new Array(boardSize).fill(0));
    }

//2 random tiles for starting
    addRandonTile();
    addRandonTile();
    render();

}


//this will generate new tiles 
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

//create tiles in the page 
board.forEach(row=>{
    row.forEach(cell=>{
        const tile=document.createElement('div');
        tile.classList.add('tile');

//add a class to the tile so we can edit in css
    if(cell!==0){
        tile.textContent=cell;
        tile.classList.add(`tile-${cell}`);

        tile.classList.add("merge");
        setTimeout(()=>tile.classList.remove("merge"),200);

        tile.classList.add('animate__animated','animate__pulse');
        setTimeout(()=>{
            tile.classList.remove('animate__animated','animate__pulse');
        },500);

    }

//adding the tile
    boardEl.appendChild(tile);

    });
});



//display score and the status of the game 
scoreDis.textContent=`Score is : ${score}`;
messageDis.textContent=`Game Status : ${gameStatus}`;

}

// ADD event listener for arrow key presses
document.addEventListener('keydown',(event)=>{
    if(event.key==='ArrowUp'){
         move('up') ;
    }
     if(event.key==='ArrowDown'){
         move('down') ;
     }
     if(event.key==='ArrowLeft'){
         move('left') ;
     }
     if(event.key==='ArrowRight'){
        move('right') ;
     }

});

// CHECK for win condition
function checkWin(){
for(let i=0;i<boardSize;i++){
    for (let j=0;j<boardSize;j++){
        if(board[i][j]===2048){
            gameStatus='Won';
           return true;
        }
    }
}
return false;
}

// CHECK for lose condition
function checkLose(){
for(let i=0;i<boardSize;i++){
    for (let j=0;j<boardSize;j++){
        if(board[i][j]===0){
            return false;
        }
//check if any movment on the same row can be made 
        if(i<boardSize-1&&board[i][j]===board[i+1][j]){
            return false;
        }
//check if any movment on the same col can be made 
        if(j<boardSize-1&&board[i][j]===board[i][j+1]){
            return false;
        }
    }
}
 gameStatus='Lost';
  return true;
}

//score update 
function updateScore(points){
score+=points;
scoreDis.innerText="Score : "+score;

//check for the higher score
if(score>bestScore){
    bestScore=score;

//print and save the best score 
    document.getElementById('best').innerText="Best Score : "+bestScore;
    localStorage.setItem('Best Score ',bestScore);
}
}

// ON arrow key press move the tile 
function move(direction){

let moved=false;
prevBoard=board.map(row=>[...row]);
prevScore=score;

//left movment 
if(direction==='left'){
for(let i=0;i<boardSize;i++){

//filter the row from 0
let row=board[i].filter(n=>n!==0);
for(let j=0;j<row.length;j++){

//check if both tiles have same value and merge 
    if(row[j]===row[j+1]){
        row[j]*=2;
        score+=row[j];
        row[j+1]=0;
    }
}

//again filter from 0 after merging
row=row.filter(n=>n!==0);

//adding new 0 tile
while(row.length<boardSize){
    row.push(0);
}

//change moved condition
if(board[i].toString()!==row.toString()){
    moved=true;
}
board[i]=row;

}}

//right movment 
else if(direction==='right'){
for(let i=0;i<boardSize;i++){
    let row=board[i].filter(n=>n!==0);
    for(let j=row.length-1;j>0;j--){
        if(row[j]===row[j-1]){
        row[j]*=2;
        score+=row[j];
        row[j-1]=0;
    }
    }
    row=row.filter(n=>n!==0);
while(row.length<boardSize){
    row.unshift(0);
}
if(board[i].toString()!==row.toString()){
    moved=true;
}
board[i]=row;

}   
}

//up movment 
else if(direction==='up'){
for(let i=0;i<boardSize;i++){
    let col=[];
    for(let j=0;j<boardSize;j++){

//push the values to array col to handle and filter from 0 
    if(board[j][i]!==0){
        col.push(board[j][i]);
    }}

//check if the tiles have same value to merge
    for(let j=0;j<col.length-1;j++){
        if(col[j]===col[j+1]){
            col[j]*=2;
            score+=col[j];
            col[j+1]=0;
        }
    }

//filter col from 0
    col=col.filter(n=>n!==0);

//add 0 to col after merging
    while(col.length<boardSize){
        col.push(0);
    }

//check if merged
    for(let m=0;m<boardSize;m++){
        if(board[m][i]!==col[m]){
            moved=true;
            board[m][i]=col[m];
        }
    }
}
}

//down movment 
else if(direction==='down'){
    for(let i=0;i<boardSize;i++){
    let col=[];
    for(let j=0;j<boardSize;j++){
    if(board[j][i]!==0){
        col.push(board[j][i]);
    }}
    for(let j=col.length-1;j>0;j--){
        if(col[j]===col[j-1]){
            col[j]*=2;
            score+=col[j];
            col[j-1]=0;
        }
    }
    col=col.filter(n=>n!==0);
    while(col.length<boardSize){
        col.unshift(0);
    }
    for(let m=0;m<boardSize;m++){
        if(board[m][i]!==col[m]){
            moved=true;
            board[m][i]=col[m];
        }
    }
}


}

// IF tiles moved add anf check for win/lose
if(moved){
    addRandonTile();
    if(!checkWin()){
        checkLose();
    }

}

//call render 
render();

//call update score funtion to update the score the best score of the game 
updateScore(0);
}

function undo(){
    if(prevBoard.length>0){
        board=prevBoard.map(row=>[...row]);
        score=prevScore;
        render();
    }
}
// ADD event listener for restart button
//on restart button click call init to restart the game 
restartBtn.addEventListener("click",init);
init();

toggleBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        toggleBtn.textContent="☀️ Light Mode";
    }else{
        toggleBtn.textContent="🌙 Dark Mode";;
    }

})
undoBtn.addEventListener('click',undo);

//animation for the movment
const animateCSS=(element,animation,prefix='animate__')=>
    new Promise((resolve,reject)=>{
        const animationB=`${prefix}${animation}`;
        const node=document.querySelector(element);

        node.classList.add(`${prefix}animated`,animationB);

        function handleAnimationEnd(event){
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`,animationB);
            resolve('animation ended');
        }
        node.addEventListener('animationend',handleAnimationEnd,{once:true});
    })