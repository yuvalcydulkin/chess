'use scrict';

var app = angular.module('chessApp',[])
.run(function($rootScope) {
    $rootScope.board = [];
    $rootScope.selected = -1;
    $rootScope.piece = {
        0 : '',     // EMPTY
        1 : 'K',    // WHITE
        2 : 'Q',
        3 : 'R',
        4 : 'N',
        5 : 'B',
        6 : 'P',
        7 : 'K',    // BLACK
        8 : 'Q',
        9 : 'R',
        10 : 'N',
        11 : 'B',
        12 : 'P'
    };

    function init(board) {
        board = [];
        board.push(9,10,11,8,7,11,10,9);
        board.push(12,12,12,12,12,12,12,12);
        for (var i = 0; i < 32; i++) {
            board.push(0);
        }
        board.push(6,6,6,6,6,6,6,6);
        board.push(3,4,5,2,1,5,4,3);
        return board;
    }

    function initEmpty(board) {
        board = [];
        for (var i = 0; i < 64; i++) {
            board.push(0);
        }
        return board;
    }

    function run() {
        $rootScope.board = init($rootScope.board);
    }

    $rootScope.squareClass = function(i) {
        var classNames = "";
        var eightMults = [8,16,24,32,40,48,56,64];
        for (var j in eightMults) {
            if (i < eightMults[j]) {
                break;
            }
        }
        if (j % 2 == 0) {
            classNames += (i % 2 === 0) ? "light" : "dark";
        } else {
            classNames += (i % 2 === 0) ? "dark" : "light";
        }
        var piece = $rootScope.board[i];
        if (piece) {
            classNames += (piece < 7) ? " white" : " black";
        }
        if (i === $rootScope.selected) classNames += " selected";
        return classNames;
    }

    $rootScope.select = function(i) {
        if (i === $rootScope.selected) {
            $rootScope.selected = -1;
            return;
        }
        $rootScope.selected = i;
    }

    run();
});
