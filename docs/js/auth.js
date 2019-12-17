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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _trello_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trello-util */ \"./src/trello-util.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst t = TrelloPowerUp.iframe();\nfunction onAuthenticate() {\n    return Trello.authorize({\n        type: \"popup\",\n        name: \"SLAs for Trello\",\n        expiration: \"never\",\n        return_url: \"https://emgoto.github.io/trello-sla/\",\n        success: () => {\n            Object(_trello_util__WEBPACK_IMPORTED_MODULE_0__[\"setToken\"])(t, Trello.token());\n        },\n        error: () => { },\n    });\n}\n;\nt.render(function () {\n    return __awaiter(this, void 0, void 0, function* () {\n        document.getElementById('authenticate-btn').onclick = onAuthenticate;\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0aC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXV0aC50cz9jMGJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldFRva2VuIH0gZnJvbSAnLi90cmVsbG8tdXRpbCc7XG5cbmRlY2xhcmUgY29uc3QgVHJlbGxvUG93ZXJVcDogYW55O1xuY29uc3QgdCA9IFRyZWxsb1Bvd2VyVXAuaWZyYW1lKCk7XG5kZWNsYXJlIGNvbnN0IFRyZWxsbzogYW55O1xuXG5mdW5jdGlvbiBvbkF1dGhlbnRpY2F0ZSgpIHtcbiAgcmV0dXJuIFRyZWxsby5hdXRob3JpemUoe1xuICAgIHR5cGU6IFwicG9wdXBcIixcbiAgICBuYW1lOiBcIlNMQXMgZm9yIFRyZWxsb1wiLFxuICAgIGV4cGlyYXRpb246IFwibmV2ZXJcIixcbiAgICByZXR1cm5fdXJsOlwiaHR0cHM6Ly9lbWdvdG8uZ2l0aHViLmlvL3RyZWxsby1zbGEvXCIsIFxuICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIHNldFRva2VuKHQsIFRyZWxsby50b2tlbigpKTtcbiAgICB9LFxuICAgIGVycm9yOiAoKSA9PiB7IH0sXG4gIH0pO1xufTtcbiAgXG50LnJlbmRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhlbnRpY2F0ZS1idG4nKS5vbmNsaWNrID0gb25BdXRoZW50aWNhdGU7XG59KTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUFBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/auth.ts\n");

/***/ }),

/***/ "./src/trello-util.ts":
/*!****************************!*\
  !*** ./src/trello-util.ts ***!
  \****************************/
