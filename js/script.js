/* Google Map 経路探索 URLパラメーターについて

    パラメータ			意味
    ------------------- ----------------------------------------
    出発地点の指定  	saddr=(出発地点) ・・・ Lat,Lng や 地名、住所、電話番号など
    目的地点の指定  	daddr=(目的地点) ・・・ Lat,Lng や 地名、住所、電話番号など
    オプション      	dirflg=(移動手段) ・・・ 下記参照

    http://maps.google.com/maps?saddr=()&daddr=()&dirflg=()
    http://maps.google.com/maps?saddr=34.8195085,137.808631&daddr=34.7726175,137.7302850&dirflg=b
	http://maps.google.com/maps?saddr=34.8195085,137.808631&daddr=%E9%9D%99%E5%B2%A1%E7%9C%8C%E7%AB%8B%E5%A4%A9%E7%AB%9C%E9%AB%98%E7%AD%89%E5%AD%A6%E6%A0%A1&dirflg=b
    http://maps.google.com/maps?saddr=0534551255&daddr=34.8195085,137.808631&dirflg=d

	パラメータ       	意味
    ------------------- ----------------------------------------
	dirflg=d         	車の場合
	dirflg=w         	徒歩の場合
	dirflg=r         	公共機関（電車、バス）の場合
	dirflg=b         	自転車
	dirflg=f         	オプション１：フェリーを使わない
	dirflg=h         	オプション２：高速道路を使わない
	dirflg=t         	オプション３：有料道路を使わない

	URLエンコードしてくれるサイト
		https://tech-unlimited.com/urlencode.html
*/

var mymap;
var myhomeLatLng;
var marker = new Array();
var markerData = [ // [0]マップの中心位置(西中瀬１－３－１４)
    {
        id: 0,
        name: '西中瀬１－３－１４',
        lat: 34.8195085,
        lng: 137.808631,
        icon: './images/marker_home.png',
		tscore: 50,
    }, {
        id: 1,
		name: '浜松市立浜北北部中学校',
		lat: 34.8279635,
		lng: 137.8012769,
        icon: './images/marker_shogo.png',
		dir: 'w',
		tscore: 0,
		comment: '',
		gakka: '',
		bukatu: '',
    }, {
        id: 2,
        name: '浜松啓陽高等学校',
        lat: 34.8037309,
        lng: 137.7281801,
        icon: './images/marker_ryota.png',
        dir: 'b',
		tscore: 37,
		gakka: '情報コミュニケーション科（37）',
		bukatu: '商業デザイン部、ワープロ部、情報処理部、電卓部、演劇部、吹奏楽部、簿記部、書道部',
		comment: '口コミ悪し'
    }, {
        id: 3,
        name: '静岡県立浜松工業高等学校',
        lat: 34.7726175,
        lng: 137.7302850,
        dir: 'b',
		tscore: 52,
		gakka: '機械科(52)、電気科(52)、情報技術科(52)、建築科(52)、土木科(52)、システム化学科(52)、デザイン科(52)、理数工学科(52)',
		bukatu: 'バレー部、ラグビー部、アーチェリー部',
		comment: '工業系の進学就職を希望するには最適な学校',
    }, {
        id: 4,
        name: '静岡県立掛川工業高等学校',
        lat: 34.7701336,
        lng: 138.0285478,
        dir: 'r',
		tscore: 48,
		gakka: '機械科(48)、電子機械科(48)、電子電気科(48)、情報技術科(48)、設備システム科(48)',
		bukatu: 'ロボットコンテストでの活躍が大きく、全国大会にも出場',
		comment: '遠い（片道２時間）',
    }, {
        id: 5,
        name: '静岡県立浜松城北工業高等学校',
        lat: 34.7357632,
        lng: 137.7264136,
        dir: 'r',
		tscore: 47,
		gakka: '機械科(47)、電子機械科(47)、電気科(47)、電子科(47)',
		bukatu: '',
		comment: '口コミ賛否激しい（校則厳しめ）',
    }, {
        id: 6,
        name: '静岡県立浜松湖北高等学校',
        lat: 34.8183812,
        lng: 137.6780763,
        dir: 'r',
		tscore: 42,
		gakka: '普通科(43)、産業マネジメント科(農業)(42)、産業マネジメント科Ⅱ(工業)(42)、産業マネジメント科Ⅲ(商業)(42)',
		bukatu: '自動車を製造し高校生エコラン大会などの出場を目指す部活動等',
		comment: '2015年に、「引佐高校」「気賀高校」「三ヶ日高校」の3校が合併。口コミ高し',
    }, {
        id: 7,
        name: '静岡県立天竜高等学校',
        lat: 34.8696504,
        lng: 137.8128400,
        dir: 'b',
		tscore: 41,
		gakka: '総合学科(42)、森林科(41)、環境科(41)',
		bukatu: '',
		comment: '口コミ悪し',
    }];
