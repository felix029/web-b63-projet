<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {
		public $wrongLogin = false;


		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if(isset($_POST["username"]) && isset($_POST["pwd"])){
				$data = [];
				$data["username"] = $_POST["username"];
				$data["password"] = $_POST["pwd"];
				
				$result = parent::callAPI("signin", $data);

				if($result == "INVALID_USERNAME_PASSWORD") {
					$this->wrongLogin = true;
				}
				else{
					$_SESSION["key"] = $result->key;			
					$_SESSION["username"] = $data["username"];
					$_SESSION["visibility"] = 1;
					header("location:home.php");
					exit;
				}

			}

		}
	}