//get reference to canvas
const canvas = document.getElementById("myCanvas");

canvas.width=200; // width 200px

const ctx = canvas.getContext("2d");//get drawing context, allows draw methods
const road = new Road(canvas.width/2,canvas.width*0.9);//set left and right markers
const car = new Car(road.getLaneCenter(1), 100, 30, 50);//set car axis and dimensions

animate();

function animate(){
    car.update();
    canvas.height = window.innerHeight; //spans  entire window, car moves x,y adjusts with new canvas
    ctx.save();
    //make illusion camera is following car,acc road moving
    ctx.translate(0,-car.y+canvas.height*0.7);
    road.draw(ctx);//road first
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate); //calls animate function many times per second
}
