<?php
	require_once("action/AccueilAction.php");

	$action = new AccueilAction();
	$action->execute();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<script src="js/accueil.js"></script>
	<link rel="stylesheet" href="css/global.css">
	<title>Hockey battle</title>
</head>
<body>
	<div id="identification">
		<h1>Connexion à la partie</h1>
		<form action="accueil.php" method="POST">
			<label>Nom d'utilisateur: </label>
			<input type="text" />
			<label>Mot de passe: </label>
			<input type="password" />
			<label>Clé du prof: </label>
			<input type="password"/>
			<button></button>
		</form>
	</div>
	<canvas width="1200" height="900">
	</canvas>
</body>
</html>