'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let OrderId=event.OrderId;
	var OrderState=event.OrderState;
	let res=db.collection("orders").where({
		_id:OrderId
	}).update({
		OrderState:OrderState
	})
	return res
};
