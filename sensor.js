class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=2;//will cast rays
        this.rayLength=150;//sense range
        this.raySpread=Math.PI/2;//set at 45 degs
        this.rays=[];

    }

    update(){
        this.rays=[];
        for(let i = 0;i<this.rayCount;i++){
            const rayAngle=lerp(//roateed unit circle 0 top right pi/2
                this.raySpread/2,
                -this.raySpread/2,
             this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                   Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                   Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }


    }
        draw(ctx){
            for(let i = 0;i<this.rayCount;i++){
                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeStyle="yellow";
                ctx.moveTo(
                    this.rays[i][0].x,
                    this.rays[i][0].y
                );
                ctx.lineTo(
                    this.rays[i][1].x,
                    this.rays[i][1].y
                );
                ctx.stroke();
            }
        } 
}
