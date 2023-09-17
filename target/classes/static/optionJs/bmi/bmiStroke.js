function drawBmiStrokeChart() {
    // 创建柱状图实例
    var bmiChart = echarts.init(document.getElementById('bmiStrokeChart'));

    $.get('../../../../output/bmiInsights.json', function (data) {
        // 将数据保存到变量中
        var bmiData = data;
        var bmiOptions = {
            title: {
                text: 'Bmi-Stroke Relationship'
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

        let filteredData = bmiData.filter(function (item) {
            return item.isStroke === '1';
        });

        var bmiChartData = filteredData.map(function (item) {
            return {
                name: item.bmiFlag,
                value: item.count
            };
        });

        // 将转换后的数据设置到图表配置项中
        bmiOptions.xAxis.data = bmiData.map(function (item) {
            return item.bmiFlag;
        });
        bmiOptions.series[0].data = bmiChartData;
        bmiOptions.legend.data = bmiChartData.name;

        // 使用图表配置项绘制图表
        bmiChart.setOption(bmiOptions);


        // 监听下拉框的变化
        $('#filter').on('change', function () {
            const filterValue = $(this).val();

            let filteredData = bmiData.filter(function (item) {
                return item.isStroke === (filterValue === 'stroke' ? '1' : '0');
            });

            bmiOptions.series[0].data = filteredData.map(function (item) {
                return {
                    name: item.bmiFlag,
                    value: item.count
                };
            });
            bmiChart.setOption(bmiOptions);
        });
    })
}