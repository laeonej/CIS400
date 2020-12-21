const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = 5000; // PORT of server
//const HOST = "127.0.0.1"; // Hosting Server change when you make it live on server according to your hosting server
var players = {}; // It will keep all the players data who have register using mobile number. you can use actual persistence database I have used this for temporery basis
var sockets = {}; // stores all the connected clients
var table = {}; // stores the ongoing game
var winCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
]; // game winning combination index 

// STEP 4 ::=> When any request comes it will trigger and bind all the susequence events that will triggered as per app logic
io.on('connection', client => {
    console.log("connected : " + client.id);
    client.emit('connected', { "id": client.id }); // STEP 5 ::=> Notify request client that it is not connected with server

    client.on("createTable", data => {
        var flag = false;

        while (!flag) {
            var tableCode = "";
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < 6; i++) {
                tableCode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            if (!table[tableCode]) {
                table[tableCode] = {
                    players: [data.playerName],
                    cards: {
                        0: { playerName: null, posX: 0, posY: 0, backSide: true },
                        1: { playerName: null, posX: 0, posY: 0, backSide: true },
                        2: { playerName: null, posX: 0, posY: 0, backSide: true },
                        3: { playerName: null, posX: 0, posY: 0, backSide: true },
                        4: { playerName: null, posX: 0, posY: 0, backSide: true },
                        5: { playerName: null, posX: 0, posY: 0, backSide: true },
                        6: { playerName: null, posX: 0, posY: 0, backSide: true },
                        7: { playerName: null, posX: 0, posY: 0, backSide: true },
                        8: { playerName: null, posX: 0, posY: 0, backSide: true },
                        9: { playerName: null, posX: 0, posY: 0, backSide: true },
                        10: { playerName: null, posX: 0, posY: 0, backSide: true },
                        11: { playerName: null, posX: 0, posY: 0, backSide: true },
                        12: { playerName: null, posX: 0, posY: 0, backSide: true },
                        13: { playerName: null, posX: 0, posY: 0, backSide: true },
                        14: { playerName: null, posX: 0, posY: 0, backSide: true },
                        15: { playerName: null, posX: 0, posY: 0, backSide: true },
                        16: { playerName: null, posX: 0, posY: 0, backSide: true },
                        17: { playerName: null, posX: 0, posY: 0, backSide: true },
                        18: { playerName: null, posX: 0, posY: 0, backSide: true },
                        19: { playerName: null, posX: 0, posY: 0, backSide: true },
                        20: { playerName: null, posX: 0, posY: 0, backSide: true },
                        21: { playerName: null, posX: 0, posY: 0, backSide: true },
                        22: { playerName: null, posX: 0, posY: 0, backSide: true },
                        23: { playerName: null, posX: 0, posY: 0, backSide: true },
                        24: { playerName: null, posX: 0, posY: 0, backSide: true },
                        25: { playerName: null, posX: 0, posY: 0, backSide: true },
                        26: { playerName: null, posX: 0, posY: 0, backSide: true },
                        27: { playerName: null, posX: 0, posY: 0, backSide: true },
                        28: { playerName: null, posX: 0, posY: 0, backSide: true },
                        29: { playerName: null, posX: 0, posY: 0, backSide: true },
                        30: { playerName: null, posX: 0, posY: 0, backSide: true },
                        31: { playerName: null, posX: 0, posY: 0, backSide: true },
                        32: { playerName: null, posX: 0, posY: 0, backSide: true },
                        33: { playerName: null, posX: 0, posY: 0, backSide: true },
                        34: { playerName: null, posX: 0, posY: 0, backSide: true },
                        35: { playerName: null, posX: 0, posY: 0, backSide: true },
                        36: { playerName: null, posX: 0, posY: 0, backSide: true },
                        37: { playerName: null, posX: 0, posY: 0, backSide: true },
                        38: { playerName: null, posX: 0, posY: 0, backSide: true },
                        39: { playerName: null, posX: 0, posY: 0, backSide: true },
                        40: { playerName: null, posX: 0, posY: 0, backSide: true },
                        41: { playerName: null, posX: 0, posY: 0, backSide: true },
                        42: { playerName: null, posX: 0, posY: 0, backSide: true },
                        43: { playerName: null, posX: 0, posY: 0, backSide: true },
                        44: { playerName: null, posX: 0, posY: 0, backSide: true },
                        45: { playerName: null, posX: 0, posY: 0, backSide: true },
                        46: { playerName: null, posX: 0, posY: 0, backSide: true },
                        47: { playerName: null, posX: 0, posY: 0, backSide: true },
                        48: { playerName: null, posX: 0, posY: 0, backSide: true },
                        49: { playerName: null, posX: 0, posY: 0, backSide: true },
                        50: { playerName: null, posX: 0, posY: 0, backSide: true },
                        51: { playerName: null, posX: 0, posY: 0, backSide: true }
                    },
                    images: {},
                    decks: {
                        0: { playerName: null, posX: 0, posY: 0 }
                    }
                }
                flag = true;
            }
        }
        client.emit("confirmCreateTable", { tableCode: tableCode, players: table[tableCode].players });
    });

    client.on('joinTable', data => {
        // always assume the player is new
        var flag = true;

        if (table[data.tableCode]) {
            sockets[client.id] = {
                tableCode: data.tableCode,
                playerName: data.playerName
            };
            // add player to table
            table[data.tableCode].players.push(data.playerName)
            client.broadcast.emit("confirmNewPlayer", {
                tableCode: data.tableCode,
                players: table[data.tableCode].players
            });
        } else {
            flag = false;
        }
        client.emit("confirmJoinTable", {
            flag: flag,
            players: table[data.tableCode] ? table[data.tableCode].players : null
        });
    });

    client.on('startDrag', data => {
        var flag = true;
        var id = null;

        // another player has already start dragging this card
        if (table[data.tableCode]) {

            newData = {
                playerName: data.playerName,
                posX: data.posX,
                posY: data.posY
            }
            if (data.type == "card") {
                if (table[data.tableCode].cards[data.cardId].playerName != null) {
                    flag = false;
                } else {
                    table[data.tableCode].cards[data.cardId] = newData
                }
                client.emit("confirmStartDrag", {
                    cardId: data.cardId,
                    flag: flag
                });
            } else if (data.type == "image") {
                if (table[data.tableCode].images[data.src].playerName != null) {
                    flag = false;
                } else {
                    table[data.tableCode].images[data.src] = newData

                }
                client.emit("confirmStartDrag", {
                    src: data.src,
                    flag: flag
                });
            } else if (data.type = "deck") {
                if (table[data.tableCode].decks[data.deckId].playerName != null) {
                    flag = false;
                } else {
                    table[data.tableCode].images[data.deckId] = newData
                }
                client.emit("confirmStartDrag", {
                    deckId: data.deckId,
                    flag: flag
                });

            }
        }
    })

    client.on('midDrag', data => {
        returnData = {
            type: data.type,
            playerName: data.playerName,
            tableCode: data.tableCode,
            posX: data.posX,
            posY: data.posY
        }

        if (data.type == "card") {
            table[data.tableCode].cards[data.cardId].posX = data.posX;
            table[data.tableCode].cards[data.cardId].posY = data.posY;
            returnData["cardId"] = data.cardId;
        } else if (data.type == "image") {
            table[data.tableCode].images[data.src].posX = data.posX;
            table[data.tableCode].images[data.src].posY = data.posY;
            returnData["src"] = data.src;
        } else if (data.type == "deck") {
            table[data.tableCode].decks[data.deckId].posX = data.posX;
            table[data.tableCode].decks[data.deckId].posY = data.posY;
            returnData["deckId"] = data.deckId;
        }
        client.broadcast.emit("confirmMidDrag", returnData);
    })

    client.on('stopDrag', data => {
        returnData = {
            type: data.type,
            playerName: data.playerName,
            isPrivate: data.isPrivate,
            tableCode: data.tableCode,
            posX: data.posX,
            posY: data.posY
        }

        if (data.type == "card") {
            table[data.tableCode].cards[data.cardId] = {
                playerName: null,
                posX: data.posX,
                posY: data.posY
            };
            returnData["cardId"] = data.cardId;
        } else if (data.type == "image") {
            table[data.tableCode].images[data.src] = {
                playerName: null,
                posX: data.posX,
                posY: data.posY
            };
            returnData["src"] = data.src;
        } else if (data.type == "deck") {
            table[data.tableCode].decks[data.deckId] = {
                playerName: null,
                posX: data.posX,
                posY: data.posY
            };
            returnData["deckId"] = data.deckId;
        }
        client.broadcast.emit("confirmStopDrag", returnData);
    })

    client.on("flipCard", data => {
        table[data.tableCode].cards[data.cardId].backSide = data.backSide
        table[data.tableCode].cards[data.cardId].playerName = null

        client.broadcast.emit("confirmFlipCard", {
            tableCode: data.tableCode,
            cardId: data.cardId,
            backSide: data.backSide
        });
    })

    client.on("exitTable", data => {
        const i = table[data.tableCode].players.indexOf(data.playerName);
        table[data.tableCode].players.splice(i, 1);

        client.broadcast.emit("confirmNewPlayer", {
            tableCode: data.tableCode,
            players: table[data.tableCode].players
        });
    })

    client.on("addImage", data => {
        table[data.tableCode].images[data.src] = {
            playerName: data.playerName,
            posX: data.posX,
            posY: data.posY
        }
        console.log(data.src)
        client.broadcast.emit("confirmAddImage", {
            tableCode: data.tableCode,
            src: data.src
        });
    })

    // STEP 6 ::=> It is a event which will handle user registration process
    client.on('checkUserDetail', data => {
        var flag = false;
        for (var id in sockets) {
            if (sockets[id].mobile_number === data.mobileNumber) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            sockets[client.id] = {
                mobile_number: data.mobileNumber,
                is_playing: false,
                game_id: null
            };

            var flag1 = false;
            for (var id in players) {
                if (id === data.mobileNumber) {
                    flag1 = true;
                    break;
                }
            }
            if (!flag1) {
                players[data.mobileNumber] = {
                    played: 0,
                    won: 0,
                    draw: 0
                };
            }

        }
        client.emit('checkUserDetailResponse', !flag);
    });

    // STEP 7 ::=> It will send all the players who are online and avalable to play the game
    client.on('getOpponents', data => {
        var response = [];
        for (var id in sockets) {
            if (id !== client.id && !sockets[id].is_playing) {
                response.push({
                    id: id,
                    mobile_number: sockets[id].mobile_number,
                    played: players[sockets[id].mobile_number].played,
                    won: players[sockets[id].mobile_number].won,
                    draw: players[sockets[id].mobile_number].draw
                });
            }
        }
        client.emit('getOpponentsResponse', response);
        client.broadcast.emit('newOpponentAdded', {
            id: client.id,
            mobile_number: sockets[client.id].mobile_number,
            played: players[sockets[client.id].mobile_number].played,
            won: players[sockets[client.id].mobile_number].won,
            draw: players[sockets[client.id].mobile_number].draw
        });
    });

    // STEP 8 ::=> When Client select any opponent to play game then it will generate new game and return playboard to play the game. New game starts here
    client.on('selectOpponent', data => {
        var response = { status: false, message: "Opponent is playing with someone else." };
        if (!sockets[data.id].is_playing) {
            var gameId = uuidv4();
            sockets[data.id].is_playing = true;
            sockets[client.id].is_playing = true;
            sockets[data.id].game_id = gameId;
            sockets[client.id].game_id = gameId;
            players[sockets[data.id].mobile_number].played = players[sockets[data.id].mobile_number].played + 1;
            players[sockets[client.id].mobile_number].played = players[sockets[client.id].mobile_number].played + 1;

            games[gameId] = {
                player1: client.id,
                player2: data.id,
                whose_turn: client.id,
                playboard: [["", "", ""], ["", "", ""], ["", "", ""]],
                game_status: "ongoing", // "ongoing","won","draw"
                game_winner: null, // winner_id if status won
                winning_combination: []
            };
            games[gameId][client.id] = {
                mobile_number: sockets[client.id].mobile_number,
                sign: "x",
                played: players[sockets[client.id].mobile_number].played,
                won: players[sockets[client.id].mobile_number].won,
                draw: players[sockets[client.id].mobile_number].draw
            };
            games[gameId][data.id] = {
                mobile_number: sockets[data.id].mobile_number,
                sign: "o",
                played: players[sockets[data.id].mobile_number].played,
                won: players[sockets[data.id].mobile_number].won,
                draw: players[sockets[data.id].mobile_number].draw
            };
            io.sockets.connected[client.id].join(gameId);
            io.sockets.connected[data.id].join(gameId);
            io.emit('excludePlayers', [client.id, data.id]);
            io.to(gameId).emit('gameStarted', { status: true, game_id: gameId, game_data: games[gameId] });

        }
    });

    var gameBetweenSeconds = 10; // Time between next game
    var gameBetweenInterval = null;

    // STEP 9 ::=> When Player select any cell then it will check all the necessory logic of Tic Tac Toe Game
    client.on('selectCell', data => {
        games[data.gameId].playboard[data.i][data.j] = games[data.gameId][games[data.gameId].whose_turn].sign;

        var isDraw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (games[data.gameId].playboard[i][j] == "") {
                    isDraw = false;
                    break;
                }
            }
        }
        if (isDraw)
            games[data.gameId].game_status = "draw";


        for (let i = 0; i < winCombinations.length; i++) {
            var tempComb = games[data.gameId].playboard[winCombinations[i][0][0]][winCombinations[i][0][1]] + games[data.gameId].playboard[winCombinations[i][1][0]][winCombinations[i][1][1]] + games[data.gameId].playboard[winCombinations[i][2][0]][winCombinations[i][2][1]];
            if (tempComb === "xxx" || tempComb === "ooo") {
                games[data.gameId].game_winner = games[data.gameId].whose_turn;
                games[data.gameId].game_status = "won";
                games[data.gameId].winning_combination = [[winCombinations[i][0][0], winCombinations[i][0][1]], [winCombinations[i][1][0], winCombinations[i][1][1]], [winCombinations[i][2][0], winCombinations[i][2][1]]];
                players[games[data.gameId][games[data.gameId].game_winner].mobile_number].won++;
            }
        }
        if (games[data.gameId].game_status == "draw") {
            players[games[data.gameId][games[data.gameId].player1].mobile_number].draw++;
            players[games[data.gameId][games[data.gameId].player2].mobile_number].draw++;
        }
        games[data.gameId].whose_turn = games[data.gameId].whose_turn == games[data.gameId].player1 ? games[data.gameId].player2 : games[data.gameId].player1;
        io.to(data.gameId).emit('selectCellResponse', games[data.gameId]);

        if (games[data.gameId].game_status == "draw" || games[data.gameId].game_status == "won") {
            gameBetweenSeconds = 10;
            gameBetweenInterval = setInterval(() => {
                gameBetweenSeconds--;
                io.to(data.gameId).emit('gameInterval', gameBetweenSeconds);
                if (gameBetweenSeconds == 0) {
                    clearInterval(gameBetweenInterval);

                    var gameId = uuidv4();
                    sockets[games[data.gameId].player1].game_id = gameId;
                    sockets[games[data.gameId].player2].game_id = gameId;
                    players[sockets[games[data.gameId].player1].mobile_number].played = players[sockets[games[data.gameId].player1].mobile_number].played + 1;
                    players[sockets[games[data.gameId].player2].mobile_number].played = players[sockets[games[data.gameId].player2].mobile_number].played + 1;

                    games[gameId] = {
                        player1: games[data.gameId].player1,
                        player2: games[data.gameId].player2,
                        whose_turn: games[data.gameId].game_status == "won" ? games[data.gameId].game_winner : games[data.gameId].whose_turn,
                        playboard: [["", "", ""], ["", "", ""], ["", "", ""]],
                        game_status: "ongoing", // "ongoing","won","draw"
                        game_winner: null, // winner_id if status won
                        winning_combination: []
                    };
                    games[gameId][games[data.gameId].player1] = {
                        mobile_number: sockets[games[data.gameId].player1].mobile_number,
                        sign: "x",
                        played: players[sockets[games[data.gameId].player1].mobile_number].played,
                        won: players[sockets[games[data.gameId].player1].mobile_number].won,
                        draw: players[sockets[games[data.gameId].player1].mobile_number].draw
                    };
                    games[gameId][games[data.gameId].player2] = {
                        mobile_number: sockets[games[data.gameId].player2].mobile_number,
                        sign: "o",
                        played: players[sockets[games[data.gameId].player2].mobile_number].played,
                        won: players[sockets[games[data.gameId].player2].mobile_number].won,
                        draw: players[sockets[games[data.gameId].player2].mobile_number].draw
                    };
                    io.sockets.connected[games[data.gameId].player1].join(gameId);
                    io.sockets.connected[games[data.gameId].player2].join(gameId);

                    io.to(gameId).emit('nextGameData', { status: true, game_id: gameId, game_data: games[gameId] });

                    io.sockets.connected[games[data.gameId].player1].leave(data.gameId);
                    io.sockets.connected[games[data.gameId].player2].leave(data.gameId);
                    delete games[data.gameId];
                }
            }, 1000);
        }

    });

    // STEP 10 ::=> When any player disconnect then it will handle the disconnect process
    client.on('disconnect', () => {
        console.log("disconnect : " + client.id);
        if (typeof sockets[client.id] != "undefined") {
            if (sockets[client.id].is_playing) {

                io.to(sockets[client.id].game_id).emit('opponentLeft', {});
                players[sockets[games[sockets[client.id].game_id].player1].mobile_number].played--;
                players[sockets[games[sockets[client.id].game_id].player2].mobile_number].played--;
                io.sockets.connected[client.id == games[sockets[client.id].game_id].player1 ? games[sockets[client.id].game_id].player2 : games[sockets[client.id].game_id].player1].leave(sockets[client.id].game_id);
                delete games[sockets[client.id].game_id];
            }
        }
        delete sockets[client.id];
        client.broadcast.emit('opponentDisconnected', {
            id: client.id
        });
    });
});


server.listen(PORT); // 3 ::=> Staring HTTP server which will be consumed by clients
console.log("listening to" + PORT);


// Generate Game ID
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}