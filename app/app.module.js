'use scrict';

var app = angular.module('chessApp',[])
.run(function($rootScope) {
    $rootScope.board = [];
    $rootScope.selected = -1;
    $rootScope.turn = 0; // 0 White, 1 Black
    $rootScope.piece = {
        0 : '',     // Empty
        1 : 'K',    // White
        2 : 'Q',
        3 : 'R',
        4 : 'N',
        5 : 'B',
        6 : 'P',
        7 : 'K',    // Black
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

    function rank(i) {
        var squares = [];
        var j;
        for (j = i; j % 8 != 0; j--) {
            squares.push(j);
        }
        squares.push(j);
        for (var j = i; j % 8 != 7; j++) {
            squares.push(j);
        }
        squares.push(j);
        return squares;
    }

    function file(i) {
        var squares = [];
        for (var j = i; j >= 0; j -= 8) {
            squares.push(j);
        }
        for (var j = i; j <= 63; j += 8) {
            squares.push(j);
        }
        return squares;
    }

    function diag(i) {
        var squares = [];
        for (var j = i; j >= 0; j -= 7) {
            squares.push(j);
        }
        for (var j = i; j <= 63; j += 7) {
            squares.push(j);
        }
        for (var j = i; j >= 0; j -= 9) {
            squares.push(j);
        }
        for (var j = i; j <= 63; j += 9) {
            squares.push(j);
        }
        return squares;
    }

    function possibleMoves(i, p) {
        var piece = $rootScope.piece[p];
        switch(piece) {
            case 'K':
                return [i-9,i-8,i-7,i-1,i+1,i+7,i+8,i+9];
            case 'Q':
                return rank(i).concat(file(i)).concat(diag(i));
            case 'R':
                return rank(i).concat(file(i));
            case 'N':
                return [i-17,i-15,i-10,i-6,i+6,i+10,i+15,i+17];
            case 'B':
                return diag(i);
            case 'P':
                if (p === 6) {
                    return (i >= 48 && i <= 55) ? [i-8,i-16] : [i-8];
                } else {
                    return (i >= 8 && i <= 15) ? [i+8,i+16] : [i+8];
                }
            default:
                return [];
        }

    }

    function isWhite(p) {
        return p >= 1 && p <= 6;
    }

    function isBlack(p) {
        return p >= 7 && p <= 12;
    }

    function sameColor(p1, p2) {
        return (isWhite(p1) && isWhite(p2)) || (isBlack(p1) && isBlack(p2));
    }

    function isLegal(i, p) {
        if (sameColor(p,($rootScope.board[i]))) return false;
        return true;
    }

    function move(p, from, to) {
        if (possibleMoves(from, p).indexOf(to) !== -1 && isLegal(to, p)) {
            $rootScope.board[to] = p;
            $rootScope.board[from] = 0;
            return true;
        }
        else {
            return false;
        }
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
        if ($rootScope.selected === -1 && !$rootScope.board[i]) {
            return;
        }
        if (i === $rootScope.selected) {
            $rootScope.selected = -1;
            return;
        }
        if ($rootScope.selected != -1) {
            if (move($rootScope.board[$rootScope.selected], $rootScope.selected, i)) {
                $rootScope.turn = $rootScope.turn ^ 1;
                $rootScope.selected = -1;
            }
        } else {
            if ($rootScope.turn ^ isWhite($rootScope.board[i])) $rootScope.selected = i;
        }
    }

    run();
});
