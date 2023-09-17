function drawHyperStrokeChart() {
    // 创建柱状图实例
    const hyperChart = echarts.init(document.getElementById('hyperStrokeChart'));

    // 将转换后的数据设置到图表配置项中
    let hyperOptions  = {
        title: {
            text: 'Hypertension-Stroke Relationship'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            data: []
        },
        series: [{
            name: 'Hypertension Distribution',
            data: [],
            type: 'pie',
            radius: '55%',
            label: {
                formatter: '{b}: {c} ({d}%)'
            }
        }]
    };

    // 使用图表配置项绘制图表
    hyperChart.setOption(hyperOptions);

    $.get('../../../../output/hyperInsights.json', function (data) {
        // 将数据保存到变量中
        const hyperData = data;

        // Default data
        let filteredData = hyperData.filter(function (item) {
            return item.isStroke === '1';
        });

        // 将转换后的数据设置到图表配置项中
        hyperOptions.series[0].data = filteredData.map(function (item) {
            return {
                name: item.isHypertension === '1' ? "Hypertension" : "No-Hypertension",
                value: item.count
            };
        });
        hyperOptions.legend.data = hyperData.name;

        // 使用图表配置项绘制图表
        hyperChart.setOption(hyperOptions);

        // 监听下拉框的变化
        $('#filter').on('change', function () {
            const filterValue = $(this).val();

            let filteredData = hyperData.filter(function (item) {
                return item.isStroke === (filterValue === 'stroke' ? '1' : '0');
            });

            hyperOptions.series[0].data = filteredData.map(function (item) {
                return {
                    name: item.isHypertension === '1' ? "Hypertension" : "No-Hypertension",
                    value: item.count
                };
            });
            hyperChart.setOption(hyperOptions);
        });

        // 判断下拉框的值是否为空，如果为空则使用默认值
        const filterValue = $('#filter').val();
        if (!filterValue) {
            hyperChart.setOption(filterValue);
        }
    });
}