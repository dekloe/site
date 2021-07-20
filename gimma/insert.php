<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        // "<script>document.writeln(scoreInt);</script>";
        $servername = "localhost";
        $username = "id13027336_pedro";
        $password = "y6MyUSHFYO!$!w9p";
        $database = "id13027336_leaderboards";
        
        // Create connection
        $conn = new mysqli($servername, $username, $password, $database);
        // Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "SELECT userName, score FROM kloeRun ORDER BY score DESC";
        $result = $conn->query($sql);
        
        $sql = "INSERT INTO kloeRun (scoreID, userName, score) VALUES (NULL,'".$_POST["userName"]."',69)";
        
        echo "Saved";
        mysqli_close($conn);
        header("Location:index.php");
    ?>
</body>
</html>