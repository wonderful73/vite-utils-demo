(function(e,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(e=typeof globalThis!="undefined"?globalThis:e||self,o(e.cbutils={}))})(this,function(e){"use strict";function o(){console.log("456");function l(){console.log("get")}function s(){console.log("set")}function i(){console.log("del")}return{get:l,set:s,del:i}}function t(){return console.log("123"),console.log("getUrlParams"),"getUrlParams"}e.cookies=o,e.getUrlParams=t,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
