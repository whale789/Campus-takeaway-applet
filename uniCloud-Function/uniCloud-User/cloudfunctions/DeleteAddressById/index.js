'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let AddressId=event.AddressId
	let res= await db.collection("UserAddress").doc(AddressId).remove()
};
