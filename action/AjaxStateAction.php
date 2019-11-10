<?php
	require_once("action/CommonAction.php");

	class AjaxStateAction extends CommonAction {
		public $result = "";
	
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);			
		}
	
		protected function executeAction() {
            $data = array("key" => $_SESSION["key"]);

            $this->result = parent::callApi("games/state", $data);
        }
    }
            