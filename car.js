class Car{
    constructor(x, y, width, height){
        //storing attributes, storage purposes
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed=0;
        this.accleration=0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0; //unit circle rotated 90 degrees
        
        this.sensor= new Sensor(this);//car is passed as this
        this.controls = new Controls(); //setiing up car controls
    }

    update(){
        this.#move();
        this.sensor.update();
    }

   #move(){
    if(this.controls.forward){
            
        this.speed+=this.accleration;
    
    }
    if(this.controls.reverse){
        this.speed-=this.accleration;
    }
    if(this.speed>this.maxSpeed){
        this.speed=this.maxSpeed;
    }
    if(this.speed<-this.maxSpeed/2){//backwards
        this.speed=-this.maxSpeed/2;
    }

    if(this.speed>0){
        this.speed-=this.friction;
    }
    if(this.speed<0){
        this.speed+=this.friction;
    }
    //to avoid slight movments
    if(Math.abs(this.speed)<this.friction){
        this.speed=0;
    }
   
    if(this.speed!=0){
        const flip=this.speed>0?1:-1;//ensures back movement in natural
    if(this.controls.left){
        this.angle+=0.03*flip;
    }
    if(this.controls.right){
        this.angle-=0.03*flip;
    }

 
    this.x-=Math.sin(this.angle)*this.speed;
    this.y-=Math.cos(this.angle)*this.speed;
    //y increases downwards on comp hence -=
    this.y-=this.speed;
  }
    }
   

   
    //method draw, takes context as param
    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);//where we want rotation to be centerd at
        ctx.rotate(-this.angle);
        ctx.beginPath(); //start path
        ctx.rect(
            - this.width/2, //ensures x is in center of car
            - this.height/2,//same logic for y
            this.width,
            this.height
            );
            ctx.fill(); //fill in

            ctx.restore(); //NOT SURE???

            this.sensor.draw(ctx);
    }
 }

