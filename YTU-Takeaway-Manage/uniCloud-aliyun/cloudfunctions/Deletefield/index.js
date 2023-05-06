'use strict';
exports.main = async (event, context) => {  
    const db = uniCloud.database()  
    let res=await db.collection('Restaurant').where({  
        _id: "6437e58ef5cf3a3e090eab85"  
    }).update({  
        data: db.command.remove(),
		MonthMonet:db.command.remove()
    })  
	return res
};
