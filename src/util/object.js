function each(o, cb) {
	if (Array.isArray(o)) { o.forEach(cb); }
	Object.getOwnPropertyNames(o).forEach(function (n) { cb(o[n], n, o); })
}

function extend(a, b) {
	each(b, function (v, k) { a[k] = v; })
}

function fill(c, v) {
	var a = []; 
	if (v === undefined) { v = 0; }
	while(c-- > 0) { a.push(0); }
	return a;
}

module.exports =  {
	each: each,
	extend: extend,
	fill: fill
};
