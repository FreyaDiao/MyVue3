
function formateMoney(val, type = 2, isPrefix = false) {
	let prefix = isPrefix ? '+' : '';
	if (Number(val) < 0) {
		prefix = '-';
		val = String(val).replace('-', '');
	}
	if (/[^0-9\.]/.test(val) || val === null || val === "") {
		val = '0';
	}
	val = val.toString().replace(/^(\d*)$/, "$1.");  
	val = (val + "00").replace(/(\d*\.\d\d)\d*/, "$1");  
	val = val.replace(".", ",");  
	let re = /(\d)(\d{3},)/;  
	while (re.test(val))  
	{val = val.replace(re, "$1,$2");}  
	val = val.replace(/,(\d\d)$/, ".$1");  
	if (type === 0) {// 不带小数位(默认是有小数位)
		let a = val.split(".");  
		if (a[1] === "00") {  
			val = a[0];  
		}  
	}
	if (val == 0) {
		prefix = '';
	}
	return prefix + val;
}

function getUrlParams(url) {
	const _url = url || window.location.href;
	const _urlParams = _url.match(/([?&])(.+?=[^&]+)/igm);
	return _urlParams ? _urlParams.reduce((a, b) => {
	   const value = b.slice(1).split('=');
	   a[value[0]] = value[1];
	   return a;
	}, {}) : {};
}

module.exports = {
	formateMoney,
	getUrlParams
};