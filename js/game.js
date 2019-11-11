let hand = [];
let firstRequest = true;
let templateCard;
let quitPrompt;
let promptVisible = false;
let selectedCard = null;
let yourTurn = false;
let gameOn = true;


window.addEventListener("load", () => {
    
    //main container
    $container = $('#container');

    //div to communicate with user
    quitPrompt = document.getElementById("quit-prompt").innerHTML;

    //opponents variables
    $oph1 = $('#op-hand1');
    $oph2 = $('#op-hand2');
    $oph3 = $('#op-hand3');
    $oph4 = $('#op-hand4');
    $oph5 = $('#op-hand5');
    $oph6 = $('#op-hand6');
    $oph7 = $('#op-hand7');

    $opHp = $('#op-hp-val');
    $opName = $('#op-name');
    $opClass = $('#op-class');
    $opMp = $('#op-mp-val');

    $opCardsLeft = $('#op-cards-left-val');

    hand.push($oph1);
    hand.push($oph2);
    hand.push($oph3);
    hand.push($oph4);
    hand.push($oph5);
    hand.push($oph6);
    hand.push($oph7);

    //fight area variables
    $wtOp = $('#wtOp');
    $wtSelf = $('#wtSelf');
    $wtContainer = $('#welcomeText');

    $board = $('#board');
    $opCards = $('#op-cards');
    $selfCards = $('#self-cards');

    templateCard = document.querySelector("#card-template").innerHTML;


    //self variables
    $hp = $('#hp');
    $mp = $('#mp');
    $cardsLeft = $('#cards-left');

    $time = $('#time');
    
    //buttons
    document.getElementById("hero-power").onclick = () => {
        
        if(yourTurn){
            $.ajax({
                url: "ajax-game.php",
                type: "POST",
                data: {
                    type: "HERO_POWER"
                }
            }).done( msg => {
                let rep = JSON.parse(msg);

                promptPlayer(rep);
    
            });
        }
    }

    document.getElementById("end-turn").onclick = () => {
    
        if(yourTurn){
            $.ajax({
                url: "ajax-game.php",
                type: "POST",
                data: {
                    type: "END_TURN"
                }
            }).done( msg => {
                let rep = JSON.parse(msg);

                promptPlayer(rep);
    
            })
        }
    }

    setTimeout(state, 1000);
});

// STATE ==================================================================================================================================

