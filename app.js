let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let msgClass = document.querySelector(".msg-class");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");

let count = 0;
let turnO = true; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgClass.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        // console.log("box was clicked");
        if(turnO) {
            box.innerText = "O";
            box.style.color = "blue";
            turnO = false;
            count++;
            console.log(count);
        } else {
            box.innerText = "X";
            box.style.color = "#FF0000";
            turnO = true;
            count++;
            console.log(count);
        }
        box.disabled = true;
        checkWinner();
    })
})

const disableBoxes = () =>{
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () =>{
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Winner is ${winner}`;
    msgClass.classList.remove("hide");
    disableBoxes();
}
const showDraw = () =>{
    msg.innerText = "Draw";
    msgClass.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () =>{
    let winnerFound = false;
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
            }
        }
    }
    if(count === 9 && !winnerFound){
    showDraw();
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);