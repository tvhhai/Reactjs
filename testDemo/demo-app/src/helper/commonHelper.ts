import _ from "lodash";

// compareValue falsy
export const compareValue = function (val1: any, val2: any) {
    if (_.isUndefined(val1) || _.isNull(val1)) {
        val1 = '';
    }
    if (_.isUndefined(val2) || _.isNull(val2)) {
        val2 = '';
    }
    if (_.isArray(val1) && _.isArray(val2)) {
        return _.isEqual(val1, val2);
    }
    val1 = val1.toString();
    val2 = val2.toString();
    return val1 === val2;
};

// deep compareObj
export const compareObj = (obj1: object, obj2: object) => {
    if (_.isObject(obj1) && _.isObject(obj2)) {
        // if (obj1.$$hashKey) {
        //     delete obj1.$$hashKey;
        // }
        // if (obj2.$$hashKey) {
        //     delete obj2.$$hashKey;
        // }
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        let property: keyof typeof obj1
        // @ts-ignore
        for (property in obj1) {
            if (_.isPlainObject(obj1[property])) {
                if (!compareObj(obj1[property], obj2[property])) {
                    return false;
                }
            } else {
                if (!compareValue(obj1[property], obj2[property])) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
};

// Is array and not empty
export const arrNotEmpty = (arr: any[]) => {
    return Array.isArray(arr) && !_.isEmpty(arr)
}

export const getFunction = function (values: any, exp: any, defaultVal?: any) {
    var val = _.get(values, exp);
    return _.isFunction(val) ? val : defaultVal || _.noop();
};

export const getColumnList = (columns: any[]) => {
    let result: any[] = [];
    _.forEach(columns, (value) => {
        value.colId = _.isUndefined(value.id) ? value.field : value.key;
        value.field = _.isUndefined(value.field) ? value.key : value.field;
        value.sortable = _.isUndefined(value.sortable) ? true : value.sortable;
        value.resizable = _.isUndefined(value.resizable) ? true : value.resizable;

        result.push(value);
    })
    return result
}
