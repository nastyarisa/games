(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,t,n){e.exports={wrapper:"Tictactoe_wrapper__2vrMt",header:"Tictactoe_header__1TmCx",content:"Tictactoe_content__13_zw",footer:"Tictactoe_footer__3J_oj",title:"Tictactoe_title__PFeID",radioGroup:"Tictactoe_radioGroup__w0qXW",label:"Tictactoe_label__2z3nw",table:"Tictactoe_table__1-AOh",row:"Tictactoe_row__1azLT",cell:"Tictactoe_cell__2oQK7",btn:"Tictactoe_btn__23Qbm",message:"Tictactoe_message__mN3Fq",cross:"Tictactoe_cross__lF-MI",zero:"Tictactoe_zero__GPqan",winner:"Tictactoe_winner__S5mvC"}},,,,,,,function(e,t,n){e.exports={wrapper:"Message_wrapper__9Qpyl",container:"Message_container__18Idv",open:"Message_open__2sO4A",header:"Message_header__1YVGB",content:"Message_content__3ymKS",footer:"Message_footer__2C_R6",btn:"Message_btn__1h5GJ",icon:"Message_icon__1tp6u"}},,,,function(e,t,n){e.exports={wrapper:"Main_wrapper__1YPAv",title:"Main_title__3GtJ7"}},,function(e,t,n){e.exports={timer:"Timer_timer__2KmgB"}},function(e,t,n){e.exports={close:"Icon_close__nJogP"}},,function(e,t,n){e.exports=n(26)},,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(11),i=n.n(o),c=(n(23),n(24),n(2)),s=n(3),l=n(5),u=n(4),m=n(6),h=n(12),f=n.n(h),d=n(9),p=n.n(d),v=n(13),g=n(1),b=n.n(g),_=n(7),w=n(16),k={cross:"\u043a\u0440\u0435\u0441\u0442\u0438\u043a",zero:"\u043d\u043e\u043b\u0438\u043a"},O=function e(){var t=this;Object(c.a)(this,e),this.size=3,this.gameStarted=!1,this.whoWalkNow=null,this.mode="alone",this.getNullData=function(){var e=[];if(t.size){for(var n=0;n<t.size;n++){e[n]=[];for(var r=0;r<t.size;r++)e[n][r]={}}return e}},this.handlerStroke=function(e,n,r,a){var o=N(r);return t.gameStarted?t.whoWalkNow="cross"===t.whoWalkNow?"zero":"cross":(t.gameStarted=!0,t.whoWalkNow="cross",t.mode="bot"===a?"bot":"alone"),o[e][n].name=t.whoWalkNow,o},this.handlerStrokeBot=function(e){var n=N(e),r=t.botMove(n);if(r){var a=Object(w.a)(r,2),o=a[0],i=a[1];return t.whoWalkNow="zero",n[o][i].name=t.whoWalkNow,n}return e},this.botMove=function(e){var n=t.coordForWin(e,"zero");return n||((n=t.coordForWin(e,"cross"))?n:(n=t.coordForNextMove(e,"cross"))?n:n=t.botMoveRandom(e))},this.coordForWin=function(e,n){var r=t.searchInFirstDiaronal(e,n,1);return r||((r=t.searchInSecondDiaronal(e,n,1))?r:(r=t.rowSearch(e,n,1))?r:r=t.columnSearch(e,n,1))},this.coordForNextMove=function(e,n){var r=[],a=t.searchInFirstDiaronal(e,n,2);return a&&(r=[].concat(Object(_.a)(r),Object(_.a)(a))),(a=t.searchInSecondDiaronal(e,n,2))&&(r=[].concat(Object(_.a)(r),Object(_.a)(a))),(a=t.rowSearch(e,n,2))&&(r=[].concat(Object(_.a)(r),Object(_.a)(a))),(a=t.columnSearch(e,n,2))&&(r=[].concat(Object(_.a)(r),Object(_.a)(a))),t.searchRandomItemFromArray(r)},this.searchInSecondDiaronal=function(e,t,n){for(var r=[],a=0;a<e.length;a++){var o=e[e.length-1-a][a].name;if(o&&o!==t)return null;o||r.push([e.length-1-a,a])}return r.length===n?r.length>1?r:r[0]:null},this.searchInFirstDiaronal=function(e,t,n){for(var r=[],a=0;a<e.length;a++){var o=e[a][a].name;if(o&&o!==t)return null;o||r.push([a,a])}return r.length===n?r.length>1?r:r[0]:null},this.rowSearch=function(e,t,n){for(var r=0;r<e.length;r++){for(var a=[],o=0;o<e[r].length;o++){var i=e[r][o].name;if(i&&i!==t){a=[];break}i||a.push([r,o])}if(a.length===n)return a.length>1?a:a[0]}return null},this.columnSearch=function(e,t,n){for(var r=0;r<e.length;r++){for(var a=[],o=0;o<e[r].length;o++){var i=e[o][r].name;if(i&&i!==t){a=[];break}i||a.push([o,r])}if(a.length===n)return a.length>1?a:a[0]}return null},this.searchRandomItemFromArray=function(e){if(e)return e[Math.floor(Math.random()*(e.length-0))+0]},this.botMoveRandom=function(e){for(var n=[],r=0;r<e.length;r++)for(var a=e[r],o=0;o<a.length;o++)a[o].name||n.push([r,o]);return t.searchRandomItemFromArray(n)},this.movesOver=function(e){if(!e.length)return!1;for(var t=0;t<e.length;t++)for(var n=0;n<e.length;n++)if(!e[t][n].name)return!1;return!0},this.getWinner=function(e){if(!e.length)return null;for(var t=0;t<e.length;t++)for(var n=0;n<e.length;n++)if(e[t][n].winner)return e[t][n].name;return null},this.setWinnerStyle=function(e){var n=N(e);if(!n.length)return n;if(t.checkLeftDiagonal(n)){for(var r=0;r<n.length;r++)n[r][r].winner=!0;return n}if(t.checkRightDiagonal(n)){for(var a=0;a<n.length;a++)n[e.length-1-a][a].winner=!0;return n}for(var o=0;o<n.length;o++)if(t.checkRow(n[o])){for(var i=0;i<n[o].length;i++)n[o][i].winner=!0;return n}var c=t.findWinner\u0421olumnIndex(n);if(-1!==c){for(var s=0;s<n.length;s++)n[s][c].winner=!0;return n}return n},this.checkRow=function(e){if(!e.length)return!1;var t=e[0].name;if(!t)return!1;for(var n=0;n<e.length;n++)if(e[n].name!==t)return!1;return!0},this.checkLeftDiagonal=function(e){var t=e[0][0].name;if(!t)return!1;for(var n=0;n<e.length;n++)if(e[n][n].name!==t)return!1;return!0},this.checkRightDiagonal=function(e){var t=e[e.length-1][0].name;if(!t)return!1;for(var n=0;n<e.length;n++)if(e[e.length-1-n][n].name!==t)return!1;return!0},this.findWinner\u0421olumnIndex=function(e){if(!e.length)return-1;for(var t=0;t<e.length;t++){var n=e[0][t].name;if(n){for(var r=!0,a=0;a<e.length;a++)if(e[a][t].name!==n){r=!1;break}if(r)return t}}return-1}};function N(e){if(null===e||"object"!==typeof e)return e;if(e instanceof Array&&e.length){for(var t=[],n=0;n<e.length;n++)t[n]=N(e[n]);return t}if(e instanceof Object){var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=N(e[a]));return r}}var S=n(14),j=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).timerWasStoped=!1,n.clearTimer=function(){clearInterval(n.timer),n.setState({time:0})},n.setTimer=function(){n.props.onChange&&"function"===typeof n.props.onChange?n.timer=setInterval(n.props.onChange,1e3):n.timer=setInterval(function(){return n.setState(function(e){return{time:parseInt(e.time)+1}})},1e3)},n.getTime=function(e){var t,n,r;return t=e,e>=60&&(t=e-60*(n=parseInt(e/60))),n>=60&&(n-=60*(r=parseInt(n/60))),r?"".concat(r,":").concat(n>9?n:"0"+n,":").concat(t>9?t:"0"+t):n?"".concat(n,":").concat(t>9?t:"0"+t):"".concat(t)},n.state={time:0},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setTimer()}},{key:"shouldComponentUpdate",value:function(e,t){return e.stop?(clearInterval(this.timer),!1):(!1===e.stop&&!0===this.props.stop&&this.setTimer(),!0)}},{key:"render",value:function(){return r.createElement("div",{className:S.timer},this.props.label?"\u0412\u0440\u0435\u043c\u044f:":null,this.getTime(this.props.value?this.props.value:this.state.time))}}]),t}(r.Component),y=n(8),E=n.n(y),T=n(15),W=n.n(T),C=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.createElement("i",{onClick:this.props.onClick,className:"".concat(W.a[this.props.name]," ").concat(this.props.className)})}}]),t}(r.Component),M=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).buttonHandler=function(e){"function"===typeof n.props.confirmationHandler&&n.props.confirmationHandler()},n.state={isOpen:!0,message:""},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return this.props.message?r.createElement("div",{className:E.a.wrapper,onClick:this.buttonHandler},r.createElement("section",{className:E.a.container,onClick:function(e){return e.stopPropagation()}},r.createElement(C,{name:"close",className:E.a.icon,onClick:this.buttonHandler}),r.createElement("header",{className:E.a.header},"\u0418\u0433\u0440\u0430 \u043e\u043a\u043e\u043d\u0447\u0435\u043d\u0430!"),r.createElement("main",{className:E.a.content},this.props.message),r.createElement("footer",{className:E.a.footer},r.createElement("button",{className:E.a.btn,onClick:this.buttonHandler},"\u041d\u0430\u0447\u0430\u0442\u044c \u0437\u0430\u043d\u043e\u0432\u043e")))):null}}]),t}(r.Component),I=(new Map([["bot","\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0434\u0435\u0442 \u0438\u0433\u0440\u0430 \u0432 \u0440\u0435\u0436\u0438\u043c\u0435 \u0431\u043e\u0442\u0430"],["alone","\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0434\u0435\u0442 \u0438\u0433\u0440\u0430 \u0432 \u0440\u0435\u0436\u0438\u043c\u0435 \u0441\u0430\u043c \u0441 \u0441\u043e\u0431\u043e\u0439"]]),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).store=new O,n.timerStoped=!1,n.setNullData=function(){n.setState({data:n.store.getNullData()})},n.loading=!1,n.handlerStroke=function(){var e=Object(v.a)(p.a.mark(function e(t,r){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.loading){e.next=2;break}return e.abrupt("return");case 2:if(!n.state.data[t][r].name){e.next=5;break}return e.abrupt("return");case 5:if(!n.gameOver()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,n.setState(function(e,a){var o=n.store.handlerStroke(t,r,e.data,e.mode);return{data:o=n.store.setWinnerStyle(o)}});case 9:if("bot"!==n.store.mode||"cross"!==n.store.whoWalkNow){e.next=19;break}if(!n.gameOver()){e.next=12;break}return e.abrupt("return");case 12:return n.loading=!0,e.next=15,n.timeout(200);case 15:return e.next=17,n.setState(function(e,t){var r=n.store.handlerStrokeBot(e.data);return{data:r=n.store.setWinnerStyle(r)}});case 17:n.loading=!1,console.log("loading",n.loading);case 19:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),n.timeout=function(e){return new Promise(function(t){return setTimeout(t,e)})},n.getStyle=function(e,t){var r=n.state.data[e][t].name;return r?b.a[r]:""},n.getWinnerStyle=function(e,t){return n.state.data[e][t].winner?b.a.winner:""},n.gameOver=function(){var e=n.state.data;return!(!n.store.movesOver(e)&&!n.store.getWinner(e))},n.startNewGame=function(){n.setNullData(),n.store.gameStarted=!1,n.store.whoWalkNow=null,n.clearTimer()},n.clearTimer=function(){n.timerStoped=!1,n.setState({time:0})},n.setTimer=function(){n.setState(function(e){return{time:parseInt(e.time)+1}})},n.modeHandler=function(){n.setState(function(e){return{mode:"bot"===e.mode?"alone":"bot"}})},n.selectMode=function(){return r.createElement("div",{className:b.a.radioGroup},r.createElement("input",{id:"radio_bot",type:"radio",checked:"bot"===n.state.mode,name:"mode",onChange:n.modeHandler}),r.createElement("label",{htmlFor:"radio_bot",className:b.a.label},"\u0421 \u0431\u043e\u0442\u043e\u043c"),r.createElement("input",{id:"radio_alone",type:"radio",checked:"alone"===n.state.mode,name:"mode",onChange:n.modeHandler}),r.createElement("label",{htmlFor:"radio_alone",className:b.a.label},"\u0421\u0430\u043c \u0441 \u0441\u043e\u0431\u043e\u0439"))},n.messageConfirm=function(){n.startNewGame()},n.state={data:[],time:0,mode:"bot"},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setNullData()}},{key:"render",value:function(){var e=this,t=this.state.data;return r.createElement("div",{className:b.a.wrapper},r.createElement("div",{className:b.a.header},r.createElement("h1",{className:b.a.title},"\u041a\u0440\u0435\u0441\u0442\u0438\u043a\u0438-\u043d\u043e\u043b\u0438\u043a\u0438"),r.createElement("div",{className:b.a.timer},r.createElement(j,{value:this.state.time,onChange:this.setTimer,stop:this.timerStoped,label:!1}))),r.createElement("div",{className:b.a.content},r.createElement("div",{className:b.a.table},this.state.data.length?this.state.data.map(function(t,n){return r.createElement("div",{className:b.a.row,key:"row"+n},t.map(function(t,a){return r.createElement("div",{key:"cell"+a,className:"".concat(b.a.cell," ").concat(e.getStyle(n,a)," \n                                    ").concat(e.getWinnerStyle(n,a),"\n                                    "),onClick:function(){return e.handlerStroke(n,a)}})}))}):null),this.selectMode()),r.createElement("div",{className:b.a.footer},r.createElement("button",{className:b.a.btn,onClick:this.startNewGame},"\u041d\u043e\u0432\u0430\u044f \u0438\u0433\u0440\u0430")),r.createElement(M,{message:function(){var n=e.store.getWinner(t);return n?(e.timerStoped=!0,"\u041f\u043e\u0431\u0435\u0434\u0438\u043b ".concat(k[n],".")):e.store.movesOver(t)?(e.timerStoped=!0,"\u0417\u0430\u043a\u043e\u043d\u0447\u0438\u043b\u0438\u0441\u044c \u0445\u043e\u0434\u044b."):null}(),confirmationHandler:this.messageConfirm}))}}]),t}(r.Component)),x=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.createElement("div",{className:f.a.wrapper},r.createElement(I,null))}}]),t}(r.Component);var D=function(){return a.a.createElement(x,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[17,1,2]]]);
//# sourceMappingURL=main.d5ceaa56.chunk.js.map