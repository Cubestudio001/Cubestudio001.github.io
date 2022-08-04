<?php
ob_start();
if($_GET["email"]==null){
    echo "发生错误！点击<a href=\"../\">这里</a>的链接返回主页";
    die();
}
echo "邮箱地址",$_GET["email"],"已被注册,即将将您送回首页";

ob_end_flush();

sleep(3);


header("Location: https://www.bilibili.com/video/BV1GJ411x7h7");
?>

<a href="../">Go Back</a>