'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let PossessorPhone=event.PossessorPhone;
	let res=await db.collection("Restaurant").where({
		PossessorPhone:PossessorPhone
	}).get()
	
	return res
};
