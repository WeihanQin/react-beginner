import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);//这样可以在fetch之前，先用null占位，避免报错
    const [isPending, setIsPending] = useState(true);//这里是为了在fetch的时候显示Loading
    const [error, setError] = useState(null);//这里是为了在fetch失败的时候显示错误信息

    useEffect(() => {
        const abortCont = new AbortController();//这里是为了在fetch之前，先取消之前的fetch，避免报错
        setTimeout(() => {//这里是延迟1秒，模拟fetch的时间,现实中不需要
            fetch(url, { signal: abortCont.signal }).then(res => {//成功fetch之后触发then,res代表得到的response，在这里是blogs
                if(!res.ok) {
                    throw Error('could not fetch the data');//这里的Error是内置的
                }
                return res.json();//把blogs转换成json
            }).then(data => {//因为res.json()是个promise，所以要用then
                //console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            }).catch(err => {//如果fetch失败，就会触发catch
                if(err.name === 'AbortError') {//如果是因为abortCont.abort()导致的fetch失败，就不显示错误信息
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 1000);

        return () => abortCont.abort();
    }, [url]);//这里的[]是dependency，如果是空的，就只会在第一次render的时候fetch，如果有值，就会在值改变的时候fetch

    return { data, isPending, error };
    
}

export default useFetch;