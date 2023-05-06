'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let MerchantPicture=event.MerchantPicture;
	let MerchantName=event.MerchantName;
	let MerchantAddress=event.MerchantAddress;
	let MerChantPossessor=event.MerChantPossessor;
	let PossessorPhone=event.PossessorPhone;
	let ReasonForExit=event.ReasonForExit;
	let Handlers=event.Handlers;
	let HandlersPhone=event.HandlersPhone;
	let AuditState=event.AuditState;
	let AuditListId=event.AuditListId;
	let Feedback=event.Feedback;
	let ApplicationTime=event.ApplicationTime;
	
	let res=await db.collection("MerchantExitAudit").add({
		MerchantPicture:MerchantPicture,
		MerchantName:MerchantName,
		MerchantAddress:MerchantAddress,
		MerChantPossessor:MerChantPossessor,
		PossessorPhone:PossessorPhone,
		ReasonForExit:ReasonForExit,
		Handlers:Handlers,
		HandlersPhone:HandlersPhone,
		AuditState:AuditState,
		AuditListId:AuditListId,
		Feedback:Feedback,
		ApplicationTime:ApplicationTime
	})
	return res
};
