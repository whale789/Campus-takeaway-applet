import{v as e,o as t,a as i,p as n,e as s,t as o,n as r,b as a,c as l,w as d,i as u,f as h,d as f,j as p}from"./index-745be673.js";import{_ as c}from"./_plugin-vue_export-helper.1b428a4d.js";import{r as m}from"./uni-app.es.4a269a07.js";const w=c({name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA(){return this._isH5=!0,!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created(){this._isH5=null},methods:{isMail(){return this.href.startsWith("mailto:")},isTel(){return this.href.startsWith("tel:")},openURL(){window.open(this.href)},makePhoneCall(t){e({phoneNumber:t})}}},[["render",function(e,h,f,p,c,m){const w=u;return m.isShowA?(t(),i("a",{key:0,class:r(["uni-link",{"uni-link--withline":!0===f.showUnderLine||"true"===f.showUnderLine}]),href:f.href,style:a({color:f.color,fontSize:f.fontSize+"px"}),download:f.download},[n(e.$slots,"default",{},(()=>[s(o(f.text),1)]),!0)],14,["href","download"])):(t(),l(w,{key:1,class:r(["uni-link",{"uni-link--withline":!0===f.showUnderLine||"true"===f.showUnderLine}]),style:a({color:f.color,fontSize:f.fontSize+"px"}),onClick:m.openURL},{default:d((()=>[n(e.$slots,"default",{},(()=>[s(o(f.text),1)]),!0)])),_:3},8,["class","style","onClick"]))}],["__scopeId","data-v-45d57582"]]);const S=c({data:()=>({href:"https://uniapp.dcloud.io/component/README?id=uniui"}),methods:{}},[["render",function(e,i,n,o,r,a){const c=h,S=u,_=m(p("uni-link"),w);return t(),l(c,{class:"container"},{default:d((()=>[f(c,{class:"intro"},{default:d((()=>[s("本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。")])),_:1}),f(S,{class:"intro"},{default:d((()=>[s("详见：")])),_:1}),f(_,{href:r.href,text:r.href},null,8,["href","text"])])),_:1})}],["__scopeId","data-v-a60c8e9c"]]);export{S as default};