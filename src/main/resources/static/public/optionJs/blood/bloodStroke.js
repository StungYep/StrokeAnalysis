function drawBloodStrokeChart() {
    // 创建柱状图实例
    let bloodChart = echarts.init(document.getElementById('bloodStrokeChart'));

    $.ajax({
        url: '/loadFromDB',
        data: {tableName: 'BloodInsights'},
        success: function (data) {
            // 将数据保存到变量中
            // 将数据保存到变量中
            let bloodData = data;
            let bloodOptions = {
                title: {
                    text: 'Blood-Stroke Relationship',
                    x: '300px',
                    y: '7px',
                },
                xAxis: {
                    type: 'category',
                    showMinLabel: true,
                    showMaxLabel: true,
                    data: [],
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
                    type: 'line',
                    itemStyle:{
                        normal:{
                            color:'#FA0505FF'
                        }
                    }
                }]
            };

            // 将JSON数据转换为ECharts需要的格式

            let filteredData = bloodData.filter(function (item) {
                return item.isStroke === '1';
            });

            var bloodChartData = filteredData.map(function (item) {
                return {
                    name: item.avgBloodGlucose,
                    value: item.count
                };
            });

            // 将转换后的数据设置到图表配置项中
            bloodOptions.xAxis.data = filteredData.map(function (item) {
                return item.avgBloodGlucose;
            });
            bloodOptions.series[0].data = bloodChartData;
            bloodOptions.legend.data = bloodChartData.name;

            // 使用图表配置项绘制图表
            bloodChart.setOption(bloodOptions);


            // 监听下拉框的变化
            $('#filter').on('change', function () {
                const filterValue = $(this).val();

                let filteredData = bloodData.filter(function (item) {
                    return item.isStroke === (filterValue === 'stroke' ? '1' : '0');
                });
                bloodOptions.xAxis.data = filteredData.map(function (item) {
                    return item.avgBloodGlucose;
                });

                bloodOptions.series[0].data = filteredData.map(function (item) {
                    return {
                        name: item.avgBloodGlucose,
                        value: item.count
                    };
                });
                bloodChart.setOption(bloodOptions);
            });
        }
    }).catch(error => {
        console.error(error);
    });
}