var infoWindow = new Array();

function initNavi() {
	/*  JavaScriptのtalbeに行を追加する方法
		https://pg-happy.jp/javascript-table.html
	*/
	var info = document.getElementById('side-navi-info');

    // マーカー毎の処理
    for (var i = 2; i < markerData.length; i++) {

		var mytable = document.createElement('table');
		var mykey = '';
		var myval = '';

		for (var j = 0; j < 5; j++) {
			var mytr = document.createElement('tr');
			var myth = document.createElement('th');
			var mytd = document.createElement('td');
			if (j == 0 ) {mykey = 'name'; myval = '名前：';}
			if (j == 1 ) {mykey = 'tscore'; myval = '偏差値：';}
			if (j == 2 ) {mykey = 'gakka'; myval = '学科：';}
			if (j == 3 ) {mykey = 'bukatu'; myval = '部活：';}
			if (j == 4 ) {mykey = 'comment'; myval = 'コメント：';}

			myth.textContent = myval; // TH
			if (j == 0 ) {
				mytd.innerHTML = 
					'<a href="' +  encodeURI('https://www.google.co.jp/search?q=' + markerData[i][mykey]) + '" target="_blank">' +
					markerData[i][mykey] + '</a>';
			} else {
				mytd.textContent = markerData[i][mykey];
			}
			mytr.appendChild(myth);
			mytr.appendChild(mytd);
			mytable.appendChild(mytr);
		}

		info.appendChild(mytable);
		info.insertAdjacentHTML('beforeend', '<hr>');
	}
}

function start() {

    initNavi();

}

// Google Map の作成
function initMap() {

    //マップ作成 (ROADMAP, SATELLITE, HYBRID)
    var area = document.getElementById('map');
    myhomeLatLng = new google.maps.LatLng({lat: markerData[0]['lat'], lng: markerData[0]['lng']});
    mymap = new google.maps.Map(area, {
		center: myhomeLatLng, 
		zoom: 12, 
		mapTypeId: google.maps.MapTypeId.HYBRID,
		scrollwheel: true,
	});

    // マーカー毎の処理
    for (var i = 0; i < markerData.length; i++) {

        // マーカーの追加
        var markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']});
        marker[i] = new google.maps.Marker({position: markerLatLng, map: mymap});

        // 吹き出しの追加
        infoWindow[i] = new google.maps.InfoWindow({ 
            content: 
            // infowindo内のコンテンツ(html)を作成
            '<div class="infowindow">' + markerData[i]['name'] + '</div>' + 
            '<a href="http://maps.google.com/maps?saddr=' + markerData[0]['lat'] + ',' + markerData[0]['lng'] + 
            '&daddr='  + markerData[i]['lat'] + ',' + markerData[i]['lng'] + '&dirflg=' + markerData[i]['dir'] + '" target="_blank">' + 
            'GoogleMapでルート検索</a>'
        });

        if (markerData[i]['id'] == 0 || markerData[i]['id'] == 1 || markerData[i]['id'] == 2) {
            // 自宅 or 匠悟or 亮太はマーカー画像を変更
            marker[i].setOptions({icon: {url: markerData[i]['icon']}});
            if (markerData[i]['id'] != 0) {
	            infoWindow[i].open(mymap, marker[i]);
			}
        } else {
            // 入試対象は最初から吹き出しを表示
            infoWindow[i].open(mymap, marker[i]);
        }

        // マーカーにクリックイベントを追加
        markerEvent(i); 
        
    }
}

// マーカーにクリックイベントを追加
function markerEvent(i) {
    // マーカーをクリックしたとき吹き出しの表示
    marker[i].addListener('click', function() { 
        infoWindow[i].open(mymap, marker[i]);
    });

}
