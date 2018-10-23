/**var extraConfig = {
	sichuan:require('./sichuan/config.js'),
	chongqing:require('./chongqing/config.js'),
	guangyuan:require('./guangyuan/config.js'),
	fujian:require('./fujian/config.js'),
	guizhou:require('./guizhou/config.js'),
	xinjiang:require('./xinjiang/config.js'),
	anhui:require('./anhui/config.js'),
	hubei:require('./hubei/config.js'),
	neimenggu:require('./neimenggu/config.js'),
	liaoning:require('./liaoning/config.js'),
	guangdong:require('./guangdong/config.js'),
	wuhan:require('./wuhan/config.js'),
	nantong:require('./nantong/config.js'),
	huangshi:require('./huangshi/config.js'),
	qujing:require('./qujing/config.js'),
	china:require('./china/config.js'),
	tangshan:require('./tangshan/config.js'),
	hebei:require('./hebei/config.js'),
	jilin:require('./jilin/config.js'),
	app_hubei:require('./app_hubei/config.js')
};*/
/**
* 通用网站配置，主要用来配置地图文件，组织机构根信息，区域前缀

通过版本文件进行配置，引入后，Config里面变量的值会是当前所在版本的值。

```
// 使用config里面的变量，需要引入config
var Config = require('../version/config');

```

|配置项|类型|默认|说明|
|---|---|---|---|
|BasePath|string| /VAP | 网站的根路径，也可以通过{@link PageUtil PageUtil.BasePath} 引用 |
|theme|string| vap-blue | 当前皮肤的样式 |
|orgRoot.orgRoot|string| 51 | 组织机构树根ID |
|orgRoot.orgName|string| 四川省 | 组织机构树根名称 |
|areaPrefix|number| 4 | 过滤区域时，取区域码的前几位，一般省版本配置4，市版本配置6 |
|mapConfig|object|  | 地图配置 |

*/
const Config = {
	mapScale:1.3,
	provinceScale: 1
};

export default Config;