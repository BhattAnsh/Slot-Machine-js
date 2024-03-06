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
    if(bal<=0){
        console.log("You don't have enough balance to place the bet")
    }
    else{
        console.log("Your current Balance = "+bal);
        console.log("Number of line on which you placed bet = "+nof);
        while(true){
            const minAmount = 1*nof;
            const bet = prompt("Enter the bet amount you want to place: ");
            const convertedBet = parseFloat(bet);
    
            if(isNaN(convertedBet) || convertedBet<=bal || convertedBet != 0 || convertedBet > 0){
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
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != (rows.length - 1)) { // Corrected from rows.lenght to rows.length
                rowString += ' | ';
            }
        }
        console.log(rowString);
    }
};

const transpose = (reels) => {
    let result = [];
    for (let i = 0; i < 3; i++) {
        let o2 = [];
        for (let j in reels) {
            o2.push(reels[j][i]);
        };
        result.push(o2)
    };
    printRows(result);
};


const spin = () =>{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reel = []
    for(let i = 0; i < COLS; i++){
        reel.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reel[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    let result = transpose(reel);
    console.log(result);
};  

const getWinnings = (rows, bet, lines) =>{
    let winning = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        
        for(const symbol of symbols){
            if(symbol != symbol[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winning += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winning;
}

const game = () => {
    let balance  = deposite();
    while (true){
        console.log("You have a balance of $" + balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        console.log("You won, $" + winnings.toString());

        if (balance <= 0){
            console.log('!You ran out of money!');
            break;
        };

        const playAgain = prompt("Do you want to play again (y/n)?: ");
        if (playAgain != 'y' || playAgain != "Y"){
            break;
        }
    }
};

game();

