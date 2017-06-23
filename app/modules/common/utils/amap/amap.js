var Amap = (function () {
    var map, geolocation, geolocationFlag = false;
    var _flag = true;
    var markers = [];
    var pi = 3.14159265358979324, a = 6378245.0, ee = 0.00669342162296594323;
    var p_lat, p_lng, v_lat, v_lng;
    var version;
    var type, currentLocation;

    function Amap() {
        //必须要有此方法，没有访问页面时会报错
    }

    /**
     * 初始化地图
     */
    Amap.prototype.initMap = function () {
        var self = this;
        map = new AMap.Map('track_map', {resizeEnable: true});
        this.setFlag(true);
        map.setZoom(15);
        console.log('initMap Success');
    }
    Amap.prototype.check = function () {
        var type;
        var brower = {
            versions: function () {
                var u = window.navigator.userAgent;
                var num;
                if (u.indexOf('Trident') > -1) {
//CuPlayer.com提示：IE
                    version = 'IE'
                } else if (u.indexOf('Presto') > -1) {
//CuPlayer.com提示：opera
                    version = 'Opera'
                } else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
//firefox
                    version = 'Firefox';
                } else if (u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1) {
//CuPlayer.com提示：苹果、谷歌内核
                    if (u.indexOf('Chrome') > -1) {
//chrome
                        version = 'Chrome'
                    } else if (u.indexOf('OPR')) {
//webkit Opera
                        version = 'Opera_webkit'
                    } else {
//Safari
                        version = 'Safari'
                    }
                } else if (u.indexOf('Mobile') > -1) {
//CuPlayer.com提示：移动端
                    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//ios
                        if (u.indexOf('iPhone') > -1) {
//iphone
                            version = 'iPhone'
                        } else if (u.indexOf('iPod') > -1) {
//ipod
                            version = 'iPod'
                        } else if (u.indexOf('iPad') > -1) {
//ipad
                            version = 'iPad'
                        }
                    } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
//android
                        num = u.substr(u.indexOf('Android') + 8, 3);
                        version = {"type": "Android", "version": num}
                    } else if (u.indexOf('BB10') > -1) {
//CuPlayer.com提示：黑莓bb10系统
                        version = 'BB10'
                    } else if (u.indexOf('IEMobile')) {
//windows phone
                        version = 'Windows Phone'
                    }
                }
            }
        }
        brower.versions();
        if (version == undefined) {
            type = false;
        } else if (version && version == 'iPhone') {
            type = true;
        } else if (version.type == 'Android' && Number(version.version.substr(0, 1)) < 5) {
            type = true;
        } else {
            type = false;
        }
        if (type == true) {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://webapi.amap.com/maps?v=2.0&key=c915d6de8b82b43ea3c19a34b5e1f56c";
            body.appendChild(script);
            console.log(body);
        } else {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://webapi.amap.com/maps?v=1.3&key=c915d6de8b82b43ea3c19a34b5e1f56c";
            body.appendChild(script);
        }
    }
    /**
     * 添加车辆位置标记
     */
    Amap.prototype.vehicleMarker = function (location) {
        var lat = location.latitude * 1,
            lng = location.longitude * 1;
        this.clearMarker(0);
        var marker = new AMap.Marker({
            title: "车辆位置",
            position: new AMap.LngLat(this.transform(lat, lng, v_lat, v_lng)[1], this.transform(lat, lng, v_lat, v_lng)[0]),
            // position: new AMap.LngLat(location.longitude, location.latitude),
            map: map
        });
        markers[0] = marker;
        this.setMapZoom();

    }


    Amap.prototype.setTrack = function (trackList) {
        var lineArr = [];
        for (var i = 0; i < trackList.length; i++) {
            console.log(trackList[i]);
            var lnglat = this.transform(trackList[i].latitude * 1, trackList[i].longitude * 1);
            lineArr.push([lnglat[1], lnglat[0]]);
        }
        var polyline = new AMap.Polyline({
            map: map,
            path: lineArr,
            strokeColor: "#1fa67b",  //线颜色
            strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            strokeStyle: "solid"  //线样式
        });
        map.setFitView();
        console.log('init track success');
    }

    Amap.prototype.transform = function (wgLat, wgLon) {
        if (this.outOfChina(wgLat, wgLon)) {
            mgLat = wgLat;
            mgLon = wgLon;
            return [mgLat, mgLon];
        }
        var dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0);
        var dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0);
        var radLat = wgLat / 180.0 * pi;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        mgLat = wgLat + dLat;
        mgLon = wgLon + dLon;
        return [mgLat, mgLon];
    }

    Amap.prototype.outOfChina = function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347) {
            return true;
        }

        if (lat < 0.8293 || lat > 55.8271) {
            return true;
        }
        return false;
    }

    Amap.prototype.transformLat = function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    Amap.prototype.transformLon = function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }
    //清理marker
    Amap.prototype.clearMarker = function (n) {

        markers[n] != undefined ? markers[n].setMap(null) : {};
    }

    // 如果车辆位置改变则刷新位置，反之不刷新
    Amap.prototype.checkLocation = function (locationCopy, location) {
        var result = false;
        if (locationCopy) {
            result = JSON.stringify(locationCopy.longitude) == JSON.stringify(location.longitude) && JSON.stringify(locationCopy.latitude) == JSON.stringify(location.latitude);
        }
        return result;
    }

    Amap.prototype.checkPersonLocation = function (locationCopy, location) {
        var result = false;
        if (locationCopy) {
            result = locationCopy[0] == location[0] && locationCopy[1] == location[1];
        }
        return result;
    }



    Amap.prototype.setFlag = function (flag) {
        _flag = flag
    }

    //控制地图缩放
    Amap.prototype.setMapZoom = function () {
        // console.log(markers[0], markers[1]);
        if (_flag) {
            if (markers[0] != undefined && markers[1] != undefined) {
                _flag = false;
            }
            map.setFitView();
            map.zoomOut();
        }
    }

    Amap.prototype.destroy = function () {
        markers = [];
        map.destroy();
    }

    Amap.prototype.stopMove = function () {
        markers[0] = '车辆信息位置有问题,不再调整视图';
    }

    /**
     * 获得当前地理位置
     */
    Amap.prototype.getCurrentLocation = function () {
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: false     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            map.setFitView();
            map.zoomOut();
            AMap.event.addListener(geolocation, 'complete',this.onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
    }
    /**
     * 地图缩放
     */
    Amap.prototype.Scale = function () {
        map.plugin(["AMap.Scale"], function () {
            var scale = new AMap.Scale();
            scale.show();
            map.addControl(scale);
        });
    }
    /**
     * 地图工具条
     */
    Amap.prototype.ToolBar = function () {
        map.plugin(["AMap.ToolBar"],function(){
            var tool = new AMap.ToolBar({
                position:'RT',
                ruler:true,
                locate:true,
                direction:true,
                autoPosition:false
            });
            map.addControl(tool);
            function onCompletelocation(res) {
                map.zoomOut();
                map.zoomOut();
                map.zoomOut();
                map.zoomOut();
                map.zoomOut();
                map.zoomOut();
                map.zoomOut();
                // map.setFitView();
                console.log(res);
            }
            AMap.event.addListener(tool, 'location', onCompletelocation);
        });
    }

    Amap.prototype.clear = function () {
        map.clearMap();
    }
    return Amap;
})();
exports.Amap = Amap;
