<?php
include_once '../src/utils/autoloader.php';
include_once '../src/View/template.php';
$data = [];
if (!empty($_POST['id'])) {
    $data = $announceRepository->getDataById($_POST['id']);
}
loadView('announce/newAnnounce', $data);
