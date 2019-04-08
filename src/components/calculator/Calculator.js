
const calculator = {
    basicRERCalculator: function(weight){
        let basicRER = 0
        if(weight <= 5){
            basicRER = 129
        } else if(weight <= 10){
            basicRER = 215
        } else if(weight <= 15){
            basicRER = 295
        } else if(weight <= 20){
            basicRER = 366
        } else if(weight <= 25){
            basicRER = 433
        } else if(weight <= 30){
            basicRER = 496
        } else if(weight <= 35){
            basicRER = 557
        } else if(weight <= 40){
            basicRER = 615
        } else if(weight <= 45){
            basicRER = 672
        } else if(weight <= 50){
            basicRER = 727
        } else if(weight <= 55){
            basicRER = 781
        } else if(weight <= 60){
            basicRER = 834
        } else if(weight <= 65){
            basicRER = 886
        } else if(weight <= 70){
            basicRER = 936
        } else if(weight <= 75){
            basicRER = 986
        } else if(weight <= 80){
            basicRER = 1035
        } else if(weight <= 85){
            basicRER = 1083
        } else if(weight <= 90){
            basicRER = 1131
        } else if(weight <= 95){
            basicRER = 1177
        } else if(weight <= 100){
            basicRER = 1223
        } else if(weight <= 105){
            basicRER = 1269
        } else if(weight <= 110){
            basicRER = 1314
        } else if(weight <= 115){
            basicRER = 1359
        } else if(weight <= 120){
            basicRER = 1403
        } else if(weight <= 125){
            basicRER = 1446
        } else if(weight <= 130){
            basicRER = 1490
        } else if(weight <= 135){
            basicRER = 1532
        } else {
            basicRER = 1359
        }
        return basicRER
    },

    expandedRERCalculator: function(basicRER, active, neutered, age){
        let RER = basicRER
        let multiplier = 0
        if(age === "1"){
            multiplier = 3
        } else if(age === "2"){
            multiplier =2
        } else if(active){
            multiplier = 3.5
        } else if(!neutered){
            multiplier = 1.6
        } else if(neutered){
            multiplier = 1.8
        }
        return RER * multiplier
    }
}

export default calculator