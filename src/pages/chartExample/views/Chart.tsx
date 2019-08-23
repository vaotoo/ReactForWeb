import React from 'react';
import { Tabs } from 'antd';
import ChartA from './chartA/ChartA';
import ChartB from './chartB/ChartB';
import style from './Chart.less';

interface IChartProps { }

interface IChartState { }

class ChartComponent extends React.Component<IChartProps, IChartState> {
    constructor(props: IChartProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <Tabs className={style.chartContent} type="card">
                <Tabs.TabPane tab="饼状图" key="1">
                    <ChartA />
                </Tabs.TabPane>
                <Tabs.TabPane tab="柱状图" key="2">
                    <ChartB />
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default ChartComponent;
