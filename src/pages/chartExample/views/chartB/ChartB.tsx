import React from 'react';
import { Bind } from 'lodash-decorators';
import { EChartOption } from 'echarts';
import EChart from '@components/ChartComponent';
import { loadChartOption } from './ChartBOption';
import style from '../Chart.less';

interface ITopicProps { }

interface ITopicState {
    loading: boolean;
    chartOption: EChartOption;
}

class TopicComponent extends React.Component<ITopicProps, ITopicState> {
    private EchartTimer: NodeJS.Timeout | undefined;

    constructor(props: ITopicProps, context?: any) {
        super(props, context);
        this.state = {
            loading: false,
            chartOption: {}
        };
    }

    @Bind()
    private onChartReady(EchartInstance: any): void {
        // 以下代码为模拟数据改变的效果 实际请重写以下代码
        this.EchartTimer && clearTimeout(this.EchartTimer);
        this.EchartTimer = setTimeout(() => {
            const chartOption = this.state.chartOption;
            const dataset = chartOption.dataset as any;
            if (Object.keys(chartOption).length) {
                try {
                    dataset.source[1][2] = parseInt(String(Math.random() * 200), 10);
                    EchartInstance.setOption(chartOption);
                    this.onChartReady(EchartInstance);
                } catch (error) { }
            }
        }, 3000);
    }

    /**
     * 获取数据
     */
    @Bind()
    private setChartOption(): void {
        this.setState({
            chartOption: loadChartOption()
        });
    }

    public componentWillMount(): void {
        this.setChartOption();
    }

    public componentWillUnmount(): void {
        this.setState = (): void => undefined;
    }

    public render(): React.ReactNode {
        return (
            <div className={style.chartItem}>
                <EChart
                    style={{ height: 400 }}
                    className={style.chartB}
                    option={this.state.chartOption}
                />
            </div>
        );
    }
}

export default TopicComponent;
