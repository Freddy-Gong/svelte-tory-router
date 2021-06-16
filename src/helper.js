export function checkParam(key) {
    const reg = /(?<=\/:)[\w]+/g;
    const result = key.match(reg);
    return result;
}
export function getNewKey(key,param){
    if(param.length===1){
        const index = key.indexOf(param[0])
        return key.substring(0,index-2)
    }
}
