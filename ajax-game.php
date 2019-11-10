<?php
    require_once("action/AjaxGameAction.php");

    $action = new AjaxGameAction();
    $action->execute();

    echo json_encode($action->result);