<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$action->execute();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/accueil.css">
	<script src="js/jquery.js"></script>
	<script src="js/TiledImage.js"></script>
	<script src="js/sprites/goalie.js"></script>
	<script src="js/accueil.js"></script>
	<title>Hockey battle</title>
</head>
<body>
	<div id="pageContent">
		<div id="identification">
			<h1>Hockey battle</h1>
			<div id="infos">

				<form action="index.php" method="POST">
					<?php
						if($action->wrongLogin){
							?>
								<div id="error-div"><strong>Erreur : </strong>Connexion erroné</div>
								<?php
						}
						?>
					<div>
						<label>Nom d'utilisateur: </label>
						<input type="text" name="username"/>
					</div>
					
					<div>
						<label>Mot de passe: </label>
						<input type="password" name="pwd"/>
					</div>
					<div>
						<button class="button-hockey">Connexion</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<canvas id="canvas" data-full="true" class="full-canvas"></canvas>
</body>
</html>