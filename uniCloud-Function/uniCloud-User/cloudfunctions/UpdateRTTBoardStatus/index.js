'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let PossessorPhone=event.PossessorPhone;
	let OnboardingStatus=event.OnboardingStatus;
	let res=db.collection("Restaurant").where({
		PossessorPhone:PossessorPhone
	}).update({
		OnboardingStatus:OnboardingStatus
	})
	return res
};
