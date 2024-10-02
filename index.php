<?php
$conn = @mysqli_connect("localhost", "root", "", "classrooms");

$conn->query('SET NAMES UTF8;');

if (isset($_POST['name']) && isset($_POST['building']) && isset($_POST['floor']) && isset($_POST['x']) && isset($_POST['y'])) {
    $name = $_POST['name'];
    $building = $_POST['building'];
    $floor = $_POST['floor'];
    $x = $_POST["x"];
    $y = $_POST["y"];

    mysqli_query($conn, "INSERT INTO `coords`(`nazwa`, `budynek`, `pietro`, `x`, `y`) VALUES ('$name','$building','$floor','$x','$y')");

    $conn->close();
}
