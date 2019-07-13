import { ObjectMap } from 'echarts-for-react';
import { colorList } from '@utils/ChartConfig';

export const loadChartOption = (): ObjectMap => {
    return {
        color: colorList,
        grid: {
            top: 10,
            bottom: 50
        },
        dataset: {
            source: [
                ['A', '2015', '2016', '2017'],
                ['B', 43.3, 85.8, 93.7],
                ['C', 83.1, 73.4, 55.1],
                ['D', 86.4, 65.2, 82.5],
                ['E', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {},
        series: [
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' }
        ],
        textStyle: {
            color: '#666'
        }
    };
};
