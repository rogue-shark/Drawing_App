//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //context

const sizeEl = document.querySelector('#size')
const colorEl = document.querySelector('#colorpicker')
const clearEl = document.querySelector('#clear')
const incBtn = document.querySelector('#increase')
const decBtn = document.querySelector('#decrease')


let size = 10 //initial value
let color = colorEl.value //stores the value from color picker
let x
let y
let isPressed = false;

//'mousedown' -> when we click and hold it down
canvas.addEventListener('mousedown', (event) => {
    isPressed = true

    //getting position of where the mouse is
    x = event.offsetX
    y = event.offsetY
}) 

//on release
canvas.addEventListener('mouseup', (event) => {
    isPressed = false

    //getting position of where the mouse is
    x = undefined
    y = undefined
}) 

//position of whereever our mouse is
canvas.addEventListener('mousemove', (event) => {
    if (isPressed) {
        const x2 = event.offsetX
        const y2 = event.offsetY

        drawCircle(x2, y2) // i.e draws circle at every move 
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
}) 

//drawing shapes - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function drawCircle(x, y){
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color
    ctx.fill() //fills the circle
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1,y1) //moves to this coordinate
    ctx.lineTo(x2,y2) // makes a line going upto (x2, y2) coordinate
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2 //size of circle now is same as width of line
    ctx.stroke()  //actually draws the line
}

function displayUpdatedSize() {
    sizeEl.innerText = size
}

//button events
incBtn.addEventListener('click', () => {
    size += 5
    if (size > 50) return size = 50
    displayUpdatedSize()
})

decBtn.addEventListener('click', () => {
    size -= 5
    if (size < 5) return size = 5
    displayUpdatedSize()
})

//color event
colorEl.addEventListener('change', (eve) => color = eve.target.value)

clearEl.addEventListener('click', () => location.reload())