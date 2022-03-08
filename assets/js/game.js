var playerName = window.prompt("What is your robot's name?");
var playerHealth= 100;
var playerAttack= 10;
var playerMoney= 10;

// You can also log multiple values at once like this
console.log(playerName, playerHealth, playerAttack);

var enemyName= "Roberto";
var enemyHealth= 50;
var enemyAttack= 12;

console.log(enemyName, enemyHealth, enemyAttack);

var fight= function() {
    //Alert player sthat they are starting the round
    window.alert( "Welcome to Robot Gladiators!");
    
    var promptFight= window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);
    
    //if player choose to fight, then fight
    if (promptFight ==="fight" || promptFight === "FIGHT") {
        //remove enemy's health by subtracting the amt set in playerAttack
        enemyHealth= enemyHealth- playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");}
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left!");}
        

        // remove player's health by subtracting the amt set in enemy attack
        playerHealth= playerHealth - enemyAttack;
        console.log( enemyName + " has attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        //check player's health
        if (playerName <= 0) {
            window.alert (playerName + " has died!");}
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");}
    }
    // if player choses to skip
    else if (promptFight === "skip" || promptFight ==="SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        //if yes (true) leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney= playerMoney - 2;
        }
        //if no (false), ask question again by running fight() again
        else {
            fight();
        }
    }

}
fight ();