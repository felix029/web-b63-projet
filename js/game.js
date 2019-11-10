let hand = [];
let firstRequest = true;
let template;
let selectedCard = null;
let yourTurn = false;

window.addEventListener("load", () => {
    
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

    template = document.querySelector("#card-template").innerHTML;


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

        yourTurn = reponse.yourTurn;

        if(firstRequest){
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
        else{
            //opponent's section
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

            //game section
            //opponent's card in board
            let opBoard = reponse.opponent.board;
            document.getElementById("op-cards").innerHTML = "";

            for(let i = 0; i < opBoard.length; i++){
                let newCard = document.createElement("div");
                newCard.innerHTML = template;
                newCard.querySelector(".mp-text").innerHTML = opBoard[i].cost;
                newCard.querySelector(".player-desc").innerHTML = "";
                for(let j = 0; j < opBoard[i].mechanics.length; j++){
                    newCard.querySelector(".player-desc").innerHTML += opBoard[i].mechanics[j];
                }
                newCard.querySelector(".player-atk").innerHTML = opBoard[i].atk;
                newCard.querySelector(".hp-text").innerHTML = opBoard[i].hp;

                newCard.id = opBoard[i].uid;
                newCard.classList.add("card-on-board");
                newCard.classList.add("op-card");
                newCard.style.backgroundImage = "url(images/cards/opp/" + opBoard[i].id + ".png)";
                
                document.getElementById("op-cards").appendChild(newCard);
            }

            //self cards on board
            let selfBoard = reponse.board;
            document.getElementById("self-cards").innerHTML = "";

            for(let i = 0; i < selfBoard.length; i++){
                let newCard = document.createElement("div");
                newCard.innerHTML = template;
                newCard.querySelector(".mp-text").innerHTML = selfBoard[i].cost;
                newCard.querySelector(".player-desc").innerHTML = "";
                for(let j = 0; j < selfBoard[i].mechanics.length; j++){
                    newCard.querySelector(".player-desc").innerHTML += selfBoard[i].mechanics[j];
                }
                newCard.querySelector(".player-atk").innerHTML = selfBoard[i].atk;
                newCard.querySelector(".hp-text").innerHTML = selfBoard[i].hp;

                newCard.setAttribute("state", selfBoard[i].state);
                if(selfBoard[i].state == "SLEEP"){
                    newCard.classList.add("sleep");
                }

                newCard.id = selfBoard[i].uid;
                newCard.classList.add("card-on-board");
                newCard.classList.add("self-card");
                newCard.style.backgroundImage = "url(images/cards/self/" + selfBoard[i].id + ".png)";
                
                document.getElementById("self-cards").appendChild(newCard);
            }


            //self section
            $hp.text(reponse.hp);
            $mp.text(reponse.mp);
            $cardsLeft.text(reponse.remainingCardsCount);

            //deck
            let selfDeck = reponse.hand;
            document.getElementById("self-deck").innerHTML = "";
            for(let i = 0; i < selfDeck.length; i++){
                let newCard = document.createElement("div");
                newCard.innerHTML = template;
                newCard.querySelector(".mp-text").innerHTML = selfDeck[i].cost;
                newCard.querySelector(".player-desc").innerHTML = "";
                for(let j = 0; j < selfDeck[i].mechanics.length; j++){
                    newCard.querySelector(".player-desc").innerHTML += selfDeck[i].mechanics[j];
                }
                newCard.querySelector(".player-atk").innerHTML = selfDeck[i].atk;
                newCard.querySelector(".hp-text").innerHTML = selfDeck[i].hp;

                newCard.id = selfDeck[i].uid;
                newCard.classList.add("card-on-deck");
                newCard.style.backgroundImage = "url(images/cards/self/" + selfDeck[i].id + ".png)";
                
                document.getElementById("self-deck").appendChild(newCard);
            }


            $time.text("Time left: " + reponse.remainingTurnTime);            

        }

        

        if(reponse == "INVALID_KEY"){

        }
        else{

            if(yourTurn){
                document.getElementById("opponent").className = "bosOff";
                document.getElementById("self").className = "mtlOn";
                setButtons();
            }
            else{
                document.getElementById("opponent").className = "bosOn";
                document.getElementById("self").className = "mtlOff";
            }
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
                    uid: selectedCard.id,
                    targetuid: null
                }
            }).done( msg => {
                let rep = JSON.parse(msg);

                selectedCard = null;
            })
        }
    }

}
