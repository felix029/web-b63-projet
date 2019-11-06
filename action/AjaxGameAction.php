<?php
    require_once("action/CommonAction.php");

    class AjaxGameAction extends CommonAction {
        public $result = "";

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

        }

    }