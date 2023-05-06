'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let OrderId=event.OrderId;
	let StoreId=event.StoreId;
	var FirstRate=event.FirstRate;
	var SecondRate=event.SecondRate;
	var ThirdRate=event.ThirdRate;
	var Rate=event.Rate;
	let AppraiseText=event.AppraiseText;
	let PictureList=event.PictureList;
	let CustomerPhone=event.CustomerPhone;
	let CustomerName=event.CustomerName;
	let CustomerAvatar=event.CustomerAvatar;
	let AppraiseTime=event.AppraiseTime;
	let IsReply=event.IsReply;
	let res=await db.collection("Appraise").add({
		OrderId:OrderId,
		StoreId:StoreId,
		FirstRate:FirstRate,
		SecondRate:SecondRate,
		ThirdRate:ThirdRate,
		Rate:Rate,
		AppraiseText:AppraiseText,
		PictureList:PictureList,
		CustomerPhone:CustomerPhone,
		CustomerName:CustomerName,
		CustomerAvatar:CustomerAvatar,
		AppraiseTime:AppraiseTime,
		IsReply:IsReply
	})
	return res
	
};
