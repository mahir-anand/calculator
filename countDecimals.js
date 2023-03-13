/**
 * Count Decimals
 *
 * @param {number} x The number you need calculate decimal
 */
function countDecimals(x) {
    if (x && x % 1) {
        return x.toString().length - x.toString().indexOf('.') - 1 || 0;
    }
    return 0;
};