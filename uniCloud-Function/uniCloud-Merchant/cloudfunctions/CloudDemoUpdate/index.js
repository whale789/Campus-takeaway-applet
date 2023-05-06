'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let res=await db.collection("users").where({
		_id:"63f59434e766bb83093ade72"
	}).update({
		// tab:{
		// 	job:"安卓工程师"
		// }
		// "tab.job":"讲师"
		// like:dbcmd.push([".net"])
		// like:dbcmd.pop()
		// like:dbcmd.shift()
		love:dbcmd.inc(1)
	})
	return{
		msg:"修改成功",
		res
	}
};
