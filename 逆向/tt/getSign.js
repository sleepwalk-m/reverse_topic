

function watch(obj, name) {
    return new Proxy(obj,{
        get: function(target, property, receiver) {
            try {
                if (typeof target[property] === "function") {
                    console.table([`对象 => ${name} ,读取属性:`, property + `,值为:` + 'function' + `,类型为:` + (typeof target[property])]);
                } else {
                    console.table([`对象 => ${name} ,读取属性:`, property + `,值为:` + target[property] + `,类型为:` + (typeof target[property])]);
                }
            } catch (e) {}
            return target[property];
        },
        set: function(target, property, newValue, receiver) {
            try {
                console.table([`对象 => ${name} ,设置属性:`, property + `,值为:` + newValue + `,类型为:` + (typeof newValue)]);
            } catch (e) {}
            return Reflect.set(target, property, newValue, receiver);
        }
    });
}

window = global;

document= {
    referrer:'',
};
location= {

};
navigator= {
    userAgent: ""
};



Storage = function(){}
localStorage = {}
sessionStorage = {}

Object.setPrototypeOf(localStorage, Storage.prototype)
Object.setPrototypeOf(sessionStorage, Storage.prototype)




window = watch(window, "window");
location = watch(location, "location");
document = watch(document, "document");
navigator = watch(navigator, "navigator");

require("./bdm.js")

var sign = window.byted_acrawler.sign("","123");
console.log(sign);

