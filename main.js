function createPlayer() 
{
	var adventurers = [
		{playerName: "Warrior", health: 30, arrayOfPrizes: new Array, runChallenge: function() {var damage; while (true) {damage = getRandomNumber(15); if (damage >= 9) { break;} } return damage;}},
		{playerName: "Archer", health: 25, arrayOfPrizes: new Array, runChallenge: function() {var damage; while (true) {damage = getRandomNumber(12); if (damage >= 7) { break;} } return damage;}},
		{playerName: "Wizard", health: 20, arrayOfPrizes: new Array, runChallenge: function() {var damage; while (true) {damage = getRandomNumber(11); if (damage >= 5) { break;} } return damage;}}
	];
	
	var player = adventurers[getRandomNumber(adventurers.length)];
	
	return player;
}

function createGame()
{
	var gameBoard = [
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
	];
	
	var challenges = [
		{monsterName: "Vampire", health: 20, runChallenge: function() {var damage; while (true) { damage = getRandomNumber(10); if (damage >= 5) { break;} } return damage;}},
		{monsterName: "Werewolf", health: 19, runChallenge: function() {var damage; while (true) { damage = getRandomNumber(15); if (damage >= 7) { break;} } return damage;}},
		{monsterName: "Ghost", health: 18, runChallenge: function() {var damage; while (true) { damage = getRandomNumber(11); if (damage >= 5) { break;} } return damage;}}
	];
	
	var obstacles = [
		{obstacleName: "Stone Wall"},
		{obstacleName: "River"},
		{obstacleName: "Sticky Mud"}
	];
	
	var prizes = [
		{objectName: "Health Potion", effect: function() {return 15;}},
		{objectName: "Super Health Potion", effect: function() {return 20;}}
	];
	
	gameBoard[getRandomNumber(8)][getRandomNumber(8)] = "S";
	
	while (true) {
		var row = getRandomNumber(8);
		var column = getRandomNumber(8);
		
		if (gameBoard[row][column] == undefined) {
			gameBoard[row][column] = "G";
			break;
		}
	}
	
	var numberOfChallenges;
	while (true) {
		numberOfChallenges = getRandomNumber(5);
		
		if (numberOfChallenges >= 3) {
			break;
		}
	}
	
	for (var i = 1; i <= numberOfChallenges; i++) {
		while (true) {
			var row = getRandomNumber(8);
			var column = getRandomNumber(8);
			
			if (gameBoard[row][column] == undefined) {
				gameBoard[row][column] = challenges[getRandomNumber(challenges.length)];
				break;
			}
		}
	}
	
	var numberOfWalls;
	while (true) {
		numberOfWalls = getRandomNumber(5);
		
		if (numberOfWalls >= 2) {
			break;
		}
	}
	
	for (var i = 1; i <= numberOfWalls; i++) {
		while (true) {
			var row = getRandomNumber(8);
			var column = getRandomNumber(8);
			
			if (gameBoard[row][column] == undefined) {
				gameBoard[row][column] = obstacles[getRandomNumber(obstacles.length)];
				break;
			}
		}
	}
	
	for (var i = 1; i <= 2; i++) {
		while (true) {
			var row = getRandomNumber(8);
			var column = getRandomNumber(8);
			
			if (gameBoard[row][column] == undefined) {
				gameBoard[row][column] = prizes[getRandomNumber(prizes.length)];
				break;
			}
		}
	}
	
	return gameBoard;
}

function getRandomNumber(number) 
{ 
	return Math.floor((Math.random() * number));
}

function getStartingPoint(gameBoard)
{
	var coordinates = {};
	
	for (var i = 0; i < gameBoard.length; i++) {
		for (var j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j] == "S") {
				coordinates["x"] = i;
				coordinates["y"] = j;
			}
		}
	}
	
	return coordinates;
}

function getStatusOnGoal(gameBoard)
{
	for (var i = 0; i < gameBoard.length; i++) {
		for (var j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j] == "G") {
				return true;
			}
		}
	}
	
	return false;
}

function getStateOfGame()
{
	if (foundGoal == true && player.arrayOfPrizes.length == 2) {
		document.getElementById("gameState").innerHTML = "You beat the game!";
	}
	else if (foundGoal == true && player.arrayOfPrizes.length != 2){
		document.getElementById("gameState").innerHTML = "You found the goal but not all of the prizes yet.";
	}
	else if (foundGoal == false && player.arrayOfPrizes.length == 2){
		document.getElementById("gameState").innerHTML = "You found all of the prizes but not the goal yet.";
	}
}

function validateOutOfBounds(playerCoordinates, gameBoard)
{
	if (playerCoordinates["x"] < 0 || playerCoordinates["x"] > 7 || playerCoordinates["y"] < 0 || playerCoordinates["y"] > 7) {
		return true;
	}
	else {
		return false;
	}
}

function validateChallenge(playerCoordinates, gameBoard)
{
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]] != undefined && gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].hasOwnProperty("monsterName")) {
		return true;
	}
	else {
		return false;
	}
}

