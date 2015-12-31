export function insert(arr, x) {
    return arr.concat(x);
}

export function replace(arr, x, k) {
    var i = -1,
        len = arr.length;

    while (++i < len) {
        if (arr[i][k] === x[k]) {
            arr.splice(i, 1, x);
            break;
        }
    }

    return arr;
}

export function remove(arr, x, k) {
    var i = -1,
        len = arr.length;

    while (++i < len) {
        if (arr[i][k] === x[k]) {
            arr.splice(i, 1);
            break;
        }
    }

    return arr;
}