'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	// console.log(event)
	let {keyword}=event;
	let res=await db.collection("users").where({
		// age:dbcmd.gt(20).and(dbcmd.lt(30))
		// age:dbcmd.and(dbcmd.gt(20),dbcmd.lt(30))
		// age:dbcmd.or(dbcmd.lt(20),dbcmd.gt(30))
		name:new RegExp(keyword,"ig")
	}).get();
	return res
};
