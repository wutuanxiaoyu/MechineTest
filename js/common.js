function isEmpty(str){
	if(str == null || str == '' || str.length ==0 || str =='undifined'){
		return true;
	}
	return false;
}

function isEmptyByDef(res, def){
	if(isEmpty(res)){
		return def;
	}
	return res;
}
