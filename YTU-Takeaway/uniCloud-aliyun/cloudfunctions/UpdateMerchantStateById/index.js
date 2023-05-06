'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let StoreId=event.StoreId;
	var BusinessStatus=event.BusinessStatus;
	let res=db.collection("Restaurant").where({
		_id:StoreId
	}).update({
		BusinessStatus:BusinessStatus
	})
	return res
};
