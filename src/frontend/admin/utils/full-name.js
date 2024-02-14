export function getFullName(obj) {
    return [obj.firstName, obj.middleName, obj.lastName].filter(x=>x).join(' ');
}