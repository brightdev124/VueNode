(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-417fbbe9"],{"0209":function(t,s,i){"use strict";i.r(s),i("68ef"),i("35fb")},2445:function(t,s,y){var i,a,e;a=[s,y("ade3"),y("d4ec"),y("bee2"),y("99de"),y("7e84"),y("262e"),y("9ab4"),y("60a3"),y("7d5e"),y("0209"),y("2dad"),y("ca29"),y("8960")],void 0===(e="function"==typeof(i=function(t,s,i,a,e,n,o,r,c,u,l,d,f,p){"use strict";var h=y("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,s=h(s),i=h(i),a=h(a),e=h(e),n=h(n),o=h(o),u=h(u),d=h(d),f=h(f);var g=function(t){function s(){var t;return(0,i.default)(this,s),(t=(0,e.default)(this,(0,n.default)(s).apply(this,arguments))).explainName="全球优惠",t.isRegion=!1,t.regionList=[],t.classifyList=[],t.isClassify=!1,t.currentPage=1,t.couponList=[],t.isLoading=!1,t}return(0,o.default)(s,t),(0,a.default)(s,[{key:"created",value:function(){this.getClassifyList(),this.getCouponsList(this.regionId,this.classifyId,this.currentPage)}},{key:"getCouponsList",value:function(t,s,i){var n=this;this.isLoading=!0,(0,p.getCouponsList)(t,s,i).then(function(t){var s=t.data,i=s.code,a=s.data,e=s.message;0===i?n.couponList.push.apply(n.couponList,a):n.$dialog.alert({message:e})}).catch(function(t){n.$dialog.alert({message:"优惠券列表获取失败，请稍后再试"})}).finally(function(){n.isLoading=!1}),this.getRegionList()}},{key:"getRegionList",value:function(){var e=this;(0,p.getRegionList)().then(function(t){var s=t.data,i=s.code,a=s.data;s.message,0===i&&(e.regionList=a)})}},{key:"showregionList",value:function(){this.isRegion=!0,this.isClassify=!1}},{key:"showClassifyList",value:function(){this.isRegion=!1,this.classifyList.length||this.getClassifyList(),this.isClassify=!0}},{key:"getClassifyList",value:function(){var e=this;(0,p.getClassifyList)().then(function(t){var s=t.data,i=s.code,a=s.data;s.message,0===i&&(e.classifyList=a)})}},{key:"showCoupons",value:function(t,s){var i=this.regionList?this.regionList[t-1].region_name:"全球",a=this.classifyList?this.classifyList[s-1].classify_name:"购物";this.currentPage=1,this.couponList=[],this.$store.commit("changeRegionId",t),this.$store.commit("changeRegionName",i),this.$store.commit("changeClassifyId",s),this.$store.commit("changeClassifyName",a),this.getCouponsList(this.regionId,this.classifyId,this.currentPage),this.isRegion=this.isClassify=!1}},{key:"loadMore",value:function(){this.getCouponsList(this.regionId,this.classifyId,this.currentPage+=1)}},{key:"regionId",get:function(){return this.$store.state.app.regionId}},{key:"regionName",get:function(){return this.$store.state.app.regionName}},{key:"classifyId",get:function(){return this.$store.state.app.classifyId}},{key:"classifyName",get:function(){return this.$store.state.app.classifyName}}]),s}(c.Vue),v=g=(0,r.__decorate)([(0,c.Component)({components:(0,s.default)({Explain:d.default,FooterNav:f.default},u.default.name,u.default)})],g);t.default=v})?i.apply(s,a):i)||(t.exports=e)},"35fb":function(t,s,i){},7155:function(t,s,i){"use strict";i.r(s);var a=i("2445"),e=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(s,t,function(){return a[t]})}(n);s.default=e.a},"7d5e":function(t,s,i){"use strict";i.r(s);var a=i("2638"),o=i.n(a),e=i("d282"),r=i("ea8e"),c=i("ba31"),n=Object(e.a)("skeleton"),u=n[0],l=n[1];function d(e,n,t,s){if(!n.loading)return t.default&&t.default();return e("div",o()([{class:l({animate:n.animate})},Object(c.b)(s)]),[function(){if(n.avatar){var t=Object(r.a)(n.avatarSize);return e("div",{class:l("avatar",n.avatarShape),style:{width:t,height:t}})}}(),e("div",{class:l("content")},[function(){if(n.title)return e("h3",{class:l("title"),style:{width:Object(r.a)(n.titleWidth)}})}(),function(){for(var t,s=[],i=n.rowWidth,a=0;a<n.row;a++)s.push(e("div",{class:l("row"),style:{width:Object(r.a)((t=a,"100%"===i&&t===n.row-1?"60%":Array.isArray(i)?i[t]:i))}}));return s}()])])}d.props={title:Boolean,avatar:Boolean,row:{type:Number,default:0},loading:{type:Boolean,default:!0},animate:{type:Boolean,default:!0},avatarSize:{type:String,default:"32px"},avatarShape:{type:String,default:"round"},titleWidth:{type:[Number,String],default:"40%"},rowWidth:{type:[Number,String,Array],default:"100%"}},s.default=u(d)},a79d:function(t,s,i){"use strict";function a(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{staticClass:"global-coupon-list-wraper"},[a("explain",{attrs:{explainName:i.explainName}}),a("div",{staticClass:"mb10"},[a("div",{staticClass:"condition-wraper"},[a("a",{staticClass:"left-wraper choose-condition",attrs:{href:"javascript:;"},on:{click:i.showregionList}},[a("span",[a("font",[i._v(i._s(i.regionName))])],1)]),a("a",{staticClass:"right-wraper choose-condition",attrs:{href:"javascript:;"},on:{click:i.showClassifyList}},[a("span",[a("font",[i._v(i._s(i.classifyName))])],1)])]),a("div",{staticClass:"list",class:{"dis-block":i.isRegion,"dis-none":!i.isRegion},attrs:{id:"contry-list"}},i._l(i.regionList,function(s,t){return a("a",{key:t,class:{"this-type":i.regionId==s.id},attrs:{href:"javascript:;"},on:{click:function(t){return i.showCoupons(s.id,i.classifyId)}}},[a("span",[i._v(i._s(s.region_name))])])}),0),a("div",{staticClass:"list",class:{"dis-block":i.isClassify,"dis-none":!i.isClassify},attrs:{id:"classify"}},i._l(i.classifyList,function(s,t){return a("a",{key:t,class:{"this-type":i.classifyId==s.id},attrs:{href:"javascript:;"},on:{click:function(t){return i.showCoupons(i.regionId,s.id)}}},[a("span",[i._v(i._s(s.classify_name))])])}),0)]),a("div",{staticClass:"coupon-list-wraper"},[i._l(i.couponList,function(t,s){return a("router-link",{key:s,class:{"use-discount-bg":0==t.coupon_status,"used-bg":1==t.coupon_status,"past-bg":2==t.coupon_status},attrs:{to:{path:"/get-coupon",query:{id:t.id,type:1}}}},[a("div",{staticClass:"shop-ico"},[a("img",{attrs:{src:t.coupon_ico_path,width:"100%",height:"100%",alt:t.coupon_name}})]),a("div",{staticClass:"shop-intro"},[a("div",{staticClass:"shop-title"},[i._v(i._s(t.coupon_name))]),a("div",{staticClass:"shop-price"},[a("span",{staticClass:"condition"},[i._v(i._s(t.coupon_explain))])])]),a("div",{staticClass:"shop-active shop-active-canuse"},[a("p",[i._v("已抢")]),a("p",[i._v(i._s(t.coupon_recived_num))]),a("span",{class:{"use-discount":0==t.coupon_status,used:1==t.coupon_status,past:2==t.coupon_status}})])])}),i.couponList.length&&i.couponList.length%10==0?a("a",{staticClass:"load-more",attrs:{href:"javascript:;"},on:{click:i.loadMore}},[i._v("加载更多")]):i._e(),i.isLoading?a("div",{staticStyle:{"background-color":"white"}},[a("van-skeleton",{attrs:{title:"",avatar:"",row:3}}),a("van-skeleton",{attrs:{title:"",avatar:"",row:3}}),a("van-skeleton",{attrs:{title:"",avatar:"",row:3}}),a("van-skeleton",{attrs:{title:"",avatar:"",row:3}}),a("van-skeleton",{attrs:{title:"",avatar:"",row:3}})],1):i._e()],2),a("footer-nav")],1)}var e=[];i.d(s,"a",function(){return a}),i.d(s,"b",function(){return e})},ade3:function(t,s,i){"use strict";function a(t,s,i){return s in t?Object.defineProperty(t,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[s]=i,t}i.r(s),i.d(s,"default",function(){return a})},d775:function(t,s,i){"use strict";var a=i("ffeb");i.n(a).a},eea6:function(t,s,i){"use strict";i.r(s);var a=i("a79d"),e=i("7155");for(var n in e)"default"!==n&&function(t){i.d(s,t,function(){return e[t]})}(n);i("d775");var o=i("2877"),r=Object(o.a)(e.default,a.a,a.b,!1,null,"7deb9908",null);s.default=r.exports},ffeb:function(t,s,i){}}]);