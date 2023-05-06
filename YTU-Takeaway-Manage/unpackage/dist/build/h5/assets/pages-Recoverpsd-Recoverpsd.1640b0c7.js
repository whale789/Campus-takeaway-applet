import{D as e,u as t,g as n,o as l,a as r,d as a,w as s,F as o,f as i,e as d,c as m,h as u,t as c,j as p,l as f}from"./index-745be673.js";import{_ as F,a as y}from"./uni-popup-message.9bf2ed06.js";import{r as h}from"./uni-app.es.4a269a07.js";import{a as w}from"./uni-popup.6e285b20.js";import{_ as I}from"./_plugin-vue_export-helper.1b428a4d.js";const N=I({data:()=>({FindAccount:"",FindWorkNumber:"",FindName:"",FindAnswer:"",FindNewPsd:"",FindConfirmPsd:"",SecretQuestion:"",IFAccount:!1,IFAccountEmpty:!1,IFWorkNumber:!1,IFWorkNumberEmpty:!1,IFName:!1,IFNameEmpty:!1,IFSecretAnswer:!1,IFSecretAnswerEmpty:!1,IFNewPasswordEmpty:!1,IFConfirmPsaawordEmpty:!1,IFPsdNotSame:!1,timer:null}),onUnload(){clearInterval(this.timer),this.timer=null},methods:{SendAccount(t){""==this.FindAccount?this.IFAccountEmpty=!0:(this.IFAccountEmpty=!1,e.callFunction({name:"GetManagerMsg",data:{Account:this.FindAccount}}).then((e=>{0==e.result.data.length?this.IFAccount=!0:this.IFAccount=!1})))},SendWorkNumber(t){""==this.FindWorkNumber?this.IFWorkNumberEmpty=!0:(this.IFWorkNumberEmpty=!1,e.callFunction({name:"GetManagerMsg",data:{Account:this.FindAccount}}).then((e=>{e.result.data[0].EmployeeNumber==this.FindWorkNumber?this.IFWorkNumber=!1:this.IFWorkNumber=!0})))},SendName(t){""==this.FindName?this.IFNameEmpty=!0:(this.IFNameEmpty=!1,e.callFunction({name:"GetManagerMsg",data:{Account:this.FindAccount}}).then((e=>{e.result.data[0].name==this.FindName?(this.IFName=!1,this.SecretQuestion=e.result.data[0].SecretQuestion):this.IFName=!0})))},SendAnswer(t){""==this.FindAnswer?this.IFSecretAnswerEmpty=!0:(this.IFSecretAnswerEmpty=!1,e.callFunction({name:"GetManagerMsg",data:{Account:this.FindAccount}}).then((e=>{console.log(e.result),e.result.data[0].SecretAnswer==this.FindAnswer?this.IFSecretAnswer=!1:this.IFSecretAnswer=!0})))},SendNewPsd(e){""==this.FindNewPsd?this.IFNewPasswordEmpty=!0:this.IFNewPasswordEmpty=!1},CheckNewPsd(e){""==this.FindConfirmPsd?this.IFConfirmPsaawordEmpty=!0:(this.IFConfirmPsaawordEmpty=!1,this.FindNewPsd!=this.FindConfirmPsd?this.IFPsdNotSame=!0:this.IFPsdNotSame=!1)},UpdatePsd(l){0==this.IFAccount&&0==this.IFAccountEmpty&&0==this.IFWorkNumber&&0==this.IFWorkNumberEmpty&&0==this.IFName&&0==this.IFNameEmpty&&0==this.IFSecretAnswer&&0==this.IFSecretAnswerEmpty&&0==this.IFNewPasswordEmpty&&0==this.IFConfirmPsaawordEmpty&&0==this.IFPsdNotSame?e.callFunction({name:"UpdateManagerPsd",data:{Account:this.FindAccount,Password:this.FindNewPsd}}).then((e=>{t({title:"修改成功",duration:1500}),this.timer=setInterval((function(){console.log("11"),n({url:"/pages/ManagerLogin/ManagerLogin"})}),1500)})):this.$refs.message.open()}}},[["render",function(e,t,n,I,N,g){const A=i,_=h(p("uni-easyinput"),F),P=f,k=h(p("uni-popup-message"),y),E=h(p("uni-popup"),w);return l(),r(o,null,[a(A,null,{default:s((()=>[a(A,{style:{display:"flex","margin-top":"5%","flex-direction":"row","justify-content":"center"}},{default:s((()=>[a(A,{style:{"margin-top":"1.5%"}},{default:s((()=>[d("账号：")])),_:1}),a(A,{style:{width:"60%"}},{default:s((()=>[a(_,{placeholder:"请输入账号",trim:"all",modelValue:N.FindAccount,"onUpdate:modelValue":t[0]||(t[0]=e=>N.FindAccount=e),modelModifiers:{number:!0},onBlur:g.SendAccount,type:"number"},null,8,["modelValue","onBlur"])])),_:1})])),_:1}),N.IFAccount?(l(),m(A,{key:0,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("该账号不存在")])),_:1})):u("",!0),N.IFAccountEmpty?(l(),m(A,{key:1,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("账号不能为空")])),_:1})):u("",!0),a(A,{style:{display:"flex","flex-direction":"row","justify-content":"center","margin-top":"6%"}},{default:s((()=>[a(A,{style:{"margin-top":"1.5%"}},{default:s((()=>[d("工号：")])),_:1}),a(A,{style:{width:"60%"}},{default:s((()=>[a(_,{placeholder:"请输入职工号",trim:"all",modelValue:N.FindWorkNumber,"onUpdate:modelValue":t[1]||(t[1]=e=>N.FindWorkNumber=e),onBlur:g.SendWorkNumber,type:"number"},null,8,["modelValue","onBlur"])])),_:1})])),_:1}),N.IFWorkNumber?(l(),m(A,{key:2,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("该工号与账号不符")])),_:1})):u("",!0),N.IFWorkNumberEmpty?(l(),m(A,{key:3,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("工号不能为空")])),_:1})):u("",!0),a(A,{style:{display:"flex","flex-direction":"row","justify-content":"center","margin-top":"6%"}},{default:s((()=>[a(A,{style:{"margin-top":"1.5%"}},{default:s((()=>[d("姓名：")])),_:1}),a(A,{style:{width:"60%"}},{default:s((()=>[a(_,{placeholder:"请输入您的真实姓名",trim:"all",modelValue:N.FindName,"onUpdate:modelValue":t[2]||(t[2]=e=>N.FindName=e),onBlur:g.SendName},null,8,["modelValue","onBlur"])])),_:1})])),_:1}),N.IFName?(l(),m(A,{key:4,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("该姓名与账号不符")])),_:1})):u("",!0),N.IFNameEmpty?(l(),m(A,{key:5,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("姓名不能为空")])),_:1})):u("",!0),a(A,{style:{display:"flex","margin-left":"6.5%","margin-top":"6%"}},{default:s((()=>[a(A,null,{default:s((()=>[d("密保问题：")])),_:1}),a(A,null,{default:s((()=>[d(c(N.SecretQuestion),1)])),_:1})])),_:1}),a(A,{style:{display:"flex","margin-left":"6.5%","margin-top":"6%"}},{default:s((()=>[a(A,{style:{"margin-top":"1.5%"}},{default:s((()=>[d("密保答案：")])),_:1}),a(A,{style:{width:"64%"}},{default:s((()=>[a(_,{placeholder:"请输入密保问题的答案",trim:"all",modelValue:N.FindAnswer,"onUpdate:modelValue":t[3]||(t[3]=e=>N.FindAnswer=e),onBlur:g.SendAnswer},null,8,["modelValue","onBlur"])])),_:1})])),_:1}),N.IFSecretAnswer?(l(),m(A,{key:6,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("答案错误")])),_:1})):u("",!0),N.IFSecretAnswerEmpty?(l(),m(A,{key:7,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("密保问题答案不能为空")])),_:1})):u("",!0),a(A,{style:{display:"flex","margin-left":"10.5%","margin-top":"6%"}},{default:s((()=>[a(A,{style:{"margin-top":"1.5%"}},{default:s((()=>[d("新密码：")])),_:1}),a(A,{style:{width:"67%"}},{default:s((()=>[a(_,{placeholder:"请输入新密码",trim:"all",modelValue:N.FindNewPsd,"onUpdate:modelValue":t[4]||(t[4]=e=>N.FindNewPsd=e),onBlur:g.SendNewPsd,type:"password"},null,8,["modelValue","onBlur"])])),_:1})])),_:1}),N.IFNewPasswordEmpty?(l(),m(A,{key:8,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("新密码不能为空")])),_:1})):u("",!0),a(A,{style:{display:"flex","margin-left":"6.5%","margin-top":"6%"}},{default:s((()=>[a(A,{style:{"margin-top":"1.5%"}},{default:s((()=>[d("确认密码：")])),_:1}),a(A,{style:{width:"64%"}},{default:s((()=>[a(_,{placeholder:"请再次输入密码",trim:"all",modelValue:N.FindConfirmPsd,"onUpdate:modelValue":t[5]||(t[5]=e=>N.FindConfirmPsd=e),onBlur:g.CheckNewPsd,type:"password"},null,8,["modelValue","onBlur"])])),_:1})])),_:1}),N.IFPsdNotSame?(l(),m(A,{key:9,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("密码不同")])),_:1})):u("",!0),N.IFConfirmPsaawordEmpty?(l(),m(A,{key:10,style:{color:"red","font-size":"20rpx","margin-left":"27%"}},{default:s((()=>[d("新密码不能为空")])),_:1})):u("",!0),a(A,{style:{display:"flex","flex-direction":"row","justify-content":"center","margin-top":"10%"}},{default:s((()=>[a(P,{style:{width:"40%"},type:"primary",onClick:g.UpdatePsd},{default:s((()=>[d("提交")])),_:1},8,["onClick"])])),_:1})])),_:1}),a(E,{ref:"message",type:"message"},{default:s((()=>[a(k,{type:"error",message:"请先按要求填写内容",duration:2e3})])),_:1},512)],64)}]]);export{N as default};
