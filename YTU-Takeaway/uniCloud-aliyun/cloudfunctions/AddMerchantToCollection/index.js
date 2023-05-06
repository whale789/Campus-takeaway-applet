'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let StoreId=event.StoreId;
	let Account=event.Account;
	let StoreName=event.StoreName;
	let StorePicture=event.StorePicture;
	let Address=event.Address;
	let DeliveryFees=event.DeliveryFees;
	let DropOffee=event.DropOffee;
	let res=await db.collection("MerchantCollection").add({
		StoreId:StoreId,
		Account:Account,
		StoreName:StoreName,
		StorePicture:StorePicture,
		Address:Address,
		DeliveryFees:DeliveryFees,
		DropOffee:DropOffee
	})
	return res
};
