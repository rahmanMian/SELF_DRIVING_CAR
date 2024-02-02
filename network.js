class NeuralNetwork{
    constructor(neuronCounts){
        this.levels=[];
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]   //input and outputs
            ));
        }
    }

    static feedForward(givenInputs, network){
        let outputs=Level.feedForward(
            givenInputs,network.levels[0]); //get for first level
            for(let i=1;i<network.levels.length;i++){  //for remaining levels
                outputs=Level.feedForward( 
                    outputs,network.levels[i]);    //output from prev lvl as input into new level
            }
            return outputs;
    }

    static mutate(network, amount=1){
        network.levels.forEach(level=> {
            for(let i=0;i<level.biases.length;i++){
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for(let i=0;i<level.weights.length;i++){
                for(let j=0;j<level.weights[i].length;j++){
                    level.weights[i][j]=lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        });
    }
}


class Level{//has input and output neurons
    constructor(inputCount, outputCount){
        this.inputs= new Array(inputCount); //in/out stored in arrays
        this.outputs= new Array(outputCount);
        this.biases= new Array(outputCount);//each output neuron has val it fires aka bias
        //we connect every input neuron to every output neuron
        this.weights=[];//each bias has weight to it
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        for(let i=0;i<level.inputs.length;i++){//inputs are vals from car sensors
            for(let j=0;j<level.outputs.length;j++){
                  level.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<level.biases.length;i++){
             level.biases[i]=Math.random()*2-1;
        }
    }
   
    //compute output with weights and biases from feedforward algo
    static feedForward(givenInputs,level){
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        for(let i=0;i<level.outputs.length;i++){
            let sum=0;
            for(let j =0;j<level.inputs.length;j++){
                 sum+=level.inputs[j]*level.weights[j][i];
            }
            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            }
        }
            return level.outputs;
    }
}
