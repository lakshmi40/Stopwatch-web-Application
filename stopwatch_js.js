const lapButton= document.getElementsByClassName("lap")[0];
const startButton= document.getElementsByClassName("start")[0];
const resetButton= document.getElementsByClassName("reset")[0];
const minute= document.getElementsByClassName("min")[0];
const second= document.getElementsByClassName("sec")[0];
const centiSecond= document.getElementsByClassName("msec")[0];
const lapList = document.querySelector(".laps");
const clearButton = document.querySelector(".clear");

let isStart= false
let secCounter=0;
let sec;
let centisec;
let centisecCounter=0;
let min;
let minCounter=0;
let isReset=false;
let lapTimes = [];

const toggleButton = () => {
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")
}

const start=()=>{
    if (isStart && isReset){
        startButton.innerHTML='Start';
        clearInterval(sec);
        clearInterval(centisec);

        isStart=false;
        isReset=false;

    }else{
        startButton.innerHTML='Pause';

        min = setInterval(() =>{
            minute.innerHTML= ` ${++minCounter} : `;
            }, 60 * 1000);

        sec = setInterval(() =>{
            if (secCounter==60){
                secCounter=0;
            }
            second.innerHTML= ` ${++secCounter} : `;
            }, 1000);

        centisec = setInterval(() =>{
            if (centisecCounter==100){
                centisecCounter=0;
            }
            centiSecond.innerHTML= ` ${++centisecCounter}  `;
        }, 10);
        isStart=true;
        isReset=true;
    }
    toggleButton();
}

const reset= () => {
    start();
    isReset=true;
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    minute.innerHTML=' 00 :'
    second.innerHTML=' 00 : '
    centiSecond.innerHTML= ' 00'

}

const lap = () => {
    const lapTime = `${minCounter}:${secCounter}:${centisecCounter}`;
    lapTimes.push(lapTime);

    const lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `<span class="number">${lapTimes.length}</span>: ${lapTime}`;

    lapList.appendChild(lapItem);
};

const clearLaps = () => {
    lapList.innerHTML = "";
    lapTimes = [];
};


startButton.addEventListener("click",start);
resetButton.addEventListener("click",reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clear);


