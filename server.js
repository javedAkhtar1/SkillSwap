"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var next_1 = require("next");
var socket_1 = require("./lib/socket");
var dev = process.env.NODE_ENV !== "production";
var nextApp = (0, next_1.default)({ dev: dev });
var handle = nextApp.getRequestHandler();
nextApp.prepare().then(function () {
    var app = (0, express_1.default)();
    var server = (0, http_1.createServer)(app);
    (0, socket_1.initSocket)(server);
    app.all("*", function (req, res) { return handle(req, res); });
    server.listen(3000, function () {
        console.log("Server + Socket.IO running on http://localhost:3000");
    });
});
