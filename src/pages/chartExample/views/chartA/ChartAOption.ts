/**
 * 图表配置
 * @param dataSource 图表数据
 * @see https://echarts.baidu.com/option.html
 */
export const loadChartOption = (dataSource: any) => {
    return {
        tooltip: {
            formatter: '{a} <br/>{c} {b}'
        },
        series: [
            {
                name: '实时成交量',
                type: 'gauge',
                min: 0,
                max: 100,
                splitNumber: 10,
                axisLine: { // 仪表盘轴线相关配置
                    lineStyle: {
                        color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                        width: 5,
                        shadowColor: '#666',
                        shadowBlur: 0
                    }
                },
                axisLabel: { // 刻度标签
                    textStyle: {
                        color: '#666',
                        shadowColor: '#666',
                        shadowBlur: 0
                    }
                },
                axisTick: { // 刻度样式
                    length: 10,
                    lineStyle: {
                        color: 'auto',
                        shadowColor: '#666',
                        shadowBlur: 0
                    }
                },
                splitLine: { // 分隔线样式
                    length: 15,
                    lineStyle: {
                        width: 5,
                        color: '#666',
                        shadowColor: '#666', // 默认透明
                        shadowBlur: 0
                    }
                },
                pointer: { // 仪表盘指针
                    width: 4,
                    shadowColor: '#666',
                    shadowBlur: 0
                },
                title: { // 仪表盘标题
                    offsetCenter: [0, '-30%'],
                    textStyle: {
                        fontSize: 12,
                        color: '#666',
                        shadowColor: '#666',
                        shadowBlur: 5
                    }
                },
                detail: { // 仪表盘详情，用于显示数据
                    width: '70%',
                    borderRadius: 5,
                    shadowColor: '#666',
                    shadowBlur: 5,
                    offsetCenter: [0, '80%'],
                    textStyle: {
                        fontSize: 24,
                        fontWeight: 'bolder',
                        color: '#666'
                    },
                    rich: {
                        width: '100%'
                    }
                },
                data: [{ value: 90, name: '万单' }]
            }
        ]
    };
};
