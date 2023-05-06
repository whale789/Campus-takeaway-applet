'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	var DropOffee=parseFloat(event.DropOffee);
	let res=db.collection("Restaurant").where({
		_id:StoreId
	}).update({
		DropOffee:DropOffee
	})
	return res
	
};