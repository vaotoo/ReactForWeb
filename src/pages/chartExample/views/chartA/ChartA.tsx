import React from 'react';
import { Bind } from 'lodash-decorators';
import { EChartOption } from 'echarts';
import EChart from '@components/ChartComponent';
import { loadChartOption } from './ChartAOption';
import * as LineService from '../../services/Line';
import style from '../Chart.less';

interface ITopicProps { }

interface ITopicState {
    loading: boolean;
    dataSource: any[];
    chartOption: EChartOption;
}

class TopicComponent extends React.Component<ITopicProps, ITopicState> {
    private EchartTimer: NodeJS.Timeout | undefined;

    constructor(props: ITopicProps, context?: any) {
        super(props, context);
        this.state = {
            loading: true,
            dataSource: [],
            chartOption: {}
        };
    }

    @Bind()
    private onChartReady(EchartInstance: any): void {
        // 以下代码为模拟数据改变的效果 实际请重写以下代码
        this.EchartTimer && clearTimeout(this.EchartTimer);
        this.EchartTimer = setTimeout(() => {
            const chartOption = this.state.chartOption;
            const series = chartOption.series as any[];
            if (Object.keys(chartOption).length) {
                try {
                    series[0].data[0].value = Math.floor(Math.random() * 90);
                    EchartInstance.setOption(chartOption);
                    this.onChartReady(EchartInstance);
                } catch (error) { }
            }
        }, 2000);
    }

    /**
     * 获取数据
     */
    @Bind()
    private async getChartData(): Promise<void> {
        this.setState({
            loading: false,
            dataSource: await LineService.fetchLineList({})
        }, () => {
            this.setState({
                chartOption: loadChartOption(this.state.dataSource)
            });
        });
    }

    /**
     * 组装图表容器
     */
    @Bind()
    private executeChartPanel(): React.ReactNode {
        return (
            <div className={style.chartItem}>
                <EChart
                    style={{ height: 400 }}
                    className={style.chartA}
                    option={this.state.chartOption}
                />
            </div>
        );
    }

    public componentWillMount(): void {
        this.getChartData();
    }

    public componentWillUnmount(): void {
        this.setState = (): void => undefined;
    }

    public render(): React.ReactNode {
        return this.state.dataSource.length ? this.executeChartPanel() : '';
    }
}

export default TopicComponent;
