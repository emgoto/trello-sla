/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/auth.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auth.ts":
/*!*********************!*\
  !*** ./src/auth.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _trello_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trello-util */ \"./src/trello-util.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst t = TrelloPowerUp.iframe();\nfunction onAuthenticate() {\n    return Trello.authorize({\n        type: \"popup\",\n        name: \"SLAs for Trello\",\n        expiration: \"never\",\n        // eslint-disable-next-line @typescript-eslint/camelcase\n        return_url: \"https://emgoto.github.io/trello-sla/\",\n        success: () => {\n            Object(_trello_util__WEBPACK_IMPORTED_MODULE_0__[\"setToken\"])(t, Trello.token());\n        },\n        error: () => { },\n    });\n}\n;\nt.render(function () {\n    return __awaiter(this, void 0, void 0, function* () {\n        document.getElementById('authenticate-btn').onclick = onAuthenticate;\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0aC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXV0aC50cz9jMGJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldFRva2VuIH0gZnJvbSAnLi90cmVsbG8tdXRpbCc7XG5cbmRlY2xhcmUgY29uc3QgVHJlbGxvUG93ZXJVcDogYW55O1xuY29uc3QgdCA9IFRyZWxsb1Bvd2VyVXAuaWZyYW1lKCk7XG5kZWNsYXJlIGNvbnN0IFRyZWxsbzogYW55O1xuXG5mdW5jdGlvbiBvbkF1dGhlbnRpY2F0ZSgpIHtcbiAgICByZXR1cm4gVHJlbGxvLmF1dGhvcml6ZSh7XG4gICAgICAgIHR5cGU6IFwicG9wdXBcIixcbiAgICAgICAgbmFtZTogXCJTTEFzIGZvciBUcmVsbG9cIixcbiAgICAgICAgZXhwaXJhdGlvbjogXCJuZXZlclwiLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICAgICAgICByZXR1cm5fdXJsOlwiaHR0cHM6Ly9lbWdvdG8uZ2l0aHViLmlvL3RyZWxsby1zbGEvXCIsIFxuICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUb2tlbih0LCBUcmVsbG8udG9rZW4oKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoKSA9PiB7IH0sXG4gICAgfSk7XG59O1xuICBcbnQucmVuZGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aGVudGljYXRlLWJ0bicpLm9uY2xpY2sgPSBvbkF1dGhlbnRpY2F0ZTtcbn0pOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFBQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/auth.ts\n");

/***/ }),

/***/ "./src/trello-util.ts":
/*!****************************!*\
  !*** ./src/trello-util.ts ***!
  \****************************/
