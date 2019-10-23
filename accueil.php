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
	<link rel="stylesheet" href="css/accueil.css">
	<title>Hockey battle</title>
</head>
<body>
	<div id="identification">
		<h1>Connexion</h1>
		<div id="infos">
		
			<form action="accueil.php" method="POST">
				<div>
					<label>Nom d'utilisateur: </label>
					<input type="text" />
				</div>
			
				<div>
					<label>Mot de passe: </label>
					<input type="password" />
				</div>
			
				<div>
					<label>Clé du prof: </label>
					<input type="password"/>
				</div>
				<div>
					<button class="button-hockey">Connexion</button>
				</div>
			</form>
		</div>
	</div>
</body>
</html>