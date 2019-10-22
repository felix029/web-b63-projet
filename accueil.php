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
	<canvas width="1200" height="900">
		<div id="identification">

		</div>
	</canvas>
</body>
</html>