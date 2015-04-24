var baseUtils = require('../utils/baseUtils.js');

function bodyPips(d,i){
    return Math.floor(((baseUtils.max(d.opens[i], d.closes[i]) - baseUtils.min(d.opens[i], d.closes[i]))*10000));
}
function fullPips(d,i){
    return Math.floor((d.highs[i] - d.lows[i])*10000);
}
function headPips(d,i){
    return Math.floor((d.highs[i] - baseUtils.max(d.opens[i],d.closes[i])) * 10000);
}
function tailPips(d,i){
    return Math.floor((baseUtils.min(d.opens[i],d.closes[i]) - d.lows[i]) * 10000);
}

module.exports = {
    bodyPips : bodyPips,
    fullPips : fullPips,
    headPips : headPips,
    tailPips : tailPips
};
