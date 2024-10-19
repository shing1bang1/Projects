

//---------------My application title: "Powerball Lottery"-----------------------

/*
Description: This application simulates the process of playing the Powerball Lottery. 
It allows to feel the thrill of the lottery without spending money. Thus, anyone can test their luck without any risk.
The main goal of it is to show how almost impossible it is to win the Powerball Lottery
and let people play it without wasting money and without risking their lives (without risk to be left with nothing).
So, it solves the problem of spending too much money on lotteries.
*/




//Note: it is essential to install prompt (npm install prompt) to use this application

function lottery() {    //main function that simulates the lottery

    //getting input from the user by importing the module function
    const userInput = require("./userInput");     
    let info = userInput();
    console.log('');
    console.log("Your numbers: ", info[0].join(" "), " and ", info[1])
    //generating the lottery by importing the module function
    const randomLottery = require("./randomLottery");
    let flag = randomLottery(info);

    //if the user lost, printing the message
    if (flag) {
        console.log("\n\nYou have wasted $", info[2]*5);
        console.log("Thank you for playing!");
    }



}


const prompt = require('prompt-sync')({sigint: true});
console.log("\nHello! Welcome to Powerball Lottery!");
console.log("The winning numbers are made up of five numbers from a 69 matrix and one Powerball number from a 26 matrix, giving jackpot odds of 1 in 292,201,338 per play.");
console.log("Each powerball lottery ticket costs $5. The jackpot for this game is $2 billion!");

let n = 1;  //number of times played
let mainFlag = true;
while (mainFlag) {

    if (n === 1){
        var answer = prompt("\nDo you want to play? (yes/no) "); 
    } else {
        var answer = prompt("\nDo you want to play again? (yes/no) ");
    }
    
    //switch statement to check if the user wants to play
    switch (answer.toLowerCase()) {
        case "yes":
            lottery();
            n +=1 ;
            break;
        case "no":
            console.log("\nGoodbye! Come play later!");
            mainFlag = false;
            break;
        default:
            console.log("There is no option like this. Try again.")
    }
}


