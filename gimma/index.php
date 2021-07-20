<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>De Kloe Gimma</title>
    <style>
        body {
            margin: 0%;
            background-color: rgb(25, 25, 25);
            color: white;
            font-family: Arial, Helvetica, sans-serif;
            overflow: hidde;
            height: 100%;
        }
        #gameScreen {
            min-width: 100vw;
            border-bottom:1px solid #000000;
            background-color: rgb(75, 10, 110);
        }
        #image {
            display: none;
        }
        #scoreDiv {
            display: none;
        }
        #darkScreen{
            position: absolute;
            width: 100vw;
            height: 100vh;
            z-index: 5;
            background-color: black;
            opacity: 80%;
        }
        #nameForm {
            opacity: 100%;
            position: absolute;
            z-index: 10;
            background-color: rgb(6, 7, 6);
            width: 40vw;
            left: 30vw;
            height: 20vh;
            top: 5vh;
            border-radius: 5%;
            text-align: center;
        }
        #closeButton {
            position: absolute;
            bottom: 15%;
            width: 15%;
            left: 30%;
        }
        .h3 {
            width: 100%;
        }
        #userNameForm {
            position: absolute;
            width: 60%;
            left: 20%;
            bottom: 45%;
            height: 10%;
            font-size: 15px;
        }
        #submitButton {
            position: absolute;
            bottom: 15%;
            width: 15%;
            right: 30%;
        }
        #homeBut {
            height: 10vh;
            opacity: 60%;
        }
        #homeBut:hover {
            opacity: 100%;
        }

    </style>
</head>
<body>
    <!--script>
        var current_player = "a";
        var player_a = document.createElement("audio");
        var player_b = document.createElement("audio");
        
        player_a.src = "kloerun.wav";
        player_b.src = player_a.src;
        
        function loopIt(){
            var player = null;
        
            if(current_player == "a"){
                player = player_b;
                current_player = "b";
            }
            else{
                player = player_a;
                current_player = "a";
            }
        
            player.play();
        
            setTimeout(loopIt, 16000); //millisec
        }
        
        loopIt();
    </script-->
    <div id="scoreDiv">
        <div id="darkScreen"></div>
        <div id="nameForm">
            <form id="formId" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                <h3>SAVE SCORE?</h3>
                <input type="text" id="userNameForm" name="userName" placeholder="USERNAME" maxlength="18" required></input><br>
                <!--input type="submit" id="closeButton" value="NA FAM!"></input-->
                <!--input type="number" id="scoreInput" name="score" value="<script>document.write('789');</script>"></input-->
                <input type="submit" id="submitButton" name="submit" value="SAVE"></input>
            </form>
            <button id="closeButton" onclick="closeSaveDiv()">CLOSE</button>
        </div>
    </div>
    
    <a id="homeBut" href="/index.php"><img src="/img/logoRed.png" id="homeBut"></a>
    
    <img id="image" src="/img/logoRed.png">
    <canvas id="gameScreen">
        Your browser can't run this game.<!--Your browser does not support the HTML5 canvas tag.-->
    </canvas>
    <script src="/gimma/index.js"></script>
    <h1>LEADERBOARD</h1>
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
        
        if(isset($_POST['submit'])) {
            //$score = $_POST['score'];
            //$score ="<script>document.writeln(scoreInt);</script>";
            $score = $_COOKIE["score"];
            //$score = "echo '<script>document.writeln(scoreInt);</script>'";
            $sql = "INSERT INTO kloeRun (scoreID, userName, score) VALUES (NULL,'".$_POST["userName"]."',$score)";
            $result = $conn->query($sql);
        }
        
        $sql = "SELECT userName, score FROM kloeRun ORDER BY score DESC";
        $result = $conn->query($sql);
        
        $count = 1;
        while($row = $result->fetch_assoc()) {
            if ($count <= 10) {
                echo $count . ". \t" . $row["userName"]. "\t" . $row["score"]. "<hr>";
                $count++;
            }
        }
        
    ?>
</body>
</html>