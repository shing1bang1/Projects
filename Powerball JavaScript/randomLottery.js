/*
Function that randomly generates winning lottery numbers and compares them to the numbers entered by the user. 
It returns whether the user lost or won ('true' if lost, 'false' if won).
*/

function randomLottery(info) {
    let flag = true   //the variable that changes if the user wins the lottery
    
    const allNum = Array.from({length: 69}, (_,i) => i + 1);


    //loop for generating lottery as many times as the user wants to play
    for (let i = 0; i < info[2]; i++) {
        //randomly generating winning numbers
        allNum.sort(() => 0.5 - Math.random());
        let winningNum = allNum.slice(0, 5);
        let winningPowerball = Math.floor(Math.random() * 26) + 1;
        console.log('The winning numbers are: ', winningNum.join(' ') + ' and ' + winningPowerball);

        //comparing winning numbers to the numbers entered by the user
        if ((new Set(info[0])) === new Set(winningNum) && (winningPowerball === info[1])) {
            console.log("\nYou have won the Powerball Lottery! Congratulations!!! You are a billionaire!");
            console.log("Thank you for playing!");
            flag = false;
            break;
        } else {
            console.log('You lost.');
        }
    }
    return flag
}


//exporting the module
module.exports = randomLottery;