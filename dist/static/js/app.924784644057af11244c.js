webpackJsonp([1],{129:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(128),r=e(351),o=e.n(r),a=e(337),l=(e.n(a),e(127)),s=e.n(l),c=e(341),u=e.n(c),d=e(131);i.a.use(o.a),i.a.use(s.a),i.a.config.productionTip=!1;var v=new s.a({version:1,database:"words",schemas:[{words:"id, word, translate"}]});new i.a({el:"#app",idb:v,router:d.a,template:"<App/>",components:{App:u.a}})},131:function(t,n,e){"use strict";var i=e(128),r=e(349),o=e(343),a=e.n(o),l=e(344),s=e.n(l),c=e(342),u=e.n(c);i.a.use(r.a),n.a=new r.a({routes:[{path:"/",name:"Main",component:a.a},{path:"/words",name:"Words",component:s.a},{path:"/articles",name:"Articles",component:u.a}]})},132:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{text:null,link:null,uniqWordsCount:0,loader:null,loading:!1,clipped:!1,drawer:!0,fixed:!1,uniqTextArray:[],items:[{icon:"bubble_chart",title:"Main",route:"/"},{icon:"bubble_chart",title:"Words",route:"words"},{icon:"bubble_chart",title:"Articles",route:"articles"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Translater"}}}},133:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{}}}},134:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(125),r=e.n(i),o=e(127);e.n(o);n.default={data:function(){return{text:null,link:null,uniqWordsCount:0,loader:null,loading:!1,uniqTextArray:[],words:[]}},mounted:function(){this.update()},methods:{update:function(){var t=this;this.$db.words.toArray().then(function(n){console.log(n),t.words=n})},analyze:function(){var t=this,n=this.text.split(" "),i=r.a.uniq(n).filter(function(t){return t.match(/^[a-zA-Z]+$/)});this.uniqTextArray=i.filter(function(n){return t.words.findIndex(function(t){return t.word===n})<0}).sort().map(function(t){return t={id:e.i(o.uuid)(),word:t}}),console.log(this.uniqTextArray),this.uniqWordsCount=this.uniqTextArray.length},add:function(t,n){var e=this;console.log(t),this.uniqTextArray.splice(n,1),this.$db.words.add({id:t.id,word:t.word}).then(function(){e.update()})}}}},135:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{words:[]}},mounted:function(){var t=this;this.$db.words.toArray().then(function(n){console.log(n),t.words=n})}}},337:function(t,n){},341:function(t,n,e){var i=e(64)(e(132),e(347),null,null,null);t.exports=i.exports},342:function(t,n,e){var i=e(64)(e(133),e(348),null,null,null);t.exports=i.exports},343:function(t,n,e){var i=e(64)(e(134),e(346),null,null,null);t.exports=i.exports},344:function(t,n,e){var i=e(64)(e(135),e(345),null,null,null);t.exports=i.exports},345:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-content",[e("v-container",{attrs:{fluid:"fluid"}},[e("v-list",t._l(t.words,function(n,i){return e("v-list-tile",{key:i,on:{click:function(t){}}},[e("v-list-tile-content",[t._v(t._s(n.word))]),e("v-list-tile-action",[e("v-icon",{attrs:{light:"light"}},[t._v("playlist_add")])],1)],1)}))],1)],1)},staticRenderFns:[]}},346:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-content",[e("v-container",{attrs:{fluid:"fluid"}},[e("v-text-field",{attrs:{name:"input-1",label:"Label Text",textarea:"textarea"},model:{value:t.text,callback:function(n){t.text=n},expression:"text"}}),e("v-btn",{attrs:{color:"secondary",loading:t.loading,disabled:t.loading},nativeOn:{click:function(n){t.analyze()}}},[t._v("Analyze")]),t._v("Uniq words count "+t._s(t.uniqWordsCount)),e("v-btn",{attrs:{color:"secondary"},nativeOn:{click:function(n){t.addTolocalDB()}}},[t._v("ADD TO LOCAL DB")]),e("v-btn",{attrs:{color:"secondary"},nativeOn:{click:function(n){t.getFromlocalDB()}}},[t._v("GET FROM LOCAL DB")]),e("v-btn",{attrs:{color:"secondary"},nativeOn:{click:function(n){t.getKeysInStorage()}}},[t._v("GET KEYS FROM LOCAL DB")]),e("v-list",t._l(t.uniqTextArray,function(n,i){return e("v-list-tile",{key:i,on:{click:function(e){t.add(n,i)}}},[e("v-list-tile-content",[t._v(t._s(n.word))]),e("v-list-tile-action",[e("v-icon",{attrs:{light:"light"}},[t._v("playlist_add")])],1)],1)}))],1)],1)},staticRenderFns:[]}},347:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-app",{attrs:{light:"light"}},[e("v-navigation-drawer",{attrs:{fixed:"fixed","mini-variant":t.miniVariant,clipped:t.clipped,app:"app"},model:{value:t.drawer,callback:function(n){t.drawer=n},expression:"drawer"}},[e("v-list",[e("v-list-tile",{attrs:{avatar:""},on:{click:function(t){}}},[e("v-list-tile-avatar",[e("v-icon",[t._v("account_circle")])],1),e("v-list-tile-content",[e("v-list-tile-title",[t._v("Pavel Gnzales")]),e("v-list-tile-sub-title",[t._v("Premium ")])],1),e("v-list-tile-action",[e("v-btn",{attrs:{icon:"",ripple:""}},[e("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("more_vert")])],1)],1)],1),t._l(t.items,function(n,i){return e("router-link",{key:i,attrs:{to:n.route}},[e("v-list-tile",{attrs:{value:"true",exact:"exact"},on:{click:function(t){}}},[e("v-list-tile-action",[e("v-icon",{attrs:{light:"light"},domProps:{innerHTML:t._s(n.icon)}})],1),e("v-list-tile-content",[e("v-list-tile-title",{domProps:{textContent:t._s(n.title)}})],1)],1)],1)})],2)],1),e("v-toolbar",{attrs:{fixed:"fixed",app:"app","clipped-left":t.clipped}},[e("v-toolbar-side-icon",{attrs:{light:"light"},on:{click:function(n){n.stopPropagation(),t.drawer=!t.drawer}}}),e("v-toolbar-title",{domProps:{textContent:t._s(t.title)}})],1),e("router-view"),e("v-footer",{attrs:{fixed:t.fixed,app:"app"}},[e("span",[t._v("© 2017")])])],1)},staticRenderFns:[]}},348:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-content",[e("v-container",{attrs:{fluid:"fluid"}},[t._v("Articles")])],1)},staticRenderFns:[]}},353:function(t,n,e){e(130),t.exports=e(129)}},[353]);
//# sourceMappingURL=app.924784644057af11244c.js.map