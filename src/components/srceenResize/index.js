const resize = ()=>{
    let diff = 0.1;
    let min = 0.5625 - diff;
    let max = 0.5625 + diff;
	let tW = window.innerWidth;
	let tH = window.innerHeight;
    var scale = tH/tW;
    let body = document.getElementsByTagName('body')[0]
    console.log(document.getElementsByTagName('body'))
    body.removeAttribute('style')
	if(min<=scale && scale<=max){
        body.setAttribute('style','transform:scale(' + tW/1920 + ',' + tH/1080 + ');margin-left:0;margin-top:0')
	}else if(scale > max){
        let top = (tH/(tW/1920) - 1080 )/ 2 * tW/1920
		body.setAttribute('style','transform:scale(' + tW/1920 +');margin-left:0;margin-top:'+top+'px')
	}else{
        let left = (tW/(tH/1080) - 1920 )/ 2 * tH/1080
		body.setAttribute('style','transform:scale(' +  tH/1080 + ');margin-left:'+left+'px;margin-top:0');
	}
}
export default resize