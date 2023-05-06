import{D as e,m as t,x as a,o as s,a as l,d as i,w as d,F as r,S as n,e as o,t as u,b as c,c as h,h as p,f,k as m,j as y,l as g}from"./index-745be673.js";import{_ as P,a as A}from"./uni-popup-message.9bf2ed06.js";import{r as _}from"./uni-app.es.4a269a07.js";import{a as F}from"./uni-popup.6e285b20.js";import{_ as x}from"./_plugin-vue_export-helper.1b428a4d.js";const k=x({data:()=>({AuditExitId:"",MerchantPicture:"../../static/images/PersonalAvatar.jpg",MerchantName:"山西刀削面",MerchantAddress:"七餐三楼",MerChantPossessor:"张三",PossessorPhone:"15130380905",ReasonForExit:"经营不善",ApplicationTime:"2023-04-19",Handlers:"李四",HandlersPhone:2640055850001,AuditState:"处理中",Feedback:"",color:"",AuditListId:"",ProcessingTime:"",FeedbackEmpty:!1,HaveProcessed:!1,NotProcessed:!1}),onLoad(a){this.AuditListId=a.AuditId,e.callFunction({name:"GetAuditByListId",data:{AuditListId:this.AuditListId}}).then((e=>{this.AuditExitId=e.result.data[0]._id,this.MerchantPicture=e.result.data[0].MerchantPicture,this.MerchantName=e.result.data[0].MerchantName,this.MerchantAddress=e.result.data[0].MerchantAddress,this.MerChantPossessor=e.result.data[0].MerChantPossessor,this.PossessorPhone=e.result.data[0].PossessorPhone,this.ReasonForExit=e.result.data[0].ReasonForExit,this.ApplicationTime=e.result.data[0].ApplicationTime,this.Handlers=e.result.data[0].Handlers,this.HandlersPhone=e.result.data[0].HandlersPhone,this.AuditState=e.result.data[0].AuditState,this.Feedback=e.result.data[0].Feedback,"未处理"==e.result.data[0].AuditState&&(this.color="color:#1296db",this.NotProcessed=!0,this.HaveProcessed=!1),"处理中"==e.result.data[0].AuditState&&(this.color="color:#ffaa00",t().globalData.Account==this.HandlersPhone?(this.NotProcessed=!0,this.HaveProcessed=!1):(this.NotProcessed=!1,this.HaveProcessed=!0)),"已通过"==e.result.data[0].AuditState&&(this.color="color:#00aa00",this.NotProcessed=!1,this.HaveProcessed=!0,this.ProcessingTime=e.result.data[0].ProcessingTime),"已驳回"==e.result.data[0].AuditState&&(this.color="color:#ff0000",this.NotProcessed=!1,this.HaveProcessed=!0,this.ProcessingTime=e.result.data[0].ProcessingTime)}))},methods:{IFFeedbackEmpty(){""==this.Feedback?this.FeedbackEmpty=!0:this.FeedbackEmpty=!1},Approved(){if(0==this.FeedbackEmpty){let s=new Date,l=s.getFullYear(),i=s.getMonth()+1,d=s.getDate();i>=1&&i<=9&&(i="0"+i),d>=0&&d<=9&&(d="0"+d);var t=l+"-"+i+"-"+d;e.callFunction({name:"UpdateAuditListState",data:{AuditListId:this.AuditListId,AuditState:"已通过",HandlersAccount:this.HandlersPhone,Handlers:this.Handlers,ProcessingTime:t,Feedback:this.Feedback}}).then((s=>{e.callFunction({name:"UpdateAuditExitById",data:{AuditExitId:this.AuditExitId,AuditState:"已通过",Feedback:this.Feedback,ProcessingTime:t}}).then((t=>{e.callFunction({name:"UpdateRTTBoardStatus",data:{PossessorPhone:this.PossessorPhone,OnboardingStatus:0}}).then((e=>{a({url:"/pages/Audit/Audit"})}))}))}))}else this.$refs.message.open("center")},Overrule(){if(0==this.FeedbackEmpty){let s=new Date,l=s.getFullYear(),i=s.getMonth()+1,d=s.getDate();i>=1&&i<=9&&(i="0"+i),d>=0&&d<=9&&(d="0"+d);var t=l+"-"+i+"-"+d;e.callFunction({name:"UpdateAuditListState",data:{AuditListId:this.AuditListId,AuditState:"已驳回",HandlersAccount:this.HandlersPhone,Handlers:this.Handlers,ProcessingTime:t,Feedback:this.Feedback}}).then((s=>{e.callFunction({name:"UpdateAuditExitById",data:{AuditExitId:this.AuditExitId,AuditState:"已驳回",Feedback:this.Feedback,ProcessingTime:t}}).then((e=>{a({url:"/pages/Audit/Audit"})}))}))}else this.$refs.message.open("center")}}},[["render",function(e,t,a,x,k,b){const H=f,E=m,I=_(y("uni-easyinput"),P),M=g,S=n,T=_(y("uni-popup-message"),A),v=_(y("uni-popup"),F);return s(),l(r,null,[i(S,null,{default:d((()=>[i(H,{style:{display:"flex","margin-left":"15%"}},{default:d((()=>[i(H,{style:{"margin-top":"8%"}},{default:d((()=>[o("店铺信息：")])),_:1}),i(H,null,{default:d((()=>[i(E,{style:{width:"120rpx",height:"120rpx"},src:k.MerchantPicture,mode:"scaleToFill"},null,8,["src"])])),_:1}),i(H,{style:{"margin-top":"2%","margin-left":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o(u(k.MerchantName),1)])),_:1}),i(H,{style:{"margin-top":"8%","font-size":"25rpx"}},{default:d((()=>[o(u(k.MerchantAddress),1)])),_:1})])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"11.5%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("店铺持有人：")])),_:1}),i(H,null,{default:d((()=>[o(u(k.MerChantPossessor),1)])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"11.5%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("持有人手机：")])),_:1}),i(H,null,{default:d((()=>[o(u(k.PossessorPhone),1)])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"15%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("退出原因：")])),_:1}),i(H,null,{default:d((()=>[o(u(k.ReasonForExit),1)])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"15%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("申请时间：")])),_:1}),i(H,null,{default:d((()=>[o(u(k.ApplicationTime),1)])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"18.5%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("处理人：")])),_:1}),i(H,null,{default:d((()=>[o(u(k.Handlers),1)])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"11%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("处理人账号：")])),_:1}),i(H,null,{default:d((()=>[o(u(k.HandlersPhone),1)])),_:1})])),_:1}),i(H,{style:{display:"flex","margin-left":"15%","margin-top":"3%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("反馈状态：")])),_:1}),i(H,{style:c(k.color)},{default:d((()=>[o(u(k.AuditState),1)])),_:1},8,["style"])])),_:1}),k.NotProcessed?(s(),h(H,{key:0,style:{display:"flex","margin-left":"6%","margin-top":"8%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("处理结果：")])),_:1}),i(H,{style:{width:"70%"}},{default:d((()=>[i(I,{type:"textarea",modelValue:k.Feedback,"onUpdate:modelValue":t[0]||(t[0]=e=>k.Feedback=e),placeholder:"请输入处理结果",onBlur:b.IFFeedbackEmpty},null,8,["modelValue","onBlur"])])),_:1})])),_:1})):p("",!0),k.FeedbackEmpty?(s(),h(H,{key:1,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:d((()=>[o("处理结果不能为空")])),_:1})):p("",!0),k.HaveProcessed?(s(),h(H,{key:2,style:{display:"flex","margin-left":"15%","margin-top":"8%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("处理结果：")])),_:1}),i(H,{style:{width:"70%"}},{default:d((()=>[o(u(k.Feedback),1)])),_:1})])),_:1})):p("",!0),k.HaveProcessed?(s(),h(H,{key:3,style:{display:"flex","margin-left":"15%","margin-top":"8%"}},{default:d((()=>[i(H,null,{default:d((()=>[o("处理时间：")])),_:1}),i(H,{style:{width:"70%"}},{default:d((()=>[o(u(k.ProcessingTime),1)])),_:1})])),_:1})):p("",!0),i(H,{style:{height:"150rpx"}}),k.NotProcessed?(s(),h(H,{key:4,style:{display:"flex","flex-direction":"row","justify-content":"center"}},{default:d((()=>[i(M,{type:"primary",style:{width:"33%"},size:"mini",onClick:b.Approved},{default:d((()=>[o("通过")])),_:1},8,["onClick"]),i(M,{type:"warn",style:{width:"33%"},size:"mini",onClick:b.Overrule},{default:d((()=>[o("驳回")])),_:1},8,["onClick"])])),_:1})):p("",!0),i(H,{style:{height:"200rpx"}})])),_:1}),i(v,{ref:"message",type:"message"},{default:d((()=>[i(T,{type:"error",message:"请先按要求填写内容",duration:2e3})])),_:1},512)],64)}]]);export{k as default};