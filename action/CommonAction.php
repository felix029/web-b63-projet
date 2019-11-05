<?php
	session_start();

	abstract class CommonAction {
		public static $VISIBILITY_MEMBER = 1;
		public static $VISIBILITY_PUBLIC = 0;

		private $visibility = null;

		public function __construct($visibility) {
			$this->visibility = $visibility;
		}

		public function execute() {		
			
			if (!empty($_SESSION["logout"])) {
				session_unset();
				session_destroy();
				session_start();
			}

			if(empty($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			if ($this->visibility > CommonAction::$VISIBILITY_PUBLIC) {
				if (!isset($_SESSION["key"])) {
					header("location:home.php");
					exit;
				}
			}

			$this->executeAction();
		}

		public function callApi($service, array $data) {
			$apiURL = "https://magix.apps-de-cours.com/api/" . $service;

			$options = array(
				'http' => array(
					'header'	=> "Content-type: application/x-www-form-urlencoded\r\n",
					'method'	=> 'POST',
					'content'	=> http_build_query($data)
					)
				);

				$context = stream_context_create($options);
				$result = file_get_contents($apiURL, false, $context);

				if(strpos($result, "<br") !== false){
					var_dump($result);
					exit;
				}

				return json_decode($result);
		}

		abstract protected function executeAction();
	}
