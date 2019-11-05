<?php
    require_once("action/CommonAction.php");

    class HomeAction extends CommonAction{

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            
            if(isset($_POST["quitter"])){
                $data = array("key" => $_SESSION["key"]);
                
                $result = parent::callAPI("signout", $data);
                
                if($result === "SIGNED_OUT"){
                    $_SESSION["logout"] = true;
                    header("location:index.php");
                    exit;
                }
                else{
                    echo("ERROR SIGNIN OUT");
                }
            }
        }
    }