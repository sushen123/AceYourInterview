import { useEffect, useRef } from 'react'
export default function Banner2(): JSX.Element {
    const banner = useRef<HTMLDivElement>()

    const atOptions = {
        key: '3d720727734a82f9bf28d94a3834804d',
        format: 'iframe',
        height: 60,
        width: 468,
        params: {},
    }
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//paymentperiodiciceberg.com/3d720727734a82f9bf28d94a3834804d/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}