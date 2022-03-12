//Game functions
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() *(max - min + 1) + min);

    return value;
};
var fight= function(enemy) {
    
    // repeat and execute as long as the enemy-robot is alive
    while  (playerInfo.health > 0 && enemy.health > 0) {
        var promptFight= window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        // if player choses to skip
        if (promptFight === "skip" || promptFight ==="SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes (true) leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerInfo.money= Math.max(0, playerInfo.money- 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health= Math.max(0, enemy.health - damage);
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has  " + enemy.health + " remaining.");
        
        // check enemy's health
       
        if (enemy.health <= 0) {
             window.alert(enemy.name + " has died!");
                
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            //leave while () loop since enemy is dead
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health  +  " left!");
        }
        //generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
            
        // remove player's health by subtracting the amt set in enemy attack
        playerInfo.health= Math.max(0, playerInfo.health - damage);
        console.log( enemy.name + " has attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
    
        //check player's health
        if (playerInfo.health <= 0) {
            window.alert (playerInfo.name + " has died!");
            break;
        }
        else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");}           
    }
};

var startGame = function() {
    // reset player 
    playerInfo.reset();

    for(var i=0; i < enemyInfo.length; i++) {
        //lets player knows what round they are in
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round" + (i+1));
            
        
            //pick new enemy to fight based on the index of the enemy.name array
            var pickedEnemyObj = enemyInfo[i];

            //r.health before starting new fight
            pickedEnemyObj.health = randomNumber (40,60);

            //use debugger to pause
            //debugger;

            //pass the enemy.name variable's value into the fight function where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
        }
        // if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length -1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
            playerInfo.refillHealth();
            break;

        case "upgrade":
        case "UPGRADE":
           playerInfo.upgradeAttack();
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

var getPlayerName = function () {
    var name ="";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }


    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName (),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health +=20;
            this.money-=7;
        }    
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack +=6;
            this.money-=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};
// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.health, playerInfo.attack);
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber (10, 14)
    },
    {
        name: "Amy",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
startGame();