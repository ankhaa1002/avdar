if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'Хуудас';
	$.fn.pagination.defaults.afterPageText = 'of {pages}';
	$.fn.pagination.defaults.displayMsg = 'Энэ хуудсанд {from} - {to}. Нийт <b>{total}</b> байна.';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'Түр хүлээнэ үү ...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'Тийм';
	$.messager.defaults.cancel = 'Цуцлах';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = 'Бөглөх шаардлагатай.';
	$.fn.validatebox.defaults.rules.email.message = 'Зөв мэйл хаяг оруулна уу';
	$.fn.validatebox.defaults.rules.url.message = 'Зөв URL хаяг оруулна уу.';
	$.fn.validatebox.defaults.rules.length.message = 'Please enter a value between {0} and {1}.';
	$.fn.validatebox.defaults.rules.remote.message = 'Please fix this field.';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = 'Бөглөх шаардлагатай.';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.missingMessage = 'Бөглөх шаардлагатай.';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = 'Бөглөх шаардлагатай.';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = 'Бөглөх шаардлагатай.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['S','M','T','W','T','F','S'];
	$.fn.calendar.defaults.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = 'Өнөөдөр';
	$.fn.datebox.defaults.closeText = 'Хаах';
	$.fn.datebox.defaults.okText = 'Тийм';
	$.fn.datebox.defaults.missingMessage = 'Бөглөх шаардлагатай.';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText,
		missingMessage: $.fn.datebox.defaults.missingMessage
	});
}
