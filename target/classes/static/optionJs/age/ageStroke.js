function drawAgeStrokeChart() {
    // 创建柱状图实例
    var ageChart = echarts.init(document.getElementById('ageStrokeChart'));

    $.get('../../../../output/ageInsights.json', function (data) {
        // 将数据保存到变量中
        var ageData = data;
        var ageOptions = {
            title: {
                text: 'Age-Stroke Relationship'
            },
            xAxis: {
                type: 'category',
                data: []
            },
            legend: {
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: 'StrokeCount',
                data: [],
                type: 'bar'
            }]
        };

        // 将JSON数据转换为ECharts需要的格式
        var ageChartData = ageData.map(function (item) {
            return {
                name: item.age,
                value: item.count
            };
        });

        // 将转换后的数据设置到图表配置项中
        ageOptions.xAxis.data = ageData.map(function (item) {
            return item.age;
        });
        ageOptions.series[0].data = ageChartData;
        ageOptions.legend.data = ageChartData.name;

        // 使用图表配置项绘制图表
        ageChart.setOption(ageOptions);
    })
}