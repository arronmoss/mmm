<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
if(!isset($_GET['githook_code']) || $_GET['githook_code'] != 'MdoqRulesTheWorld') {
    die();
}

echo '<pre><marquee>...Git Pull...</marquee>'.PHP_EOL.'<hr>';
passthru('git pull -Xtheirs');
echo '<hr>Done'.PHP_EOL;
