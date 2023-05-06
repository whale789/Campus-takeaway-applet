'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let GoodsList=event.GoodsList;
	var TotalMoney=event.TotalMoney;
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
	let res=await db.collection("orders").add({
		StoreId:StoreId,
		GoodsList:GoodsList,
		TotalMoney:TotalMoney,
		OrderState:OrderState,
		Address:Address,
		Doorplate:Doorplate,
		Contact:Contact,
		gender:gender,
		Phone:Phone,
		OrderUserPhone:OrderUserPhone,
		RemarkText:RemarkText,
		Cutlery:Cutlery,
		TimeOfOrder:TimeOfOrder
	})
	return res
};
