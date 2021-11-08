// const colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ];



let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode"); //give us two buttons

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() { //mode buttons event listeners
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected")
			modeButtons[1].classList.remove("selected")
			this.classList.add("selected") //this referes to what was clicked on
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset(); 
		});
	}
}

function setupSquares() {
	for(let i = 0; i < squares.length; i++){
	//add click listeners to squares
	squares[i].addEventListener("click", function() {
			//grab color of clicked squares
			let clickedColor = this.style.backgroundColor; //'this' refers to the item that was clicked
			//compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset() {
	//generate all new colors
	colors = generateRandomColor(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) { //if there is a color at that index
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
	reset();
})

// colorDisplay.textContent = pickedColor;



function changeColors(color) { //change all the colors to the correct color
	//loop through all squares
	for (let i = 0; i < squares.length; i++) { //could use for...of 
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let randomIndexColor = Math.floor(Math.random() * colors.length)
	return colors[randomIndexColor];
}

function generateRandomColor(num) {
	//make an array
	let arr = [];
	//repeat num times
	for (let i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a "red" from 0 - 255 
	let r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	let g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	let b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}