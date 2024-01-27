class Controls{
    constructor(){
        //checks if moving in that direction
        this.forward= false;
        this.left= false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners(); //add keyboard movements in
    }
    
    //# is private method
    //for movement, press key case becomes true
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true; 
                    break;
            
                case "ArrowRight":
                     this.right=true;
                     break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
        }
    };

    //leave key, case will become false
    document.onkeyup=(event)=>{
        switch(event.key){
            case "ArrowLeft":
                this.left=false; 
                break;
        
            case "ArrowRight":
                 this.right=false;
                 break;
            case "ArrowDown":
                this.reverse = false;
                break;
            case "ArrowUp":
                this.forward = false;
                break;
    }
};
}
}