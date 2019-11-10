<?php
    require_once("action/CommonAction.php");

    class AjaxGameAction extends CommonAction {
        public $result = "";

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = null;

            if($_POST["type"] === "END_TURN"){
                $data = array("key" => $_SESSION["key"], "type" => "END_TURN");
            }
            if($_POST["type"] === "HERO_POWER"){
                $data = array("key" => $_SESSION["key"], "type" => "HERO_POWER");
            }
            if($_POST["type"] === "PLAY"){
                $data = array("key" => $_SESSION["key"], "type" => "PLAY", "uid" => $_POST["uid"]);
            }
            if($_POST["type"] === "ATTACK" && !empty($_POST["targetuid"])){
                $data = array("key" => $_SESSION["key"], "type" => "ATTACK", "uid" => $_POST["uid"], "targetuid" => $_POST["targetuid"]);
            }
            if($_POST["type"] === "ATTACK" && empty($_POST["targetuid"])){
                $data = array("key" => $_SESSION["key"], "type" => "ATTACK", "uid" => $_POST["uid"]);
            }
            
            $this->result = parent::callApi("games/action", $data);   
        }

    }