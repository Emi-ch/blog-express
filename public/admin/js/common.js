function serializeToJson(form) {
    var result = {};
    // [{name: 'email', value: ''}, {name: 'password', value: ''}]
    // JQuery中提供的方法
    var f = form.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value;
    });
    return result;
}