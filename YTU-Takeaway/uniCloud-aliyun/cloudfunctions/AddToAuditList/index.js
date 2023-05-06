'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditType=event.AuditType;
	let AuditState=event.AuditState;
	let AuditMain=event.AuditMain;
	let Applicant=event.Applicant;
	let ApplicantPhone=event.ApplicantPhone;
	let ApplicationTime=event.ApplicationTime;
	let res=await db.collection("AuditList").add({
		AuditType:AuditType,
		AuditState:AuditState,
		AuditMain:AuditMain,
		Applicant:Applicant,
		ApplicantPhone:ApplicantPhone,
		ApplicationTime:ApplicationTime
	})
	return res
};
