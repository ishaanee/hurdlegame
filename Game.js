class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }


    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        runner1 = createSprite(10, 200,20,20);
        runner1.scale = 1;
        runner1.setCollider("rectangle", 1, 1)
        runner1.debug = true;
        runner1.velocityY = 2;
        runner1.addImage("runner1", runner1_img);
        runner2 = createSprite(10, 500,20,20);
        runner2.scale = 1;
        runner2.velocityY = 2;

        runner2.setCollider("rectangle", 1, 1);
        runner2.debug = true;
        runner2.addImage("runner2", runner2_img);
        runners = [runner1, runner2];

        invisibleGround1 = createSprite(100, 480, displayWidth * 5, 20);
        invisibleGround1.setCollider("rectangle", 0, 0);
        invisibleGround1.debug = true;
         invisibleGround1.visible = false;
        invisibleGround2 = createSprite(100, 750, displayWidth * 5, 20);
        invisibleGround2.setCollider("rectangle", 0, 0);
        invisibleGround2.debug = true;
         invisibleGround2.visible = false;


    }
    play() {
        form.hide();
        Player.getPlayerInfo();
         player.getPlayersAtEnd();

        if (allPlayers !== undefined) {
            image(track, 0, -20, displayWidth * 5, displayHeight);

            //index of the array
            var index = 0;
            var y = 140;
            var x = 50;


            runner1.collide(invisibleGround1);
            runner2.collide(invisibleGround2);

            for (var plr in allPlayers) {
                index = index + 1;


                y = y + 260;
                //use data form the database to display the cars in x direction
                x = 360 - allPlayers[plr].distance;

                runners[index - 1].x = x;
                runners[index - 1].y = y;
                runners[index - 1].velocityY = 2;
                runners[index - 1].velocityY = 2;

                if (index === player.index) {
                    // console.log("yes")
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    runners[index - 1].shapeColor = "red";
                    camera.position.x = runners[index - 1].x;
                    camera.position.y = runners[index - 1].y;
                    player.x = x;
                    player.y = y;


                    if (keyDown("space")) {
                        // console.log(player.x)
                        runners[index - 1].velocityY = -4;
                    }
                     player.velocityY = player.velocityY + 0.1
                }
                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
            }
        }

            if (player.distance == -9230) {
            gameState = 2;
            player.rank += 1
            Player.updatePlayersAtEnd(player.rank)
        }

        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);
    }
}











