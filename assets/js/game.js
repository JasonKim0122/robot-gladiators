//Game functions
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() *(max - min + 1) + min);

    return value;
};

var playerName = window.prompt("What is your robot's name?");
var playerHealth= 100;
var playerAttack= 10;
var playerMoney= 10;

// You can also log multiple values at once like this
console.log(playerName, playerHealth, playerAttack);

var enemyNames= ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth= 50;
var enemyAttack= 12;
console.log(enemyNames.length);

var fight= function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight= window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        // if player choses to skip
        if (promptFight === "skip" || promptFight ==="SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes (true) leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney= Math.max(0, playerMoney- 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth= Math.max(0, enemyHealth-playerAttack);
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        
        // check enemy's health
        if (enemyHealth <= 0) {
             window.alert(enemyName + " has died!");
                
            //award player money for winning
            playerMoney = playerMoney + 20;
            //leave while () loop since enemy is dead
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left!");}
        //generate random damage value based on enemy's attack power
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
            
        // remove player's health by subtracting the amt set in enemy attack
        playerHealth= Math.max(0, playerHealth-enemyAttack);
        console.log( enemyName + " has attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
    
        //check player's health
        if (playerHealth <= 0) {
            window.alert (playerName + " has died!");
            break;
        }
        else {
        window.alert(playerName + " still has " + playerHealth + " health left.");}           
    }
};

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i=0; i < enemyNames.length; i++) {
        //lets player knows what round they are in
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round" + (i+1));
        
            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName= enemyNames [i];

            //reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);

            //use debugger to pause
            //debugger;

            //pass the pickedEnemyName variable's value into the fight function where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        }
        // if we're not at the last enemy in the array
        if (playerHealth > 0 && i < enemyNames.length -1) {
            //ask player if they want to use the store before the next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            
            //if yes, take them to the store() function
            if (storeConfirm) {
                shop();
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

  
  //after the loop ends, player is either out of health or enemies to fight, so run endGame function
  endGame();  
  console.log()
};

//function to end the entire game
var endGame= function() {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //ask the player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}; 

var shop = function() {
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice. "
    );
    //use switch to carry out option
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            if(playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");

            //increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You do not have enough money!");
            }
            break;

        case "upgrade":
        case "UPGRADE":
            if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            //increase attack and decreasing money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney -7; 
            }
            else {
                window.alert("You do not have enough money!");
            }
            break;

        case "leave":
        case "LEAVE":
            window.alert("Leaving the store");

            //do nothing so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again");
            //call shop again to force player to pick a option
            shop();
            break;
    }
};

startGame();