'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let StoreName=event.StoreName;
	let StorePicture=event.StorePicture;
	let GoodsList=event.GoodsList;
	var TotalMoney=event.TotalMoney;
	var GoodsTotal=event.GoodsTotal;
	let OrderState=event.OrderState;
	let Address=event.Address;
	let Doorplate=event.Doorplate;
	let Contact=event.Contact
	let gender=event.gender;
	let Phone=event.Phone;
	let OrderUserPhone=event.OrderUserPhone;
	let RemarkText=event.RemarkText;
	let Cutlery=event.Cutlery;
	let TimeOfOrder=event.TimeOfOrder;
	let isOpen=event.isOpen;
	let res=await db.collection("orders").add({
		StoreId:StoreId,
		StoreName:StoreName,
		StorePicture:StorePicture,
		GoodsList:GoodsList,
		TotalMoney:TotalMoney,
		GoodsTotal:GoodsTotal,
		OrderState:OrderState,
		Address:Address,
		Doorplate:Doorplate,
		Contact:Contact,
		gender:gender,
		Phone:Phone,
		OrderUserPhone:OrderUserPhone,
		RemarkText:RemarkText,
		Cutlery:Cutlery,
		TimeOfOrder:TimeOfOrder,
		isOpen:isOpen
	})
	return res
};