function validatePrize(playerCoordinates, gameBoard)
{
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]] != undefined && gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].hasOwnProperty("objectName")) {
		return true;
	}
	else {
		return false;
	}
}

function validateWall(playerCoordinates, gameBoard)
{
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]] != undefined && gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].hasOwnProperty("obstacleName")) {
		return true;
	}
	else {
		return false;
	}
}

function validatePreviousMove(oldPlayerCoordinates)
{
	if (oldPlayerCoordinates["x"] == startingPoint["x"] && oldPlayerCoordinates["y"] == startingPoint["y"]) {
		displayBoard[oldPlayerCoordinates["x"]][oldPlayerCoordinates["y"]] = "START"
	}
	else if (oldPlayerCoordinates["x"] == endPoint["x"] && oldPlayerCoordinates["y"] == endPoint["y"]) {
		displayBoard[oldPlayerCoordinates["x"]][oldPlayerCoordinates["y"]] = "<img src=\"goal.png\" alt=\"Goal\" height=\"50\" width=\"50\">";
	}
	else {
		displayBoard[oldPlayerCoordinates["x"]][oldPlayerCoordinates["y"]] = "X"
	}
}

function getPrize(oldPlayerCoordinates)
{
	player.health += gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].effect();
	gameLog += "You found a " + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].objectName + ". Your HP is now "+player.health+".<br/>";
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].objectName == "Health Potion") {
		player.arrayOfPrizes.push("<img src=\"hppotion1.png\" alt=\"Health Potion\" height=\"25\" width=\"25\">");
	}
	else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].objectName == "Super Health Potion") {
		player.arrayOfPrizes.push("<img src=\"hppotion2.jpg\" alt=\"Super Health Potion\" height=\"25\" width=\"25\">");
	}
	gameBoard[playerCoordinates["x"]][playerCoordinates["y"]] = undefined;
	displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"player.gif\" alt=\"Player\" height=\"50\" width=\"50\">";
	validatePreviousMove(oldPlayerCoordinates);
}

function initiateBattle(playerCoordinates, oldPlayerCoordinates)
{
	gameLog += gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName + " appears in front of you!<br/>";
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Vampire") {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"vampire.png\" alt=\"Vampire\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
	}
	else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Werewolf") {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"werewolf.png\" alt=\"Werewolf\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
	}
	else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Ghost") {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"ghost.png\" alt=\"Ghost\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
	}
	
	var playerDamage = player.runChallenge();
	gameLog += "You did " + playerDamage + " damage to the " + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName + ".<br/>";
	gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health -= playerDamage;
	
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Vampire") {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"vampire.png\" alt=\"Vampire\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
	}
	else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Werewolf") {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"werewolf.png\" alt=\"Werewolf\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
	}
	else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Ghost") {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"ghost.png\" alt=\"Ghost\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
	}
	
	if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health <= 0) {
		gameLog += gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName + " is dead.<br/>";
		gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health = 0;
		
		if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Vampire") {
			displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"vampire.png\" alt=\"Vampire\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
		}
		else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Werewolf") {
			displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"werewolf.png\" alt=\"Werewolf\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
		}
		else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName == "Ghost") {
			displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"ghost.png\" alt=\"Ghost\" height=\"50\" width=\"50\">" + "<br/>" + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].health + " HP<br/>";
		}
		
		gameBoard[playerCoordinates["x"]][playerCoordinates["y"]] = undefined;
	}
	else {
		var monsterDamage = gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].runChallenge();
		gameLog += gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].monsterName + " attacks you for " + monsterDamage + " damage.<br/>";
		player.health -= monsterDamage;
		if (player.health <= 0) {
			gameLog += "You died.<br/>";
			displayBoard[oldPlayerCoordinates["x"]][oldPlayerCoordinates["y"]] = "<img src=\"grave.png\" alt=\"Dead Player\" height=\"50\" width=\"50\">";
		}
	}
}

function createTable()
{
	$("div").append(("<div id = \"2\"><table align = \"center\" cellpadding = \"5\">"));
	    
	for(var i =0; i < gameBoard.length; i++) {
		$("#gameBoard").append($("<tr>"));
	    for(var j = 0; j < gameBoard[0].length; j++) {
	    	$("#gameBoard").append($("<td align = \"center\" id = \""+i+""+j+"\"></td>"));
	    }
	    $("#gameBoard").append($("</tr>"));
	}
    $("#gameBoard").append($("</table></div>"));
    $("#"+playerCoordinates["x"]+""+playerCoordinates["y"]+"").html(displayBoard[playerCoordinates["x"]][playerCoordinates["y"]]);
}

function displayTable()
{
    for(var i = 0; i < displayBoard.length; i++){
        for(var j = 0; j < displayBoard[0].length; j++){
    	    $("#"+i+""+j+"").html(displayBoard[i][j]);
        }
    }
}

