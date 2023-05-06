'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	var DeliveryFees=parseFloat(event.DeliveryFees);
	let res=db.collection("Restaurant").where({
		_id:StoreId
	}).update({
		DeliveryFees:DeliveryFees
	})
	return res
	
};
