import React from 'react';
import Link from 'umi/link';
import { Button } from 'antd';
import TweenOne from 'rc-tween-one';
import { Element } from 'rc-banner-anim';
import { IElementConf } from './elementConf';
import style from '../banner.less';

export const ElementNode = (item: IElementConf, index: number): React.ReactNode => {
    return (
        <Element
            key={index}
            prefixCls={style.bannerElem}
        >
            <Element.BgElement
                key="bg"
                className={style.bannerBg}
                style={{ background: item.background }}
            />
            <TweenOne
                className={style.bannerTitle}
                animation={{
                    scale: 2,
                    rotate: 0,
                    repeat: 0,
                    opacity: 1
                }}
            >
                {item.title}
            </TweenOne>
            <TweenOne
                className={style.bannerDesc}
                animation={{
                    rotate: 0,
                    repeat: 0,
                    opacity: 1,
                    delay: 500
                }}
            >
                {item.desc}
            </TweenOne>
            <TweenOne
                className={style.bannerButton}
                animation={{
                    opacity: 1
                }}
            >
                <Link to={item.link.to}>
                    <Button>{item.link.title}</Button>
                </Link>
            </TweenOne>
            <TweenOne
                className={style.bannerImg}
                animation={{
                    opacity: .9
                }}
            >
                <img src={item.banner} />
            </TweenOne>
        </Element>
    );
};