const state = () => {

    $.ajax({
        url : "ajax-state.php",
        type : "POST"
    }).done( msg => {
        let reponse = JSON.parse(msg);
        
        if(promptPlayer(reponse)){

            if(promptVisible){
                $('#user-prompt').slideUp();
                promptVisible = false;
            }

            yourTurn = reponse.yourTurn;
            
            if(firstRequest){
                
                $container.show();
                $('#user-prompt').hide();
                $('#user-prompt').css("background", "black");

                $opName.text(reponse.opponent.username);

                if(reponse.opponent.heroClass == "Hunter"){
                    $opClass.css("background-image", "url(images/classes/hunter.png)");
                }
                if(reponse.opponent.heroClass == "Priest"){
                    $opClass.css("background-image", "url(images/classes/priest.png)");
                }
                if(reponse.opponent.heroClass == "Warlock"){
                    $opClass.css("background-image", "url(images/classes/warlock.png)");
                }
                if(reponse.opponent.heroClass == "Rogue"){
                    $opClass.css("background-image", "url(images/classes/rogue.png)");
                }
                if(reponse.opponent.heroClass == "Warrior"){
                    $opClass.css("background-image", "url(images/classes/warrior.png)");
                }

                $wtOp.text(reponse.opponent.welcomeText);
                $wtSelf.text(reponse.welcomeText);

                $wtContainer.fadeOut(5000, () => {
                    $board.fadeIn(1000);
                    $board.css("display", "grid");
                });

                firstRequest = false;
            }
            
            //opponent's section =========================================================================
            let i = 1;
            hand.forEach( card => {
                if(i<=reponse.opponent.handSize){
                    card.show();
                }
                else{
                    card.hide();
                }
                i++;
            });
            $opHp.text(reponse.opponent.hp);
            $opMp.text(reponse.opponent.mp);
            $opCardsLeft.text(reponse.opponent.remainingCardsCount);
            //game section ==============================================================================
            //opponent's card in board
            let opBoard = reponse.opponent.board;
            document.getElementById("op-cards").innerHTML = "";
            for(let i = 0; i < opBoard.length; i++){
                let taunt = false
                let newCard = document.createElement("div");
                newCard.innerHTML = templateCard;
                newCard.querySelector(".mp-text").innerHTML = opBoard[i].cost;
                newCard.querySelector(".player-desc").innerHTML = "";
                for(let j = 0; j < opBoard[i].mechanics.length; j++){
                    newCard.querySelector(".player-desc").innerHTML += opBoard[i].mechanics[j]  + " ";
                    if(opBoard[i].mechanics[j] == "Taunt"){
                        taunt = true;
                    }
                }
                newCard.querySelector(".player-atk").innerHTML = opBoard[i].atk;
                newCard.querySelector(".hp-text").innerHTML = opBoard[i].hp;
                newCard.id = opBoard[i].uid;
                if(!taunt){
                    newCard.classList.add("card-on-board");
                }
                else{
                    newCard.classList.add("taunt-card");
                }
                newCard.classList.add("op-card");
                newCard.style.backgroundImage = "url(images/cards/opp/" + opBoard[i].id + ".png)";
                document.getElementById("op-cards").appendChild(newCard);
            }
            //self cards on board
            let selfBoard = reponse.board;
            document.getElementById("self-cards").innerHTML = "";
            for(let i = 0; i < selfBoard.length; i++){
                let newCard = document.createElement("div");
                newCard.innerHTML = templateCard;
                newCard.querySelector(".mp-text").innerHTML = selfBoard[i].cost;
                newCard.querySelector(".player-desc").innerHTML = "";
                for(let j = 0; j < selfBoard[i].mechanics.length; j++){
                    newCard.querySelector(".player-desc").innerHTML += selfBoard[i].mechanics[j]  + " ";
                }
                newCard.querySelector(".player-atk").innerHTML = selfBoard[i].atk;
                newCard.querySelector(".hp-text").innerHTML = selfBoard[i].hp;
                newCard.setAttribute("state", selfBoard[i].state);
                newCard.id = selfBoard[i].uid;
                newCard.classList.add("card-on-board");
                newCard.classList.add("self-card");
                newCard.style.backgroundImage = "url(images/cards/self/" + selfBoard[i].id + ".png)";
                if(selfBoard[i].state == "SLEEP" || yourTurn == false){
                    newCard.classList.add("sleep");
                }
                document.getElementById("self-cards").appendChild(newCard);
            }
            //self section ======================================================================
            $hp.text(reponse.hp);
            $mp.text(reponse.mp);
            $cardsLeft.text(reponse.remainingCardsCount);
            //deck
            let selfDeck = reponse.hand;
            document.getElementById("self-deck").innerHTML = "";
            for(let i = 0; i < selfDeck.length; i++){
                let newCard = document.createElement("div");
                newCard.innerHTML = templateCard;
                newCard.querySelector(".mp-text").innerHTML = selfDeck[i].cost;
                newCard.querySelector(".player-desc").innerHTML = "";
                for(let j = 0; j < selfDeck[i].mechanics.length; j++){
                    newCard.querySelector(".player-desc").innerHTML += selfDeck[i].mechanics[j] + " ";
                }
                newCard.querySelector(".player-atk").innerHTML = selfDeck[i].atk;
                newCard.querySelector(".hp-text").innerHTML = selfDeck[i].hp;
                newCard.id = selfDeck[i].uid;
                newCard.classList.add("card-on-deck");
                if(yourTurn == false || reponse.mp < selfDeck[i].cost){
                    newCard.classList.add("sleep");
                }
                newCard.style.backgroundImage = "url(images/cards/self/" + selfDeck[i].id + ".png)";
                document.getElementById("self-deck").appendChild(newCard);
            }
            $time.text("Time left: " + reponse.remainingTurnTime);      
            

            if(yourTurn){
                document.getElementById("opponent").className = "bosOff";
                document.getElementById("self").className = "mtlOn";
                setButtons();
            }
            else{
                document.getElementById("opponent").className = "bosOn";
                document.getElementById("self").className = "mtlOff";
            }
        }
        if(gameOn){
            setTimeout(state, 1000);
        }

    })

}

//This function will be called at the end of every call of state
const setButtons = () =>{

    let deck = document.getElementById("self-deck").children;
    for(let i = 0; i < deck.length; i++){
        deck[i].onclick = () => {
            
            $.ajax({
                url: "ajax-game.php",
                type: "POST",
                data: {
                    type: "PLAY",
                    uid: deck[i].id
                }
            }).done( msg => {
                let rep = JSON.parse(msg);

                promptPlayer(rep);
                
            })
        };
    }

    let board = document.getElementById("self-cards").children;
    for(let i = 0; i < board.length; i++){
        board[i].onclick = () => {
        
            if(board[i].getAttribute("state") == "IDLE"){
                selectedCard = board[i];
            }
            else{
                promptPlayer("CARD_IS_SLEEPING");
            }
        }
    }

    let opBoard = document.getElementById("op-cards").children;
    for(let i = 0; i < opBoard.length; i++){
        opBoard[i].onclick = () => {

            if(selectedCard != null){

                $.ajax({
                    url: "ajax-game.php",
                    type: "POST",
                    data: {
                        type: "ATTACK",
                        uid: selectedCard.id,
                        targetuid: opBoard[i].id
                    }
                }).done( msg => {
                    let rep = JSON.parse(msg);
                    
                    promptPlayer(rep);

                    selectedCard = null;
                    
                })
            }
        }
    }

    document.getElementById("op-class").onclick = () => {
        if(selectedCard != null){
            $.ajax({
                url: "ajax-game.php",
                type: "POST",
                data: {
                    type: "ATTACK",
                    uid: selectedCard.id
                }
            }).done( msg => {
                let rep = JSON.parse(msg);

                promptPlayer(rep);

                selectedCard = null;
            })
        }
    }

}


