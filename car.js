class Car{
    constructor(x, y, width, height){
        //storing attributes, storage purposes
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }
   
    //method draw, takes context as param
    draw(ctx){
        ctx.beginPath(); //start path
        ctx.rect(
            this.x - this.width/2, //ensures x is in center of car
            this.y - this.height/2,//same logic for y
            this.width,
            this.height
            );
            ctx.fill(); //fill in
    }
}