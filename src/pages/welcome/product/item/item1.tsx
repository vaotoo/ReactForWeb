import React from 'react';
import { Row, Col, Icon } from 'antd';
import style from '../product.less';

interface IFeatureInfo {
    icon: string;
    title: string;
    desc: string;
}

const featureList: IFeatureInfo[] = [{
    icon: 'smile',
    title: '简单易用',
    desc: '简单清爽的操作流程，让业务人员也能轻松搞定数据分析。'
}, {
    icon: 'like',
    title: '一键对接业务数据',
    desc: '简单清爽的操作流程，让业务人员也能轻松搞定数据分析。'
}, {
    icon: 'block',
    title: '拖拽完成平台布局',
    desc: '简单清爽的操作流程，让业务人员也能轻松搞定数据分析。'
}, {
    icon: 'radar-chart',
    title: '灵活的多维度分析',
    desc: '简单清爽的操作流程，让业务人员也能轻松搞定数据分析。'
}, {
    icon: 'pie-chart',
    title: '拖拽生成酷炫图表',
    desc: '简单清爽的操作流程，让业务人员也能轻松搞定数据分析。'
}, {
    icon: 'database',
    title: '图表数据实时更新',
    desc: '简单清爽的操作流程，让业务人员也能轻松搞定数据分析。'
}];

class ItemComponent extends React.Component {
    constructor(props: any, context?: any) {
        super(props, context);
    }

    private executeFeature(): React.ReactNode {
        return featureList.map((ietm: IFeatureInfo, index: number) => {
            return (
                <Col span={8} key={index}>
                    <div className={style.featureItem}>
                        <Icon className={style.featureIcon} type={ietm.icon} />
                        <div className={style.featureTitle}>{ietm.title}</div>
                        <div className={style.featureDesc}>{ietm.desc}</div>
                    </div>
                </Col>
            );
        });
    }

    public render(): React.ReactNode {
        return (
            <Row className={style.featureBox}>
                {this.executeFeature()}
            </Row>
        );
    }
}

export default ItemComponent;
