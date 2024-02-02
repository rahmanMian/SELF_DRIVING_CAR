class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;//will cast rays
        this.rayLength=150;//sense range
        this.raySpread=Math.PI/2;//set at 45 degs
        this.rays=[];
        this.readings=[];//tells if border or not and how far

    }

    update(roadBorders, traffic){ //passed roadborders road->car>sensor
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(
                     this.rays[i],
                     roadBorders,
                     traffic)
            );
        }
    }
   
    #getReading(ray, roadBorders, traffic){//check where ray hits roadborder
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){
            const touch =getIntersection(
                ray[0], //x point 
                ray[1], //y point
                roadBorders[i][0], //ith roadborder start
                roadBorders[i][1]  //ith roadborder stop
            );
            if(touch){
                touches.push(touch);
            }
        }

        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j <poly.length;j++){
                const value = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]//%to make sure  no overflow
                );
                if(value){
                    touches.push(value);
                }
            }
        }
        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset);//returns new array with every offset of touch or distance from start to border touch
            const minOffset= Math.min(...offsets); //...spreads array in many indiv values
            return touches.find(e=>e.offset==minOffset);//return touch that has minoffset
            }
        }



    #castRays(){
        this.rays=[];
        for(let i = 0;i<this.rayCount;i++){
            const rayAngle=lerp(//roateed unit circle 0 top right pi/2
                this.raySpread/2,
                -this.raySpread/2,
             this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};//start of ray
            const end={                              //end of ray
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
                let end=this.rays[i][1];
                if(this.readings[i]){
                    end=this.readings[i];
                }
                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeStyle="yellow";
                ctx.moveTo(
                    this.rays[i][0].x,
                    this.rays[i][0].y
                );
                ctx.lineTo(
                    end.x,
                    end.y
                );
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeStyle="black";
                ctx.moveTo(
                    this.rays[i][1].x,
                    this.rays[i][1].y
                );
                ctx.lineTo(
                    end.x,
                    end.y
                );
                ctx.stroke();
            }
        } 
}
