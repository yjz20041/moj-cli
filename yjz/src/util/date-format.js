/**
 * 时间戳转成 '1991-05-04' 格式
 * @param {*} val 时间戳
 */
export function dateFomat(val) {
    const date = new Date(val);
    const year = `${date.getFullYear()}-`;
    const month = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const day = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    return year + month + day;
}

export default {};
