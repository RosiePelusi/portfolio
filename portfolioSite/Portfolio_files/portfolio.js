/*********
|darkMode|
*********/
function darkToggle()
{
    if(document.body.classList.contains("bodyBackgroundLight"))
    {
        darkModeOn();
    }
    else
    {
        lightModeOn();
    }
}

const darkModeOn = () => 
{
    document.body.classList.replace("bodyBackgroundLight", "bodyBackgroundDark"); //change body

    var navMenu = document.getElementById("navMenu"); //change buttons
    var buttons = navMenu.getElementsByClassName("buttonLight");
    for(var i = 0; i < 5; i++)
    {
        buttons[0].className = buttons[0].className.replace("buttonLight", "buttonDark");
    }

    var textBG = document.getElementsByClassName("textBackgroundLight"); //change text divs
    for(var i = 0; i < 2; i++)
    {
        textBG[0].className = textBG[0].className.replace("textBackgroundLight", "textBackgroundDark");
    }

    document.getElementById("toggleButton").classList.replace("buttonLightT", "buttonDarkT"); //change toggle button
    document.getElementById("xdyButton").classList.replace("buttonLightSubmit", "buttonDarkSubmit");
    document.getElementById("startMole").classList.replace("buttonLightMole", "buttonDarkMole");
}

const lightModeOn = () => 
{
    document.body.classList.replace("bodyBackgroundDark", "bodyBackgroundLight");

    var buttons = document.getElementsByClassName("buttonDark");
    for(var i = 0; i < 5; i++)
    {
        buttons[0].className = buttons[0].className.replace("buttonDark", "buttonLight");
    }

    var textBG = document.getElementsByClassName("textBackgroundDark");
    for(var i = 0; i < 2; i++)
    {
        textBG[0].className = textBG[0].className.replace("textBackgroundDark", "textBackgroundLight");
    }

    document.getElementById("toggleButton").classList.replace("buttonDarkT", "buttonLightT");
    document.getElementById("xdyButton").classList.replace("buttonDarkSubmit", "buttonLightSubmit");
    document.getElementById("startMole").classList.replace("buttonDarkMole", "buttonLightMole");
}

/*****
|Dice|
*****/
function dice()
{
    var dice = document.querySelector("#xdy").value.toLowerCase();
    var arr = dice.split("d"); //find and split input
    var x = Number(arr[0]);
    var y = Number(arr[1]); //convert to int

    if(arr[1] == null)
    {
        document.getElementById("diceRoll").innerHTML = "Please enter your rolls as xdy, for example 3d6 would roll 3 6 sided dice."
    }
    else
    {
        var results = [];

        for(i = 0; i < x; i++)
        {
            var out = Math.floor((Math.random() * y) + 1);
            results.push(out);
        } //generate random number and store in array results

        var total = 0;

        for(i = 0; i < results.length; i++)
        {
            total = total + results[i];
        }//add results

        document.getElementById("diceRoll").innerHTML = results + " Total: " + total;
    }

}

/************
|Wack A Mole|
************/
const square   = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#timeLeft");
let score = document.querySelector("#score");

let result = 0;
let currentTime = timeLeft.textContent;
let playing = 0;

function startMole() //reset
{
    result = 0;
    score.textContent = result;

    currentTime = 60;
    timeLeft.textContent = currentTime;

    playing = 1;
}

function randomSquare() //select a random square for the mole to show
{
    square.forEach(className => {
        className.classList.remove("mole");
    })
    let randomPosition = square[Math.floor(Math.random() * 16)]; //math.floor to round to integer
    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;
}

square.forEach(id => {
    id.addEventListener("mouseup", () => {
        if(id.id == hitPosition)
        {
            result = result + 1;
            score.textContent = result;
            id.classList.remove("mole"); //detect hits
        }
    })
})

function moveMole() //every 1000ms call randomSquare() to move the mole
{
    let timerId = null;
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() // count down from 60 if started
{
    if(playing == 1)
    {
        currentTime--;
        timeLeft.textContent = currentTime;

        if(currentTime == 0)
        {
            clearInterval(timerId);
            alert("Game Over! Your score: " + result)
            playing = 0;
        }
    }
}

let timerId = setInterval(countDown, 1000); //every 1000ms call countDown() to count down

