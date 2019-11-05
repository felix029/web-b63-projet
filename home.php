<?php
	require_once("action/HomeAction.php");

	$action = new HomeAction();
	$action->execute();
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/home.css">
    <title>Hockey Battle - Home</title>
</head>
<body>
    <div id="content">

        <div id="texte">
            Grosse game à soir! Prêt pour la partie ou tu veux encore te pratiquer?
        </div>
        <div id="boutons">
            <form action="home.php" method="POST" id="formulaire">
                <button type="submit" name="pratique">Pratique</button>
                <button type="submit" name="jouer">Jouer</button>
                <button type="submit" name="quitter" class="quitter">Quitter</button>
            </form>
        </div>
    </div>
</body>
</html>