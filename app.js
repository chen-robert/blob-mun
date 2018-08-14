/*
Wrapper for src/server

Used to set __rootdir
*/

global.__rootdir = __dirname;

require("./src/server/index.js");