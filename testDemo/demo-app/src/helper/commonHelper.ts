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

// Deep comparison, care about order
export const compareObj = (obj1: any, obj2: any): boolean => {
    if (_.isObject(obj1) && _.isObject(obj2)) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        let property: keyof typeof obj1
        // @ts-ignore
        for (property in obj1) {
            if (_.isPlainObject(obj1[property])) {
                return compareObj(obj1[property], obj2[property]);
            } else {
                return compareValue(obj1[property], obj2[property]);
            }
        }
        return true;
    } else {
        return false;
    }
};

// Deep comparison, doesn't care about order
export const compareDeepObj = (obj1: object, obj2: object): boolean => {
    if (_.isObject(obj1) && Object.keys(obj1).length > 0) {
        return Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every((p: string) => {
                // @ts-ignore
                return compareDeepObj(obj1[p], obj2[p])
            }
        )
    } else {
        return compareValue(obj1, obj2);
    }
}

// Sort object in the array  by array keymap
// If the array lengths are not equal, the residuals will be at the end of the array
export const sortObjByObjMap = (obj: any, arrMap: object[], keySort: string): object[] => {
    return obj.sort((a: { [x: string]: object; }, b: { [x: string]: object; }) => {
        const aIndex = arrMap.indexOf(a[keySort]);
        const bIndex = arrMap.indexOf(b[keySort]);
        return (aIndex === -1 ? Number.MAX_VALUE : aIndex) - (bIndex === -1 ? Number.MAX_VALUE : bIndex);
    });
}

// Remove the object from the array by another array object
export const removeArrByObjKey = (arr: any, arrRemove: any, key: string): any => {
    return arr.filter(function (objFromA: { [x: string]: any; }) {
        return !arrRemove.find(function (objFromB: { [x: string]: any; }) {
            return objFromA[key] === objFromB[key];
        })
    });
}


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
