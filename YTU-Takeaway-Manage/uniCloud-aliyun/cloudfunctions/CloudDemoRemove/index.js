'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let res= await db.collection("users").doc("63f5a0d3e766bb83093e792e").remove()
};
