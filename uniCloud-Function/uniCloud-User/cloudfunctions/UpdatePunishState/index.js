'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let PunishId=event.PunishId;
	var PunishState=event.PunishState;
	let res=db.collection("Punish").where({
		_id:PunishId
	}).update({
		PunishState:PunishState
	})
	
	return res;
};
