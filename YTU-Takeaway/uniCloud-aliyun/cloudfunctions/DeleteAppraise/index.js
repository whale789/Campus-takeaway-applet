'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let AppraiseId=event.AppraiseId
	let res= await db.collection("Appraise").doc(AppraiseId).remove()
};