const promptPlayer = rep => {

    let temp = true;
    let prompt = document.querySelector("#user-prompt");
    if(!gameOn){
        prompt.innerHTML = "";
    }

    if(rep == "INVALID_KEY"){
        promptVisible = false;
        $container.hide();
        prompt.className = "quit";
        prompt.style.display = "block";
        prompt.style.height = "100px";
        prompt.style.color = "darkorange";
        prompt.innerHTML = quitPrompt;
        prompt.querySelector(".prompt-text").innerHTML = "API Error: Invalid key.";
        prompt.querySelector(".prompt-quit").style.marginTop = "30px";
        prompt.querySelector(".prompt-quit").onclick = () => {
            window.location.href = "index.php";
        }

        gameOn = false;
        temp = false;
    }
    if(rep == "WAITING"){
        promptVisible = false;
        $container.hide();
        prompt.style.display = "block";
        prompt.innerHTML = quitPrompt;
        prompt.querySelector(".prompt-text").innerHTML = "Waiting for another player...";
        prompt.className = "quit";
        prompt.style.backgroundImage = "url(images/gifs/wait.gif)";
        prompt.style.backgroundSize = "cover";
        prompt.style.backgroundRepeat = "no-repeat";

        prompt.querySelector(".prompt-quit").onclick = () => {
            window.location.href = "home.php";
        }

        temp = false;
    }
    if(rep == "LAST_GAME_WON"){
        promptVisible = false;
        let winDance = document.createElement("div");
        winDance.className = "winDance";
        document.querySelector("body").appendChild(winDance);
        prompt.style.display = "block";
        prompt.innerHTML += quitPrompt;
        prompt.querySelector(".prompt-text").innerHTML = "Victory!";
        prompt.className = "quit";
        prompt.style.backgroundImage = "url(images/gifs/win" + (Math.floor(Math.random() * 3) + 1) + ".gif)"; 
        prompt.style.backgroundSize = "cover";
        prompt.style.backgroundRepeat = "no-repeat";

        prompt.querySelector(".prompt-quit").onclick = () => {
            window.location.href = "home.php";
        }

        gameOn = false;
        temp = false;
    }
    if(rep == "LAST_GAME_LOST"){
        promptVisible = false;
        prompt.style.display = "block";
        prompt.innerHTML = quitPrompt;
        prompt.querySelector(".prompt-text").innerHTML = "It's like you didn't even tried...";
        prompt.className = "quit";
        prompt.style.backgroundImage = "url(images/gifs/lost" + (Math.floor(Math.random() * 3) + 1) + ".gif)";
        prompt.style.backgroundSize = "cover";
        prompt.style.backgroundRepeat = "no-repeat";
        
        prompt.querySelector(".prompt-quit").onclick = () => {
            window.location.href = "home.php";
        }

        gameOn = false;
        temp = false;
    }
    if(rep == "INVALID_ACTION"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "Invalid action...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "ACTION_IS_NOT_AN_OBJECT"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "Internal problem with the API function call...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "NOT_ENOUGH_ENERGY"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "You can't afford this...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "BOARD_IS_FULL"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "Your board is full...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "CARD_NOT_IN_HAND"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "This card isn't in your hand...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "CARD_IS_SLEEPING"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "This card is sleeping...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "MUST_ATTACK_TAUNT_FIRST"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "You must attack the taunt cards first...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "OPPONENT_CARD_NOT_FOUND"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "The card you attacked isn't on the board...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "CARD_NOT_FOUND"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "The card you tried to play isn't on the board...";
        setTimeout( () => { promptVisible = true }, 2000);
    }
    if(rep == "ERROR_PROCESSING_ACTION"){
        promptVisible = false;
        $container.hide();
        prompt.className = "quit";
        prompt.style.display = "block";
        prompt.style.height = "100px";
        prompt.style.color = "darkorange";
        prompt.innerHTML = quitPrompt;
        prompt.querySelector(".prompt-text").innerHTML = "API Error: Error processing action.";
        prompt.querySelector(".prompt-quit").style.marginTop = "30px";
        prompt.querySelector(".prompt-quit").onclick = () => {
            window.location.href = "index.php";
        }
        temp = false;
    }
    if(rep == "INTERNAL_ACTION_ERROR"){
        promptVisible = false;
        $container.hide();
        prompt.className = "quit";
        prompt.style.display = "block";
        prompt.style.height = "100px";
        prompt.style.color = "darkorange";
        prompt.innerHTML = quitPrompt;
        prompt.querySelector(".prompt-text").innerHTML = "API Error: Internal action error.";
        prompt.querySelector(".prompt-quit").style.marginTop = "30px";
        prompt.querySelector(".prompt-quit").onclick = () => {
            window.location.href = "index.php";
        }
        temp = false;
    }
    if(rep == "HERO_POWER_ALREADY_USED"){
        prompt.style.display = "block";
        prompt.className = "message";
        prompt.innerHTML = "Hero power already used for this turn...";
        setTimeout( () => { promptVisible = true }, 2000);
    }

    return temp;
}