/*! exports provided: Condition, CardActionType, getConfigurations, setConfigurations, getSlaData, setSlaData, getToken, setToken, getBoardActions, getCardActions, getLists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Condition\", function() { return Condition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardActionType\", function() { return CardActionType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getConfigurations\", function() { return getConfigurations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setConfigurations\", function() { return setConfigurations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSlaData\", function() { return getSlaData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSlaData\", function() { return setSlaData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getToken\", function() { return getToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setToken\", function() { return setToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBoardActions\", function() { return getBoardActions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCardActions\", function() { return getCardActions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLists\", function() { return getLists; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst key = '652d72f229f65b3457533bd55fdcf436';\n// Right now we only provide being in a column as starting the SLA\nvar Condition;\n(function (Condition) {\n    Condition[\"ColumnName\"] = \"COLUMN_NAME\";\n})(Condition || (Condition = {}));\nvar CardActionType;\n(function (CardActionType) {\n    CardActionType[\"createCard\"] = \"createCard\";\n    CardActionType[\"updateCard\"] = \"updateCard\";\n})(CardActionType || (CardActionType = {}));\nconst getConfigurations = (t) => t.get('board', 'shared', 'config');\nconst setConfigurations = (t, config) => t.set('board', 'shared', 'config', config);\nconst getSlaData = (t) => t.get('card', 'shared', 'slaData');\nconst setSlaData = (t, slaData) => t.set('card', 'shared', 'slaData', slaData);\nconst getToken = (t) => t.get('member', 'private', 'authToken');\nconst setToken = (t, token) => t.set('member', 'private', 'authToken', token);\n/**\n * TODO: the problem with getting all board actions is that there is a limit of 1000\n * And that the actions for closed cards are also counted.\n */\nconst getBoardActions = (t) => __awaiter(void 0, void 0, void 0, function* () {\n    const { board: boardId } = t.getContext();\n    const token = yield getToken(t);\n    const url = `https://api.trello.com/1/boards/${boardId}/actions?limit=1000&filter=updateCard:idList,createCard&member=false&memberCreator=false&key=${key}&token=${token}`;\n    return axios.get(url)\n        .then(response => {\n        return response.data;\n    })\n        .catch((e) => {\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            setToken(t, undefined);\n        }\n    });\n});\nconst getCardActions = (t) => __awaiter(void 0, void 0, void 0, function* () {\n    const { card: cardId } = t.getContext();\n    const token = yield getToken(t);\n    const url = `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:idList,createCard&key=${key}&token=${token}`;\n    return axios.get(url).then(response => response.data).catch((e) => {\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            setToken(t, undefined);\n        }\n    });\n});\n// TODO: don't need to call API for this when there is t.lists()\nconst getLists = (t) => __awaiter(void 0, void 0, void 0, function* () {\n    const { board: boardId } = t.getContext();\n    const token = yield getToken(t);\n    const url = `https://api.trello.com/1/boards/${boardId}/lists?cards=none&filter=open&key=${key}&token=${token}`;\n    return axios.get(url).then(response => response.data).catch((e) => {\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            setToken(t, undefined);\n        }\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHJlbGxvLXV0aWwudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3RyZWxsby11dGlsLnRzP2JhYjciXSwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBheGlvczogYW55O1xuXG5jb25zdCBrZXkgPSAnNjUyZDcyZjIyOWY2NWIzNDU3NTMzYmQ1NWZkY2Y0MzYnO1xuXG4vLyBSaWdodCBub3cgd2Ugb25seSBwcm92aWRlIGJlaW5nIGluIGEgY29sdW1uIGFzIHN0YXJ0aW5nIHRoZSBTTEFcbmV4cG9ydCBlbnVtIENvbmRpdGlvbiB7XG4gICAgQ29sdW1uTmFtZSA9IFwiQ09MVU1OX05BTUVcIixcbn1cblxuZXhwb3J0IGVudW0gQ2FyZEFjdGlvblR5cGUgeyBcbiAgICBjcmVhdGVDYXJkID0gXCJjcmVhdGVDYXJkXCIsXG4gICAgdXBkYXRlQ2FyZCA9IFwidXBkYXRlQ2FyZFwiXG59XG5cbmV4cG9ydCB0eXBlIFNsYUNvbmRpdGlvbiA9IHtcbiAgICB0eXBlOiBDb25kaXRpb247XG4gICAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU2xhQ29uZmlndXJhdGlvbiA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdGFydENvbmRpdGlvbjogU2xhQ29uZGl0aW9uO1xuICAgIGVuZENvbmRpdGlvbjogU2xhQ29uZGl0aW9uO1xuICAgIHRpbWU6IG51bWJlcjsgLy8gTWludXRlc1xufVxuXG5leHBvcnQgdHlwZSBTbGFEYXRhID0ge1xuICAgIHN0YXJ0VGltZT86IG51bWJlcjsgLy8gVW5peCB0aW1lc3RhbXAgbWlsbGlzZWNvbmRzLiBPbmx5IGV4aXN0cyBpZiBTTEEgaGFzIHN0YXJ0ZWRcbiAgICBlbmRUaW1lPzogbnVtYmVyOyAvLyBVbml4IHRpbWVzdGFtcCBpbiBtaWxsaXNlY29uZHMuIE9ubHkgZXhpc3RzIGlmIFNMQSBoYXMgZW5kZWRcbn1cblxuZXhwb3J0IHR5cGUgU2xhRGF0YU1hcCA9IHtcbiAgICBbaWQ6IG51bWJlcl06IFNsYURhdGE7XG59XG5cbmV4cG9ydCB0eXBlIENhcmRBY3Rpb24gPSBDcmVhdGVDYXJkQWN0aW9uIHwgVXBkYXRlQ2FyZEFjdGlvbjtcblxuZXhwb3J0IHR5cGUgVXBkYXRlQ2FyZEFjdGlvbiA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGRhdGE6IHtcbiAgICAgICAgbGlzdEFmdGVyOiB7aWQ6IHN0cmluZ307XG4gICAgICAgIGxpc3RCZWZvcmU6IHtpZDogc3RyaW5nfTtcbiAgICB9O1xuICAgIHR5cGU6IHR5cGVvZiBDYXJkQWN0aW9uVHlwZS51cGRhdGVDYXJkO1xuICAgIGRhdGU6IHN0cmluZzsgLy8gZm9ybWF0IDIwMTktMTEtMjlUMjE6MDU6MjguNTEwWlxufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVDYXJkQWN0aW9uID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZGF0YToge1xuICAgICAgICBsaXN0OiB7aWQ6IHN0cmluZ307XG4gICAgfTtcbiAgICB0eXBlOiB0eXBlb2YgQ2FyZEFjdGlvblR5cGUuY3JlYXRlQ2FyZDtcbiAgICBkYXRlOiBzdHJpbmc7IC8vIGZvcm1hdCAyMDE5LTExLTI5VDIxOjA1OjI4LjUxMFpcbn1cblxudHlwZSBOYW1lQW5kSWQgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIExpc3QgPSBOYW1lQW5kSWQ7XG5cbmV4cG9ydCB0eXBlIEJvYXJkQWN0aW9uID0ge1xuICAgIGRhdGE6IHtcbiAgICAgICAgYm9hcmQ6IE5hbWVBbmRJZDtcbiAgICAgICAgY2FyZDogTmFtZUFuZElkO1xuICAgICAgICBsaXN0PzogTmFtZUFuZElkO1xuICAgICAgICBsaXN0QmVmb3JlPzogTmFtZUFuZElkO1xuICAgICAgICBsaXN0QWZ0ZXI/OiBOYW1lQW5kSWQ7XG4gICAgfTtcbiAgICBkYXRlOiBzdHJpbmc7XG4gICAgdHlwZTogQ2FyZEFjdGlvblR5cGU7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDb25maWd1cmF0aW9ucyA9ICh0KTogUHJvbWlzZTxTbGFDb25maWd1cmF0aW9uW10gfCB2b2lkPiA9PiB0LmdldCgnYm9hcmQnLCAnc2hhcmVkJywgJ2NvbmZpZycpO1xuZXhwb3J0IGNvbnN0IHNldENvbmZpZ3VyYXRpb25zID0gKHQsIGNvbmZpZzogU2xhQ29uZmlndXJhdGlvbltdKTogdm9pZCA9PiB0LnNldCgnYm9hcmQnLCAnc2hhcmVkJywgJ2NvbmZpZycsIGNvbmZpZyk7XG5leHBvcnQgY29uc3QgZ2V0U2xhRGF0YSA9ICh0KTogUHJvbWlzZTxTbGFEYXRhTWFwIHwgdm9pZD4gPT4gdC5nZXQoJ2NhcmQnLCAnc2hhcmVkJywgJ3NsYURhdGEnKTtcbmV4cG9ydCBjb25zdCBzZXRTbGFEYXRhID0gKHQsIHNsYURhdGE6IFNsYURhdGFNYXApOiB2b2lkID0+IHQuc2V0KCdjYXJkJywgJ3NoYXJlZCcsICdzbGFEYXRhJywgc2xhRGF0YSk7XG5leHBvcnQgY29uc3QgZ2V0VG9rZW4gPSAodCk6IFByb21pc2U8c3RyaW5nIHwgdm9pZD4gPT4gdC5nZXQoJ21lbWJlcicsICdwcml2YXRlJywgJ2F1dGhUb2tlbicpO1xuZXhwb3J0IGNvbnN0IHNldFRva2VuID0gKHQsIHRva2VuKTogUHJvbWlzZTx2b2lkPiA9PiB0LnNldCgnbWVtYmVyJywgJ3ByaXZhdGUnLCAnYXV0aFRva2VuJywgdG9rZW4pO1xuXG4vKipcbiAqIFRPRE86IHRoZSBwcm9ibGVtIHdpdGggZ2V0dGluZyBhbGwgYm9hcmQgYWN0aW9ucyBpcyB0aGF0IHRoZXJlIGlzIGEgbGltaXQgb2YgMTAwMFxuICogQW5kIHRoYXQgdGhlIGFjdGlvbnMgZm9yIGNsb3NlZCBjYXJkcyBhcmUgYWxzbyBjb3VudGVkLlxuICovIFxuZXhwb3J0IGNvbnN0IGdldEJvYXJkQWN0aW9ucyA9IGFzeW5jICh0KTogUHJvbWlzZTxCb2FyZEFjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgeyBib2FyZDogYm9hcmRJZCB9ID0gdC5nZXRDb250ZXh0KCk7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRUb2tlbih0KTtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkudHJlbGxvLmNvbS8xL2JvYXJkcy8ke2JvYXJkSWR9L2FjdGlvbnM/bGltaXQ9MTAwMCZmaWx0ZXI9dXBkYXRlQ2FyZDppZExpc3QsY3JlYXRlQ2FyZCZtZW1iZXI9ZmFsc2UmbWVtYmVyQ3JlYXRvcj1mYWxzZSZrZXk9JHtrZXl9JnRva2VuPSR7dG9rZW59YDtcbiAgICByZXR1cm4gYXhpb3MuZ2V0KHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgJiYgZS5yZXNwb25zZSAmJiBlLnJlc3BvbnNlLnN0YXR1cyAmJiBlLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9rZW4odCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZEFjdGlvbnMgPSBhc3luYyAodCk6IFByb21pc2U8Q2FyZEFjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgeyBjYXJkOiBjYXJkSWQgfSA9IHQuZ2V0Q29udGV4dCgpO1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0VG9rZW4odCk7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLnRyZWxsby5jb20vMS9jYXJkcy8ke2NhcmRJZH0vYWN0aW9ucz9maWx0ZXI9dXBkYXRlQ2FyZDppZExpc3QsY3JlYXRlQ2FyZCZrZXk9JHtrZXl9JnRva2VuPSR7dG9rZW59YDtcbiAgICByZXR1cm4gYXhpb3MuZ2V0KHVybCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZSAmJiBlLnJlc3BvbnNlICYmIGUucmVzcG9uc2Uuc3RhdHVzICYmIGUucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgIHNldFRva2VuKHQsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8vIFRPRE86IGRvbid0IG5lZWQgdG8gY2FsbCBBUEkgZm9yIHRoaXMgd2hlbiB0aGVyZSBpcyB0Lmxpc3RzKClcbmV4cG9ydCBjb25zdCBnZXRMaXN0cyA9IGFzeW5jICh0KTogUHJvbWlzZTxMaXN0W10+ID0+IHtcbiAgICBjb25zdCB7IGJvYXJkOiBib2FyZElkIH0gPSB0LmdldENvbnRleHQoKTtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHQpO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS50cmVsbG8uY29tLzEvYm9hcmRzLyR7Ym9hcmRJZH0vbGlzdHM/Y2FyZHM9bm9uZSZmaWx0ZXI9b3BlbiZrZXk9JHtrZXl9JnRva2VuPSR7dG9rZW59YDtcbiAgICByZXR1cm4gYXhpb3MuZ2V0KHVybCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZSAmJiBlLnJlc3BvbnNlICYmIGUucmVzcG9uc2Uuc3RhdHVzICYmIGUucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgIHNldFRva2VuKHQsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFnRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/trello-util.ts\n");

/***/ })

/******/ });