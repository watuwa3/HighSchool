/* Chart.jsでグラフを描画
    公式ホームページ
        http://www.chartjs.org/
	参照
		https://qiita.com/Haruka-Ogawa/items/59facd24f2a8bdb6d369
*/
var chartLabels = ['国語', '社会', '数学', '理科', '英語'];
var chartData = [
	{
		score: [15, 15, 11, 2, 20, 63],
		average: [30.2, 29.2, 25.1, 19.7, 31.8, 136.2],
		tscore: [34.1, 38.9, 39.4, 36.0, 36.4, 35.8],
		cscore: [34.1, 38.9, 39.4, 36.0, 36.4],
		cbgcolor: 'RGBA(225,95,150, 0.5)',
	} , {
		score: [19, 14, 14, 9, 13, 69],
		average: [27.2, 28.3, 25.1, 23.3, 26.3, 131.9],
		tscore: [42.2, 38.2, 43.1, 38.5, 36.1, 38.8],
		cscore: [42.2, 38.2, 43.1, 38.5, 36.1],
		cbgcolor: 'RGBA(115,255,25, 0.5)',
	} , {
		score: [21, 0, 14, 13, 14, 62],
		average: [10.1, 10.1, 10.1, 10.1, 10.1, 10.1],
		tscore: [20.1, 10.1, 20.1, 20.1, 20.1, 10.1],
		cscore: [20.1, 10.1, 20.1, 20.1, 20.1],
		cbgcolor: 'RGBA(25,95,250, 0.5)',
	}];

function initRadarChart() {
	for (var i = 0; i <= 2; i++) {
		/* レーダーチャートの表示 */
	    var ctx = document.getElementById('radar-chart' + (i + 1));
	    var myRadarChart = new Chart(ctx, {
	        type: 'radar', 
	        data: { 
	            labels: chartLabels,
	            datasets: [{
	                label: '第 ' + (i + 1) + ' 回定期テスト',
	                data: chartData[i]['cscore'],
	                backgroundColor: chartData[i]['cbgcolor'],
	                borderColor: 'RGBA(225,95,150, 1)',
	                borderWidth: 1,
	                pointBackgroundColor: 'RGB(46,106,177)'
	            }]
	        },
	        options: {
	            scale:{
	                ticks:{
	                    suggestedMin: 20,
	                    suggestedMax: 60,
	                    stepSize: 10,
	                    backdropColor: '#eee', /* 背景色（cssも修正の事） */
	                    callback: function(value, index, values){
	                        return '' + value
	                    }
	                },
	            },
				maintainAspectRatio: false
	        }
	    });
		/* 得点の表示 */
	    var ctable = document.getElementById('chart-table' + (i + 1));

		var mytable = document.createElement('table');
		var mytrh = document.createElement('tr');
		var mytr1 = document.createElement('tr');
		var mytr2 = document.createElement('tr');
		var mytr3 = document.createElement('tr');
		var mythh = document.createElement('th');
		var myth1 = document.createElement('th');
		var myth2 = document.createElement('th');
		var myth3 = document.createElement('th');
		mythh.textContent = '';
		mytrh.appendChild(mythh);
		myth1.textContent = '得点';
		mytr1.appendChild(myth1);
		myth2.textContent = '偏差値';
		mytr2.appendChild(myth2);
		myth3.textContent = '平均点';
		mytr3.appendChild(myth3);
		for (var j = 0; j <= 5; j++) {
			var myth = document.createElement('th');
			if (j == 5) {
				myth.textContent = '5科合計';
			} else {
				myth.textContent = chartLabels[j];
			}
			mytrh.appendChild(myth);

			var mytd1 = document.createElement('td');
			mytd1.textContent = chartData[i]['score'][j];
			mytr1.appendChild(mytd1);

			var mytd2 = document.createElement('td');
			mytd2.textContent = chartData[i]['tscore'][j];
			mytr2.appendChild(mytd2);

			var mytd3 = document.createElement('td');
			mytd3.textContent = chartData[i]['average'][j];
			mytr3.appendChild(mytd3);
		}

		mytable.appendChild(mytrh);
		mytable.appendChild(mytr1);
		mytable.appendChild(mytr2);
		mytable.appendChild(mytr3);
		ctable.appendChild(mytable);
	}
}

function start() {

    initRadarChart();

}
