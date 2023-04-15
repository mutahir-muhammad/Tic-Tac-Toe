const boxes = document.querySelectorAll(".square");
const currentStatus = document.querySelector("#statusText");
const restart = document.querySelector(".restart");

let options = ["", "", "", "", "", "", "", "",""];
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
let currentPlayer = "X";
let running = false;

gameStarter();

function gameStarter(){
    boxes.forEach(boxes => {boxes.addEventListener("click", click)});
    restart.addEventListener("click", gameRestart);
    currentStatus.textContent = `Next Player: ${currentPlayer}`;
    running = true;
}

function click(){
    const boxIndex = this.getAttribute("boxIndex");
    if(options[boxIndex] != "" || !running){
        return;
    }
    changeBox(this, boxIndex);
    isWinner();
}
function changeBox(boxes, index){
    options[index] = currentPlayer;
    boxes.textContent = currentPlayer;
}
function nextPlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    currentStatus.textContent = `Next Player: ${currentPlayer}`;
}
function gameRestart(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    currentStatus.textContent = `Next Player: ${currentPlayer}`;
    boxes.forEach((box)=>{
        box.textContent = "";
    })
    running = true;
}

function isWinner(){
    let winner = false;
    for(i=0; i<winConditions.length; i++){
        const win = winConditions[i];
        let box1,box2,box3;
        box1 = options[win[0]];
        box2 = options[win[1]];
        box3 = options[win[2]];

        if(box1 == "" || box2 == "" || box3 == ""){
            continue;
        }
       
        if(box1 == box2 && box2 == box3){
            winner = true;
            break;
        }
    }
    if(winner){
        currentStatus.textContent = `Winner: ${currentPlayer}`;
        running = false;
    }
    else if (!options.includes("")){
        currentStatus.textContent = "DRAW!";
        running = false;
    }
    else nextPlayer();
}