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
                <div id="op-name" class="bos"></div>
            </div>
            <div id="op-mp">
                <p id="op-mp-val"></p>
            </div>
        </div>
        <div id="op-cards-left">
            <div class="hand">
                <div id="op-cards-left-val" class="bos"></div>
            </div>
        </div>
    </div>

    <div id="arena">
        <div id="welcomeText">
            <div id="wtOp" class="wt bos"></div>
            <div id="wtSelf" class="wt mtl"></div>
        </div>
        <div id="board">
            <div id="op-cards"></div>
            <div id="self-cards"></div>
            <template id="card-template">
                <div class="player">
                    <div class="player-mp">
                        <p class="mp-text"></p>
                    </div>
                    <div class="player-desc"></div>
                    <div class="player-atk"></div>
                    <div class="player-hp">
                        <p class="hp-text"></p>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <div id="self">
        <div id="self-infos">
            <div id="self-hp">
                <p id="hp"></p>
            </div>    
            <div id="self-mp">
                <p id="mp"></p>
            </div>
            <div id="self-cards-left">
                <div id="cards-left" class="mtl"></div>
            </div>
        </div>
        <div id="self-deck"></div>
        <div id="game-infos">
            <button id="hero-power">Hero power</button>
            <button id="end-turn">End turn</button>
            <div id="time" class="mtl"></div>  
        </div>
    </div>
</body>
</html>