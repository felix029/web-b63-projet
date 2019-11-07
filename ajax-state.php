<?php
    require_once("action/AjaxStateAction.php");

    $action = new AjaxStateAction();
    $action->execute();

    echo json_encode($action->result);