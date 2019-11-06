<?php
    require_once("action/CommonAction.php");

    class HomeAction extends CommonAction{
        public $result = "";

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
           
            if(isset($_POST["quitter"])){
                $data = array("key" => $_SESSION["key"]);
                $this->result = parent::callAPI("signout", $data);
                
                if($this->result === "SIGNED_OUT"){
                    $_SESSION["logout"] = true;
                    header("location:index.php");
                    exit;
                }
            }

            if(isset($_POST["pratique"])){
                $data = array("key" => $_SESSION["key"], "type" => "TRAINING");
                $this->result = parent::callAPI("games/auto-match", $data);
                
                unset($_POST["pratique"]);
            }

            if(isset($_POST["jouer"])){
                $data = array("key" => $_SESSION["key"], "type" => "PVP");
                $this->result = parent::callAPI("games/auto-match", $data);

                unset($_POST["jouer"]);
            }

            if($this->result === "JOINED_PVP" || $this->result === "CREATED_PVP" || $this->result === "JOINED_TRAINING"){
                header("location:game.php");
                exit;
            }
        }
    }