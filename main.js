//get reference to canvas
const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight; //spans  entire window
canvas.width=200; // width 200px

const ctx = canvas.getContext("2d");//get drawing context, allows draw methods
const car = new Car(100, 100, 30, 50);//set car axis and dimensions
car.draw(ctx); //draws car
