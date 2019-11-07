<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $action->execute();

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/game.css">
    <script src="js/jquery.js"></script>
    <script src="js/game.js"></script>
    <title>Hockey Battle - GAME</title>
</head>
<body>
    <div id="opponent">
        <div id="op-hand">
            <div class="hand" id="op-hand1"></div>
            <div class="hand" id="op-hand2"></div>
            <div class="hand" id="op-hand3"></div>
            <div class="hand" id="op-hand4"></div>
            <div class="hand" id="op-hand5"></div>
            <div class="hand" id="op-hand6"></div>
            <div class="hand" id="op-hand7"></div>
        </div>
        <div id="op-infos">
            <div id="op-hp">
                <p id="op-hp-val"></p>
            </div>
            <div id="op-class">
                <div id="op-name"></div>
            </div>
            <div id="op-mp">
                <p id="op-mp-val"></p>
            </div>
        </div>
        <div id="op-cards-left">
            <div class="hand">
                <div id="op-cards-left-val"></div>
            </div>
        </div>
    </div>

    <div id="arena">
        <div id="op-cards">
        
        </div>
        <div id="self-cards">
        
        </div>
    </div>

    <div id="self">
        <div id="self-infos">
            <div id="self-hp"></div>    
            <div id="self-mp"></div>
            <div id="self-cards-left"></div>
        </div>
        <div id="self-deck">

        </div>
        <div id="game-infos">
            <button id="hero-power"></button>
            <button id="end-turn"></button>
            <div id="time"></div>  
        </div>
    </div>
</body>
</html>