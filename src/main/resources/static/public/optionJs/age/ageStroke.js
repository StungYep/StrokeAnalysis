function drawAgeStrokeChart() {
    // 创建柱状图实例
    var ageChart = echarts.init(document.getElementById('ageStrokeChart'));

    $.ajax({
        url: '/loadFromDB',
        data: { tableName: 'AgeInsights' },
        success: function(data) {
            // 将数据保存到变量中
            var ageData = data;

            var ageOptions = {
                title: {
                    text: 'Age-Stroke Relationship',
                    x: '300px',
                    y: '7px',
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

            let filteredData = ageData.filter(function (item) {
                return item.isStroke === '1';
            });

            // 将JSON数据转换为ECharts需要的格式
            var ageChartData = filteredData.map(function (item) {
                return {
                    name: item.age,
                    value: item.count
                };
            });

            //
            ageOptions.xAxis.data = ageChartData.map(function (item) {
                return item.name;
            });
            ageOptions.series[0].data = ageChartData;
            ageOptions.legend.data = ageChartData.name;

            // 使用图表配置项绘制图表
            ageChart.setOption(ageOptions);


            // 监听下拉框的变化
            $('#filter').on('change', function () {
                const filterValue = $(this).val();

                let filteredData = ageData.filter(function (item) {
                    return item.isStroke === (filterValue === 'stroke' ? '1' : '0');
                });

                ageOptions.series[0].data = filteredData.map(function (item) {
                    return {
                        name: item.age,
                        value: item.count
                    };
                });
                ageChart.setOption(ageOptions);
            });
        }
    }).catch(error => {
        console.error(error);
    });
}