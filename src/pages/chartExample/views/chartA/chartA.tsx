import React from 'react';
import { Bind } from 'lodash-decorators';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { loadChartOption } from './chartAOption';
import * as LineService from '../../services/line';
import style from '../chart.less';

interface ITopicProps { }

interface ITopicState {
    loading: boolean;
    dataSource: any[];
    chartOption: ObjectMap;
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
            if (Object.keys(chartOption).length) {
                try {
                    chartOption.series[0].data[0].value = Math.floor(Math.random() * 90);
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
                <ReactEcharts
                    lazyUpdate={true}
                    showLoading={this.state.loading}
                    onChartReady={this.onChartReady}
                    className={style.chartA}
                    opts={{ height: 400 }}
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
