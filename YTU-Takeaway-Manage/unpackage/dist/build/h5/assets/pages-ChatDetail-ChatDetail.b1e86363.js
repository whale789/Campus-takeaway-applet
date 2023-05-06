import{B as t,D as e,R as a,o as s,c as i,w as r,f as l,d as o,e as n,t as h,a as d,r as g,F as c,b as u,S as m,L as M,l as f,h as p,k as I}from"./index-745be673.js";import{_ as y}from"./_plugin-vue_export-helper.1b428a4d.js";const C=y({data:()=>({ChatId:"",keyboardHeight:0,bottomHeight:0,scrollTop:0,userId:"",chatMsg:"",MsgList:[],UserId:"",UserNickName:"",UserAvatar:"",ManagerId:"",ManagerName:"",ManagerAvatar:"",FirstChatTime:"",IfTime:!0,timer:null}),updated(){this.scrollToBottom()},computed:{windowHeight(){return this.rpxTopx(t().windowHeight)},inputHeight(){return this.bottomHeight+this.keyboardHeight}},onLoad(t){uni.onKeyboardHeightChange((t=>{this.keyboardHeight=this.rpxTopx(t.height-30),this.keyboardHeight<0&&(this.keyboardHeight=0)})),this.ChatId=t.ChatId,e.callFunction({name:"GetChatById",data:{ChatId:this.ChatId}}).then((t=>{this.UserId=t.result.data[0].UserId,this.UserNickName=t.result.data[0].UserNickName,this.UserAvatar=t.result.data[0].UserAvatar,this.ManagerId=t.result.data[0].ManagerId,this.ManagerName=t.result.data[0].ManagerName,this.ManagerAvatar=t.result.data[0].ManagerAvatar,this.MsgList=t.result.data[0].MsgList,this.FirstChatTime=t.result.data[0].MsgList[0].MessageTime}))},onHide(){clearInterval(this.timer),this.timer=null},onShow(){let t=this.ChatId;this.timer=setInterval((function(){e.callFunction({name:"GetChatById",data:{ChatId:t}}).then((a=>{this.UserId=a.result.data[0].UserId,this.UserNickName=a.result.data[0].UserNickName,this.UserAvatar=a.result.data[0].UserAvatar,this.ManagerId=a.result.data[0].ManagerId,this.ManagerName=a.result.data[0].ManagerName,this.ManagerAvatar=a.result.data[0].ManagerAvatar,this.MsgList=a.result.data[0].MsgList,this.FirstChatTime=a.result.data[0].MsgList[0].MessageTime;for(var s=0;s<a.result.data[0].MsgList.length;s++)e.callFunction({name:"UpdateMessageState",data:{ChatId:t,index:s}}).then((t=>{}))}))}),500)},onUnload(){uni.offKeyboardHeightChange()},methods:{focus(){this.scrollToBottom()},blur(){this.scrollToBottom()},rpxTopx(e){let a=750/t().windowWidth*Number(e);return Math.floor(a)},sendHeight(){setTimeout((()=>{let t=a();t.select(".send-msg").boundingClientRect(),t.exec((t=>{this.bottomHeight=this.rpxTopx(t[0].height)}))}),10)},scrollToBottom(t){setTimeout((()=>{let t=a().in(this);t.select("#scrollview").boundingClientRect(),t.select("#msglistview").boundingClientRect(),t.exec((t=>{t[1].height>t[0].height&&(this.scrollTop=this.rpxTopx(t[1].height-t[0].height))}))}),15)},handleSend(){if(this.chatMsg&&/^\s+$/.test(this.chatMsg))this.$modal.showToast("不能发送空白消息");else{let a=new Date,s=a.getFullYear(),i=a.getMonth()+1,r=a.getDate();i>=1&&i<=9&&(i="0"+i),r>=0&&r<=9&&(r="0"+r);var t=s+"-"+i+"-"+r+" "+(a.getHours()<10?"0"+a.getHours():a.getHours())+":"+(a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes())+":"+(a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds());let l={botContent:this.chatMsg,ManagerId:this.ManagerId,ManagerName:this.ManagerName,ManagerAvatar:this.ManagerAvatar,userContent:"",UserId:this.UserId,UserAvatar:this.UserAvatar,UserNickName:this.UserNickName,MessageState:0,MessageTime:t,IfTime:!1};e.callFunction({name:"AddNewMessage",data:{ChatId:this.ChatId,NewMsg:l}}).then((t=>{console.log(t)})),this.MsgList.push(l),this.chatMsg="",this.scrollToBottom()}}}},[["render",function(t,e,a,y,C,v){const b=l,x=I,T=m,U=M,N=f;return s(),i(b,{class:"chat"},{default:r((()=>[o(T,{style:u({height:v.windowHeight-v.inputHeight+"rpx"}),id:"scrollview","scroll-y":"true","scroll-top":C.scrollTop,class:"scroll-view"},{default:r((()=>[o(b,{id:"msglistview",class:"chat-body"},{default:r((()=>[o(b,{style:{display:"flex","flex-direction":"row","justify-content":"center"}},{default:r((()=>[o(b,{style:{"font-size":"25rpx",color:"#9d9d9d"}},{default:r((()=>[n(h(C.FirstChatTime),1)])),_:1})])),_:1}),(s(!0),d(c,null,g(C.MsgList,((t,e)=>(s(),i(b,{key:e},{default:r((()=>[t.IfTime?(s(),i(b,{key:0,style:{display:"flex","flex-direction":"row","justify-content":"center"}},{default:r((()=>[o(b,{style:{"font-size":"25rpx",color:"#9d9d9d"}},{default:r((()=>[n(h(t.MessageTime),1)])),_:2},1024)])),_:2},1024)):p("",!0),""!=t.botContent?(s(),i(b,{key:1,class:"item self"},{default:r((()=>[o(b,{class:"content right"},{default:r((()=>[n(h(t.botContent),1)])),_:2},1024),o(b,{class:"avatar"},{default:r((()=>[o(x,{src:t.ManagerAvatar,mode:"aspectFit"},null,8,["src"])])),_:2},1024)])),_:2},1024)):p("",!0),""!=t.userContent?(s(),i(b,{key:2,class:"item Ai"},{default:r((()=>[o(b,{class:"avatar"},{default:r((()=>[o(x,{src:t.UserAvatar,mode:"aspectFit"},null,8,["src"])])),_:2},1024),o(b,{class:"content left"},{default:r((()=>[n(h(t.userContent),1)])),_:2},1024)])),_:2},1024)):p("",!0)])),_:2},1024)))),128))])),_:1})])),_:1},8,["style","scroll-top"]),o(b,{class:"chat-bottom",style:u({height:`${v.inputHeight}rpx`})},{default:r((()=>[o(b,{class:"send-msg",style:u({bottom:`${C.keyboardHeight}rpx`})},{default:r((()=>[o(b,{class:"uni-textarea"},{default:r((()=>[o(U,{modelValue:C.chatMsg,"onUpdate:modelValue":e[0]||(e[0]=t=>C.chatMsg=t),maxlength:"300","confirm-type":"send",onConfirm:v.handleSend,"show-confirm-bar":!1,"adjust-position":!1,onLinechange:v.sendHeight,onFocus:v.focus,onBlur:v.blur,"auto-height":""},null,8,["modelValue","onConfirm","onLinechange","onFocus","onBlur"])])),_:1}),o(N,{onClick:v.handleSend,class:"send-btn"},{default:r((()=>[n("发送")])),_:1},8,["onClick"])])),_:1},8,["style"])])),_:1},8,["style"])])),_:1})}],["__scopeId","data-v-9e5b9e94"]]);export{C as default};