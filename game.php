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
        <div id="op-deck">

        </div>
        <div id="op-infos">

        </div>
        <div id="op-cards-left">
        
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
        
        </div>
        <div id="self-deck">

        </div>
        <div id="game-infos">
        
        </div>
    </div>
</body>
</html>