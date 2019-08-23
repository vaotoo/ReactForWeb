interface ILoadScriptProps {
    src: string;
    onLoad?(): void;
}

/**
 * 加载JS
 */
export const LoadScript = (props: ILoadScriptProps) => {
    const scriptSrc: string = props.src;
    const onLoad = props.onLoad;

    let sid: string = scriptSrc.indexOf('.js') !== -1 ?
        `j-${scriptSrc.substring(scriptSrc.lastIndexOf('/') + 1, scriptSrc.length - 3)}` :
        scriptSrc.split('/').slice(-2).join('');

    sid = sid.replace(/(\?|\=|\&|\.)/gi, '');

    const scriptNode: Element | null = document.querySelector(`#${sid}`);

    if (scriptNode === null) {
        const script = document.createElement('script');
        // script.async = true;
        script.src = scriptSrc;
        script.id = sid;

        if (onLoad) {
            script.onload = script['onreadystatechange'] = () => {
                script.onload = null;
                script['onreadystatechange'] = null;
                onLoad();
            };
        }

        document.body.insertBefore(script, document.body.lastChild);
    } else {
        const onloadPrev = scriptNode['onload'];
        /* Is loaded */
        if (onloadPrev) {
            scriptNode['onload'] = scriptNode['onreadystatechange'] = () => {
                onloadPrev();
                onLoad && onLoad();
            };
        } else {
            onLoad && onLoad();
        }
    }
};
