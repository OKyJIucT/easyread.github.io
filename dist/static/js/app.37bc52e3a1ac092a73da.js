webpackJsonp([1],{126:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(125),i=n(344),a=n.n(i),l=n(332),o=(n.n(l),n(338)),s=n.n(o),u=n(128);r.a.use(a.a),r.a.config.productionTip=!1,new r.a({el:"#app",router:u.a,template:"<App/>",components:{App:s.a}})},128:function(t,e,n){"use strict";var r=n(125),i=n(342),a=n(339),l=n.n(a);r.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Hello",component:l.a}]})},129:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(334),i=n.n(r);e.default={data:function(){return{text:null,uniqWordsCount:0,loader:null,loading:!1,clipped:!1,drawer:!0,fixed:!1,uniqTextArray:[],items:[{icon:"bubble_chart",title:"Words"},{icon:"bubble_chart",title:"Articles"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Translater"}},methods:{analyze:function(){var t=this.text.split(" "),e=i.a.uniq(t).filter(function(t){return t.match(/^[a-zA-Z]+$/)});this.uniqTextArray=e.sort(),this.uniqWordsCount=this.uniqTextArray.length}}}},130:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js PWA"}}}},332:function(t,e){},333:function(t,e){},338:function(t,e,n){var r=n(124)(n(129),n(340),null,null,null);t.exports=r.exports},339:function(t,e,n){function r(t){n(333)}var i=n(124)(n(130),n(341),r,null,null);t.exports=i.exports},340:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{light:"light"}},[n("v-navigation-drawer",{attrs:{fixed:"fixed","mini-variant":t.miniVariant,clipped:t.clipped,app:"app"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",[n("v-list-tile",{attrs:{avatar:""},on:{click:function(t){}}},[n("v-list-tile-avatar",[n("v-icon",[t._v("account_circle")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Pavel Gnzales")]),n("v-list-tile-sub-title",[t._v("Premium ")])],1),n("v-list-tile-action",[n("v-btn",{attrs:{icon:"",ripple:""}},[n("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("more_vert")])],1)],1)],1),t._l(t.items,function(e,r){return n("v-list-tile",{key:r,attrs:{value:"true",exact:"exact"},on:{click:function(t){}}},[n("v-list-tile-action",[n("v-icon",{attrs:{light:"light"},domProps:{innerHTML:t._s(e.icon)}})],1),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})],2)],1),n("v-toolbar",{attrs:{fixed:"fixed",app:"app","clipped-left":t.clipped}},[n("v-toolbar-side-icon",{attrs:{light:"light"},on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}})],1),n("v-content",[n("v-container",{attrs:{fluid:"fluid"}},[n("v-text-field",{attrs:{name:"input-1",label:"Label Text",textarea:"textarea"},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),n("v-btn",{attrs:{color:"secondary",loading:t.loading,disabled:t.loading},nativeOn:{click:function(e){t.analyze()}}},[t._v("Analyze")]),t._v("Uniq words count "+t._s(t.uniqWordsCount)),n("v-list",t._l(t.uniqTextArray,function(e){return n("v-list-tile",{on:{click:function(t){}}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e))])],1)],1)}))],1)],1),n("v-footer",{attrs:{fixed:t.fixed,app:"app"}},[n("span",[t._v("© 2017")])])],1)},staticRenderFns:[]}},341:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0,!1,!1),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1,!1,!1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Core Docs")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Forum")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://chat.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("Vue Community Chat")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[t._v("Twitter")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank",rel:"noopener"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("vue-router")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("vuex")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("vue-loader")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[t._v("awesome-vue")])])])}]}},346:function(t,e,n){n(127),t.exports=n(126)}},[346]);
//# sourceMappingURL=app.37bc52e3a1ac092a73da.js.map