/**
 * @description targetNode     目标全屏节点
 * @description inFullScreen   进入全屏事件
 * @description exitFullScreen 退出全屏事件
 * @description cantFullScreen 不能调起全屏事件
 */
export interface IFullScreenUtilProps {
    targetNode: Element;
    inFullScreen?(): void;
    exitFullScreen?(): void;
    cantFullScreen?(): void;
}

class FullScreen {
    private props: IFullScreenUtilProps;
    private screenFactory: any;
    private screenfullCache: any;
    private keyboardAllowed: boolean = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

    constructor(props: IFullScreenUtilProps) {
        this.props = props;
        this.screenFactory = this.screenHandeler();

        if (!this.screenFactory) {
            typeof this.props.cantFullScreen === 'function' && this.props.cantFullScreen();
        } else {
            this.screenfullCache ? this.triggerScreenFull() : this.executeScreenFull();
        }
    }

    /**
     * 浏览器全屏事件名称枚举
     */
    private screenHandeler(): boolean | object {
        const result: object = {};
        const fullMap: Array<[string, string, string, string, string, string]> = [
            [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror'
            ],
            // New WebKit
            [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            // Old WebKit (Safari 5.1)
            [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror'
            ],
            [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError'
            ]
        ];

        fullMap.forEach((item, index: number) => {
            item && item[1] in document && !Object.keys(result).length &&
                item.forEach((info, idx: number) => {
                    result[fullMap[0][idx]] = info;
                });
        });

        return Object.keys(result).length ? result : false;
    }

    /**
     * 全屏事件类集合
     */
    private fullScreenUtil(): object {
        const eventNameMap = {
            change: this.screenFactory.fullscreenchange,
            error: this.screenFactory.fullscreenerror
        };

        const fullScreen = {
            request: (elem: any) => {
                const request = this.screenFactory.requestFullscreen;
                elem = elem || document.documentElement;
                // Work around Safari 5.1 bug: reports support for
                // keyboard in fullscreen even though it doesn't.
                // Browser sniffing, since the alternative with
                // setTimeout is even worse.
                /5\.1[.\d]* Safari/.test(navigator.userAgent) ?
                    elem[request]() :
                    elem[request](this.keyboardAllowed ? Element['ALLOW_KEYBOARD_INPUT'] : {});
            },
            exit: () => {
                document[this.screenFactory.exitFullscreen]();
            },
            toggle: (elem: any) => {
                fullScreen['isFullscreen'] ? fullScreen.exit() : fullScreen.request(elem);
            },
            onchange: (callback: () => void) => {
                fullScreen.on('change', callback);
            },
            onerror: (callback: () => void) => {
                fullScreen.on('error', callback);
            },
            on: (event: any, callback: () => void) => {
                const eventName = eventNameMap[event];
                eventName && document.addEventListener(eventName, callback, false);
            },
            off: (event: any, callback: () => void) => {
                const eventName = eventNameMap[event];
                eventName && document.removeEventListener(eventName, callback, false);
            },
            raw: this.screenFactory
        };

        Object.defineProperties(fullScreen, {
            isFullscreen: {
                get: () => !!document[this.screenFactory.fullscreenElement]
            },
            element: {
                enumerable: true,
                get: () => document[this.screenFactory.fullscreenElement]
            },
            enabled: {
                enumerable: true,
                // Coerce to boolean in case of old WebKit
                get: () => !!document[this.screenFactory.fullscreenEnabled]
            }
        });

        return fullScreen;
    }

    /**
     * 执行全屏操作
     */
    private executeScreenFull(): void {
        const fullScreen: object = this.fullScreenUtil();
        const changeCall = () => {
            if (!fullScreen['isFullscreen']) {
                typeof this.props.exitFullScreen === 'function' && this.props.exitFullScreen();
            } else {
                typeof this.props.inFullScreen === 'function' && this.props.inFullScreen();
            }
        };

        fullScreen['off']('change', changeCall);
        fullScreen['on']('change', changeCall);
        this.screenfullCache = fullScreen;
        this.triggerScreenFull();
    }

    /**
     * 调起全屏切换
     */
    private triggerScreenFull(): void {
        this.screenfullCache.toggle(this.props.targetNode);
    }
}

export default FullScreen;
