'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let MerchantPicture=event.MerchantPicture;
	let MerchantName=event.MerchantName;
	let MerchantAddress=event.MerchantAddress;
	let MerChantPossessor=event.MerChantPossessor;
	let PossessorPhone=event.PossessorPhone;
	let LicensePicture=event.LicensePicture;
	let SanitaryPermit=event.SanitaryPermit;
	let IdentityCardZ=event.IdentityCardZ;
	let IdentityCardF=event.IdentityCardF;
	let BusinessContent=event.BusinessContent;
	let AuditListId=event.AuditListId;
	let AuditState=event.AuditState;
	let Handlers=event.Handlers;
	let HandlersPhone=event.HandlersPhone;
	let Feedback=event.Feedback;
	let ApplicationTime=event.ApplicationTime;
	let res=await db.collection("MerchantSettleAudit").add({
		MerchantPicture:MerchantPicture,
		MerchantName:MerchantName,
		MerchantAddress:MerchantAddress,
		MerChantPossessor:MerChantPossessor,
		PossessorPhone:PossessorPhone,
		LicensePicture:LicensePicture,
		SanitaryPermit:SanitaryPermit,
		IdentityCardZ:IdentityCardZ,
		IdentityCardF:IdentityCardF,
		BusinessContent:BusinessContent,
		AuditListId:AuditListId,
		AuditState:AuditState,
		Handlers:Handlers,
		HandlersPhone:HandlersPhone,
		Feedback:Feedback,
		ApplicationTime:ApplicationTime
	})
	return res
};
