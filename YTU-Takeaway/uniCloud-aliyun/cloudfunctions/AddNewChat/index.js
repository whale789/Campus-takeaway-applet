'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let UserId=event.UserId;
	let UserNickName=event.UserNickName;
	let UserAvatar=event.UserAvatar;
	let ManagerId=event.ManagerId;
	let ManagerName=event.ManagerName;
	let ManagerAvatar=event.ManagerAvatar;
	let MsgList=event.MsgList;
	let LastMessage=event.LastMessage;
	let LastTime=event.LastTime;
	var NotReadNum=event.NotReadNum;
	
	let res=await db.collection("Chat").add({
		UserId:UserId,
		UserNickName:UserNickName,
		UserAvatar:UserAvatar,
		ManagerId:ManagerId,
		ManagerName:ManagerName,
		ManagerAvatar:ManagerAvatar,
		MsgList:MsgList,
		LastMessage:LastMessage,
		LastTime:LastTime,
		NotReadNum:NotReadNum,
	})
	return res
};
