const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":4
}



const deposite = () =>{
        while(true){
            const depositeAmount = prompt("Enter you amount: ");
            const numberDepositeAmount = parseFloat(depositeAmount);
            if(isNaN(numberDepositeAmount) || numberDepositeAmount<= 0){
                console.log("failed");
            }
            else{
                return numberDepositeAmount;
            }
        };
};

const getNumberOfLines = () =>{
    while(true){        
        const numberOfLines = prompt("Enter number of lines you want to bet on: ");
        const convertedNumberOfLines = parseFloat(numberOfLines);
        if (isNaN(convertedNumberOfLines) || convertedNumberOfLines<=3 || convertedNumberOfLines >0){
            return convertedNumberOfLines;
        }
        else{
            console.log("you've entered the number of line out of range");
        }
    }
};

const getBet = (bal,nof) =>{
    if(balance<=0){
        console.log("You don't have enough balance to place the bet")
    }
    else{
        console.log("Your current Balance = "+bal);
        console.log("Number of line on which you placed bet = "+nof);
        while(true){
            const minAmount = 1*nof;
            const bet = prompt("Enter the bet amount you want to place: ");
            const convertedBet = parseFloat(bet);
    
            if(isNaN(convertedBet) || convertedBet<=balance || convertedBet != 0 || convertedBet > 0){
                if(convertedBet<minAmount){
                    console.log("Enter the minimum amount "+minAmount+" to place bet" );
                }
                else{
                    return convertedBet;
                };
            }
            else{
                console.log("Enter valid amount to place the bet")
            };
        };
    }
};

const spin = () =>{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reel = [[],[],[]]
    for(let i = 0; i < COLS; i++){
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            
        }
    }
};

let balance = deposite();
let numberOfLines = getNumberOfLines();
let bet = getBet(balance, numberOfLines);

