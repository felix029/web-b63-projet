let hand = [];
let firstRequest = true;

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

    //self variables
    $hp = $('#hp');
    $mp = $('#mp');
    $cardsLeft = $('#cards-left');

    $time = $('#time');
    
    setTimeout(state, 1000);
});

const state = () => {

    $.ajax({
        url : "ajax-state.php",
        type : "POST"
    }).done( msg => {
        let reponse = JSON.parse(msg);

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

            //self section
            $hp.text(reponse.hp);
            $mp.text(reponse.mp);
            $cardsLeft.text(reponse.remainingCardsCount);

            $time.text("Time left: " + reponse.remainingTurnTime);            

        }

        

        if(reponse == "INVALID_KEY"){

        }
        else{

            setTimeout(state, 1000);
        }

    })

}