var gameBoard = createGame();

var displayBoard = [new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8),new Array(8)];

var startingPoint = getStartingPoint(gameBoard);

var endPoint = {};

var foundGoal = false;

var player = createPlayer();

var playerCoordinates = {};

var gameLog = "";

playerCoordinates["x"] = startingPoint["x"];
playerCoordinates["y"] = startingPoint["y"];

displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"player.gif\" alt=\"Player\" height=\"50\" width=\"50\">";

document.getElementById("playerHealth").innerHTML = "<img src=\"health.png\" alt=\"Health\" height=\"50\" width=\"50\">" + player.health;
document.getElementById("playerCoordinates").innerHTML = "Location: " + (playerCoordinates["x"] + 1) + "," + (playerCoordinates["y"] + 1);
document.getElementById("prizes").innerHTML = "Prizes: " + player.arrayOfPrizes[0] + "," + player.arrayOfPrizes[1];

function validateChoice(choice) {
	if (player.health <= 0) {
		document.writeln("You died. Thanks for playing the game. Refresh the page if you want to play a new game.");
	}
	var oldPlayerCoordinates = {};
	oldPlayerCoordinates["x"] = playerCoordinates["x"];
	oldPlayerCoordinates["y"] = playerCoordinates["y"];
	
	if (choice.toLowerCase() == "up") {
		playerCoordinates["x"] = playerCoordinates["x"] - 1;
	}
	else if (choice.toLowerCase() == "down") {
		playerCoordinates["x"] = playerCoordinates["x"] + 1;
	}
	else if (choice.toLowerCase() == "left") {
		playerCoordinates["y"] = playerCoordinates["y"] - 1;
	}
	else if (choice.toLowerCase() == "right") {
		playerCoordinates["y"] = playerCoordinates["y"] + 1;
	}
		
	if (validateOutOfBounds(playerCoordinates, gameBoard)) {
		playerCoordinates["x"] = oldPlayerCoordinates["x"];
		playerCoordinates["y"] = oldPlayerCoordinates["y"];
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"player.gif\" alt=\"Player\" height=\"50\" width=\"50\">";
	}
	else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]] == "G") {
		gameLog += "You found the goal!<br/>";
		foundGoal = true;
		endPoint["x"] = playerCoordinates["x"];
		endPoint["y"] = playerCoordinates["y"];
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"player.gif\" alt=\"Player\" height=\"50\" width=\"50\">";
		validatePreviousMove(oldPlayerCoordinates);
	}
	else if (!validateOutOfBounds(playerCoordinates, gameBoard) && !validateChallenge(playerCoordinates, gameBoard) && !validateWall(playerCoordinates, gameBoard) && !validatePrize(playerCoordinates, gameBoard)) {
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"player.gif\" alt=\"Player\" height=\"50\" width=\"50\">";
		validatePreviousMove(oldPlayerCoordinates);
	}
	else if (validateWall(playerCoordinates, gameBoard)) {
		gameLog += "You encountered " + gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].obstacleName + ". Try moving somewhere else.<br/>";
		if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].obstacleName == "River") {
			displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"river.jpg\" alt=\"River\" height=\"50\" width=\"50\">";
		}
		else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].obstacleName == "Sticky Mud") {
			displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"mud.png\" alt=\"Sticky Mud\" height=\"50\" width=\"50\">";
		}
		else if (gameBoard[playerCoordinates["x"]][playerCoordinates["y"]].obstacleName == "Stone Wall") {
			displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"stonewall.jpg\" alt=\"Stone Wall\" height=\"50\" width=\"50\">";
		}
		playerCoordinates["x"] = oldPlayerCoordinates["x"];
		playerCoordinates["y"] = oldPlayerCoordinates["y"];
	}
	else if (validatePrize(playerCoordinates, gameBoard)) {
		getPrize(oldPlayerCoordinates);
    }
	else if (validateChallenge(playerCoordinates, gameBoard)) {
		initiateBattle(playerCoordinates, oldPlayerCoordinates);
		playerCoordinates["x"] = oldPlayerCoordinates["x"];
		playerCoordinates["y"] = oldPlayerCoordinates["y"];
		displayBoard[playerCoordinates["x"]][playerCoordinates["y"]] = "<img src=\"player.gif\" alt=\"Player\" height=\"50\" width=\"50\">";
	}
	document.getElementById("playerHealth").innerHTML = "<img src=\"health.png\" alt=\"Health\" height=\"50\" width=\"50\">" + player.health;
	document.getElementById("playerCoordinates").innerHTML = "Location: " + (playerCoordinates["x"] + 1) + "," + (playerCoordinates["y"] + 1);
	document.getElementById("prizes").innerHTML = "Prizes: " + player.arrayOfPrizes[0] + "," + player.arrayOfPrizes[1];
	document.getElementById("gameLog").innerHTML = gameLog;
	getStateOfGame();
		
	displayTable();
}
	

