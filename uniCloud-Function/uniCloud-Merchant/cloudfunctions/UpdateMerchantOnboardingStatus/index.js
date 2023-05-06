'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let StoreId=event.StoreId;
	var OnboardingStatus=event.OnboardingStatus;
	let res=db.collection("Restaurant").where({
		_id:StoreId
	}).update({
		OnboardingStatus:OnboardingStatus
	})
	return res
};
