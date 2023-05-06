'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let StoreName=event.StoreName;
	let StorePicture=event.StorePicture;
	let Possessor=event.Possessor;
	let PossessorPhone=event.PossessorPhone;
	let Address=event.Address;
	var ManagerAccount=event.ManagerAccount;
	let ManagerName=event.ManagerName;
	let PunishTime=event.PunishTime;
	let PunishLastTime=event.PunishLastTime;
	let UnblockingTime=event.UnblockingTime;
	let PunishName=event.PunishName;
	let PunishReason=event.PunishReason;
	let PunishState=event.PunishState;
	let res=await db.collection("Punish").add({
		StoreId:StoreId,
		StoreName:StoreName,
		StorePicture:StorePicture,
		Possessor:Possessor,
		PossessorPhone:PossessorPhone,
		Address:Address,
		ManagerAccount:ManagerAccount,
		ManagerName:ManagerName,
		PunishTime:PunishTime,
		PunishLastTime:PunishLastTime,
		UnblockingTime:UnblockingTime,
		PunishName:PunishName,
		PunishReason:PunishReason,
		PunishState:PunishState
	})
	return res
};