/*! exports provided: Condition, CardActionType, getConfigurations, setConfigurations, getSlaData, setSlaData, getToken, setToken, getCardActions, getLists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Condition\", function() { return Condition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardActionType\", function() { return CardActionType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getConfigurations\", function() { return getConfigurations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setConfigurations\", function() { return setConfigurations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSlaData\", function() { return getSlaData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSlaData\", function() { return setSlaData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getToken\", function() { return getToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setToken\", function() { return setToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCardActions\", function() { return getCardActions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLists\", function() { return getLists; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst key = '652d72f229f65b3457533bd55fdcf436';\n// Right now we only provide being in a column as starting the SLA\nvar Condition;\n(function (Condition) {\n    Condition[\"ColumnName\"] = \"COLUMN_NAME\";\n})(Condition || (Condition = {}));\nvar CardActionType;\n(function (CardActionType) {\n    CardActionType[\"createCard\"] = \"createCard\";\n    CardActionType[\"updateCard\"] = \"updateCard\";\n})(CardActionType || (CardActionType = {}));\nconst getConfigurations = (t) => t.get('board', 'shared', 'config');\nconst setConfigurations = (t, config) => t.set('board', 'shared', 'config', config);\nconst getSlaData = (t) => t.get('card', 'shared', 'slaData');\nconst setSlaData = (t, slaData) => t.set('card', 'shared', 'slaData', slaData);\nconst getToken = (t) => t.get('member', 'private', 'authToken');\nconst setToken = (t, token) => t.set('member', 'private', 'authToken', token);\nconst getCardActions = (t) => __awaiter(void 0, void 0, void 0, function* () {\n    const { card: cardId } = t.getContext();\n    const token = yield getToken(t);\n    const url = `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:idList,createCard&key=${key}&token=${token}`;\n    return axios.get(url).then(response => response.data).catch((e) => {\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            setToken(t, undefined);\n        }\n    });\n});\nconst getLists = (t) => __awaiter(void 0, void 0, void 0, function* () {\n    const { board: boardId } = t.getContext();\n    const token = yield getToken(t);\n    const url = `https://api.trello.com/1/boards/${boardId}/lists?cards=none&filter=open&key=${key}&token=${token}`;\n    return axios.get(url).then(response => response.data).catch((e) => {\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            setToken(t, undefined);\n        }\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHJlbGxvLXV0aWwudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3RyZWxsby11dGlsLnRzP2JhYjciXSwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBheGlvczogYW55O1xuXG5jb25zdCBrZXkgPSAnNjUyZDcyZjIyOWY2NWIzNDU3NTMzYmQ1NWZkY2Y0MzYnO1xuXG4vLyBSaWdodCBub3cgd2Ugb25seSBwcm92aWRlIGJlaW5nIGluIGEgY29sdW1uIGFzIHN0YXJ0aW5nIHRoZSBTTEFcbmV4cG9ydCBlbnVtIENvbmRpdGlvbiB7XG4gICAgQ29sdW1uTmFtZSA9IFwiQ09MVU1OX05BTUVcIixcbn1cblxuZXhwb3J0IGVudW0gQ2FyZEFjdGlvblR5cGUgeyBcbiAgICBjcmVhdGVDYXJkID0gXCJjcmVhdGVDYXJkXCIsXG4gICAgdXBkYXRlQ2FyZCA9IFwidXBkYXRlQ2FyZFwiXG59XG5cbmV4cG9ydCB0eXBlIFNsYUNvbmRpdGlvbiA9IHtcbiAgICB0eXBlOiBDb25kaXRpb247XG4gICAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU2xhQ29uZmlndXJhdGlvbiA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdGFydENvbmRpdGlvbjogU2xhQ29uZGl0aW9uO1xuICAgIGVuZENvbmRpdGlvbjogU2xhQ29uZGl0aW9uO1xuICAgIHRpbWU6IG51bWJlcjsgLy8gTWludXRlc1xufVxuXG5leHBvcnQgdHlwZSBTbGFEYXRhID0ge1xuICAgIHN0YXJ0VGltZT86IG51bWJlcjsgLy8gVW5peCB0aW1lc3RhbXAgbWlsbGlzZWNvbmRzLiBPbmx5IGV4aXN0cyBpZiBTTEEgaGFzIHN0YXJ0ZWRcbiAgICBlbmRUaW1lPzogbnVtYmVyOyAvLyBVbml4IHRpbWVzdGFtcCBpbiBtaWxsaXNlY29uZHMuIE9ubHkgZXhpc3RzIGlmIFNMQSBoYXMgZW5kZWRcbn1cblxuZXhwb3J0IHR5cGUgU2xhRGF0YU1hcCA9IHtcbiAgICBbaWQ6IG51bWJlcl06IFNsYURhdGE7XG59XG5cbmV4cG9ydCB0eXBlIENhcmRBY3Rpb24gPSBDcmVhdGVDYXJkQWN0aW9uIHwgVXBkYXRlQ2FyZEFjdGlvbjtcblxuZXhwb3J0IHR5cGUgVXBkYXRlQ2FyZEFjdGlvbiA9IHtcbiAgICBkYXRhOiB7XG4gICAgICAgIGxpc3RBZnRlcjoge2lkOiBzdHJpbmd9O1xuICAgICAgICBsaXN0QmVmb3JlOiB7aWQ6IHN0cmluZ307XG4gICAgfTtcbiAgICB0eXBlOiB0eXBlb2YgQ2FyZEFjdGlvblR5cGUudXBkYXRlQ2FyZDtcbiAgICBkYXRlOiBzdHJpbmc7IC8vIGZvcm1hdCAyMDE5LTExLTI5VDIxOjA1OjI4LjUxMFpcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlQ2FyZEFjdGlvbiA9IHtcbiAgICBkYXRhOiB7XG4gICAgICAgIGxpc3Q6IHtpZDogc3RyaW5nfTtcbiAgICB9O1xuICAgIHR5cGU6IHR5cGVvZiBDYXJkQWN0aW9uVHlwZS5jcmVhdGVDYXJkO1xuICAgIGRhdGU6IHN0cmluZzsgLy8gZm9ybWF0IDIwMTktMTEtMjlUMjE6MDU6MjguNTEwWlxufVxuXG5leHBvcnQgdHlwZSBMaXN0ID0ge1xuICAgIGlkOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlndXJhdGlvbnMgPSAodCk6IFByb21pc2U8U2xhQ29uZmlndXJhdGlvbltdIHwgdm9pZD4gPT4gdC5nZXQoJ2JvYXJkJywgJ3NoYXJlZCcsICdjb25maWcnKTtcbmV4cG9ydCBjb25zdCBzZXRDb25maWd1cmF0aW9ucyA9ICh0LCBjb25maWc6IFNsYUNvbmZpZ3VyYXRpb25bXSk6IHZvaWQgPT4gdC5zZXQoJ2JvYXJkJywgJ3NoYXJlZCcsICdjb25maWcnLCBjb25maWcpO1xuZXhwb3J0IGNvbnN0IGdldFNsYURhdGEgPSAodCk6IFByb21pc2U8U2xhRGF0YU1hcCB8IHZvaWQ+ID0+IHQuZ2V0KCdjYXJkJywgJ3NoYXJlZCcsICdzbGFEYXRhJyk7XG5leHBvcnQgY29uc3Qgc2V0U2xhRGF0YSA9ICh0LCBzbGFEYXRhOiBTbGFEYXRhTWFwKTogdm9pZCA9PiB0LnNldCgnY2FyZCcsICdzaGFyZWQnLCAnc2xhRGF0YScsIHNsYURhdGEpO1xuZXhwb3J0IGNvbnN0IGdldFRva2VuID0gKHQpOiBQcm9taXNlPHN0cmluZyB8IHZvaWQ+ID0+IHQuZ2V0KCdtZW1iZXInLCAncHJpdmF0ZScsICdhdXRoVG9rZW4nKTtcbmV4cG9ydCBjb25zdCBzZXRUb2tlbiA9ICh0LCB0b2tlbik6IFByb21pc2U8dm9pZD4gPT4gdC5zZXQoJ21lbWJlcicsICdwcml2YXRlJywgJ2F1dGhUb2tlbicsIHRva2VuKTtcblxuZXhwb3J0IGNvbnN0IGdldENhcmRBY3Rpb25zID0gYXN5bmMgKHQpOiBQcm9taXNlPENhcmRBY3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IHsgY2FyZDogY2FyZElkIH0gPSB0LmdldENvbnRleHQoKTtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHQpO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS50cmVsbG8uY29tLzEvY2FyZHMvJHtjYXJkSWR9L2FjdGlvbnM/ZmlsdGVyPXVwZGF0ZUNhcmQ6aWRMaXN0LGNyZWF0ZUNhcmQma2V5PSR7a2V5fSZ0b2tlbj0ke3Rva2VufWA7XG4gICAgcmV0dXJuIGF4aW9zLmdldCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuZGF0YSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUgJiYgZS5yZXNwb25zZSAmJiBlLnJlc3BvbnNlLnN0YXR1cyAmJiBlLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICBzZXRUb2tlbih0LCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBnZXRMaXN0cyA9IGFzeW5jICh0KTogUHJvbWlzZTxMaXN0W10+ID0+IHtcbiAgICBjb25zdCB7IGJvYXJkOiBib2FyZElkIH0gPSB0LmdldENvbnRleHQoKTtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHQpO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS50cmVsbG8uY29tLzEvYm9hcmRzLyR7Ym9hcmRJZH0vbGlzdHM/Y2FyZHM9bm9uZSZmaWx0ZXI9b3BlbiZrZXk9JHtrZXl9JnRva2VuPSR7dG9rZW59YDtcbiAgICByZXR1cm4gYXhpb3MuZ2V0KHVybCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZSAmJiBlLnJlc3BvbnNlICYmIGUucmVzcG9uc2Uuc3RhdHVzICYmIGUucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgIHNldFRva2VuKHQsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBZ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/trello-util.ts\n");

/***/ })

/******/ });