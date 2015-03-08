;(function() {

    "use strict";

    var numCols = 10,
        numRows = 16;

    function factoryService(shapeSvc) {
        var tetrisFactory = {
            createTetromino: createTetromino,
            createGrid: createGrid
        };
        function createTetromino() {
            var tetromino = {};

            var shape = shapeSvc.getShape();
            angular.extend(tetromino, shape);

            var topLeft = { topLeft: {} };
            topLeft.topLeft.x = parseInt( (numCols - shape.shape[0].length) / 2 );
            topLeft.topLeft.y = 0 - shape.shape.length;
            angular.extend(tetromino, topLeft);

            var screenPosition = { screenPosition: {} };
            screenPosition.screenPosition.x = topLeft.topLeft.x * 20;
            screenPosition.screenPosition.y = topLeft.topLeft.y * 20;
            angular.extend(tetromino, screenPosition);

            return tetromino;
        }
        function createGrid(rows, cols) {
            // assign values

            numCols = cols;
            numRows = rows;

            // create new grid
            var grid = [];
            for (var i = 0; i < rows; i++) {
                var row = [];
                for (var j = 0; j < cols; j++) {
                    var props = { "value": 0, "color": ""};
                    row[j] = props;
                }
                grid[i] = row;
            }
            return grid;
        }
        return tetrisFactory;
    }
    angular
        .module("app")
        .factory("factorySvc", ["shapeSvc", factoryService]);
})();