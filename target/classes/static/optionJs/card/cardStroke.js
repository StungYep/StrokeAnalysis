function drawCardStrokeChart() {
    // 创建柱状图实例
    const cardChart = echarts.init(document.getElementById('cardStrokeChart'));

    // 将转换后的数据设置到图表配置项中
    let cardOptions  = {
        title: {
            text: 'Cardiopathy-Stroke Relationship',
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
            name: 'Cardiopathy Distribution',
            data: [],
            type: 'pie',
            radius: '55%',
            label: {
                formatter: '{b}: {c} ({d}%)'
            }
        }]
    };

    // 使用图表配置项绘制图表
    cardChart.setOption(cardOptions);

    $.get('../../../../output/cardioInsights.json', function (data) {
        // 将数据保存到变量中
        const cardData = data;

        // Default data
        let filteredData = cardData.filter(function (item) {
            return item.isStroke === '1';
        });

        // 将转换后的数据设置到图表配置项中
        cardOptions.series[0].data = filteredData.map(function (item) {
            return {
                name: item.isCardiopathy === '1' ? "Cardiopathy" : "No-Cardiopathy",
                value: item.count
            };
        });
        cardOptions.legend.data = cardData.name;

        // 使用图表配置项绘制图表
        cardChart.setOption(cardOptions);

        // 监听下拉框的变化
        $('#filter').on('change', function () {
            const filterValue = $(this).val();

            let filteredData = cardData.filter(function (item) {
                return item.isStroke === (filterValue === 'stroke' ? '1' : '0');
            });

            cardOptions.series[0].data = filteredData.map(function (item) {
                return {
                    name: item.isCardiopathy === '1' ? "Cardiopathy" : "No-Cardiopathy",
                    value: item.count
                };
            });
            cardChart.setOption(cardOptions);
        });

        // 判断下拉框的值是否为空，如果为空则使用默认值
        const filterValue = $('#filter').val();
        if (!filterValue) {
            hyperChart.setOption(filterValue);
        }
    });
}