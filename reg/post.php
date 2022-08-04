<?php
ob_start();

echo "您的邮箱已被注册,即将将您送回首页";



sleep(3);

ob_end_flush();

header("Location: https://www.bilibili.com/video/BV1GJ411x7h7");
?>