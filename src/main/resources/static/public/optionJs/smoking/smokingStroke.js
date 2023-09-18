function drawSmokingStrokeChart() {
    // 创建柱状图实例
    const smokingChart = echarts.init(document.getElementById('smokingStrokeChart'));

    // 将转换后的数据设置到图表配置项中
    let smokingOptions  = {
        title: {
            text: 'Smoking-Stroke Relationship',
            x: '200px',
            y: '7px',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            data: []
        },
        series: [{
            name: 'Smoking Distribution',
            data: [],
            type: 'pie',
            radius: '55%',
            label: {
                formatter: '{b}: {c} ({d}%)'
            },
            itemStyle: {
                normal: {
                    color: function (colors) {
                        var colorList = [
                            '#f9c956',
                            '#75bedc'
                        ];
                        return colorList[colors.dataIndex];
                    }
                },
            }
        }]
    };

    // 使用图表配置项绘制图表
    smokingChart.setOption(smokingOptions);

    $.ajax({
        url: '/loadFromDB',
        data: {tableName: 'SmokingInsights'},
        success: function (data) {
            // 将数据保存到变量中
            var smokingData = JSON.parse(data);

            // Default data
            let filteredData = smokingData.filter(function (item) {
                return item.isStroke === '1';
            });

            // 将转换后的数据设置到图表配置项中
            smokingOptions.series[0].data = filteredData.map(function (item) {
                return {
                    name: item.isSmoking === '1' ? "Smoker" : "No-Smoker",
                    value: item.count
                };
            });
            smokingOptions.legend.data = smokingData.name;

            // 使用图表配置项绘制图表
            smokingChart.setOption(smokingOptions);

            // 监听下拉框的变化
            $('#filter').on('change', function () {
                const filterValue = $(this).val();

                let filteredData = smokingData.filter(function (item) {
                    return item.isStroke === (filterValue === 'stroke' ? '1' : '0');
                });

                smokingOptions.series[0].data = filteredData.map(function (item) {
                    return {
                        name: item.isSmoking === '1' ? "Smoker" : "No-Smoker",
                        value: item.count
                    };
                });
                smokingChart.setOption(smokingOptions);
            });

            // 判断下拉框的值是否为空，如果为空则使用默认值
            const filterValue = $('#filter').val();
            if (!filterValue) {
                smokingChart.setOption(filterValue);
            }
        }
    }).catch(error => {
        console.error(error);
    });
}