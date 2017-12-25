export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
    return false;
}

export function getCookie(name) {
    const value = `;  ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    const partsLength = 2;
    if (parts.length === partsLength) return parts.pop().split(';').shift();
    return null;
}

const Format = {}
Format.date = function (time) {
    time = new Date(time)
    const between = (Date.now() - Number(time))/1000
    if (between < 3600) {
        return pluralize(~~(between / 60), ' 分钟前')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' 小时前')
    } else {
        return pluralize(~~(between / 86400), ' 天前')
    }
}

function pluralize (time, label) {
    return time + label
}

export {Format}
