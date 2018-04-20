var Salary = function() {
    var colorsAngles = ['#ff0000', '#0066ff', '#9933ff', '#33cc33', '#663300'];
    var positions = [300, 125, 650, 125, 300, 367, 650, 367];
    
    this.creation = function() {
        
        createCanvas(960, 500);
        background(255);
        noStroke();
        noLoop();  // Run once and stop
        
        stroke('#000000');
        fill('#000000');
        textSize(20);
        text('2005', 275, 250);
        text('2009', 625, 250);
        text('2013', 275, 490);
        text('2017', 625, 490);
        text('Annual Earnings in London', 355, 16)
        textSize(14);
        text('North London', 430, 125);
        text('South London', 430, 200);
        text('East London', 435, 275);
        text('West London', 435, 350);
        text('Central London', 425, 425);
        fill('#ff0000');
        rect(457, 75, 30, 30);
        fill('#0066ff');
        rect(457, 150, 30, 30);
        fill('#9933ff')
        rect(457, 225, 30, 30);
        fill('#33cc33');
        rect(457, 300, 30, 30);
        fill('#663300');
        rect(457, 375, 30, 30);

        dataLen = salaryData.getColumn(0).length;
        x = 0;
        for (n = 1; n < dataLen; n++) {  
            builderT = 0;
            arrArc = [];
            radials = [];
            sAngle = 0;

            for (i = 0; i < dataLen; i++) {
                builderT += parseInt(salaryData.getColumn(n)[i]);
                arrArc.push(parseInt(salaryData.getColumn(n)[i]));
                console.log();
            }

            for (i = 0; i < dataLen; i++) {
                radials.push((parseInt(salaryData.getColumn(n)[i])/builderT)*(2*Math.PI));
            }

            for (i = 0; i < dataLen; i++) {
                fill(colorsAngles[i]);
                arc(positions[x], positions[x+1], 200, 200, sAngle, sAngle+radials[i]);
                sAngle += radials[i];
            }

            console.log(radials);
            console.log(arrArc);
            x += 2;
        }

    }
    
    this.erase = function() {
        $("svg").remove();
        $("canvas").remove();
    }
}

