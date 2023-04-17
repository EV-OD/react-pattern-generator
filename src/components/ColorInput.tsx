import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

type PropsType = {
    onChange?: (color: string, colorNum: number[]) => void,
    c: number[]
}

function ColorInput({ onChange, c }: PropsType) {
    const [colorPicker, setColorPicker] = useState(false)

    const redRef = useRef(c[0])
    const greenRef = useRef(c[1])
    const blueRef = useRef(c[2])
    const alphaRef = useRef(c[3])

    const [color, setColor] = useState(`rgba(${redRef.current},${greenRef.current},${blueRef.current}, ${alphaRef.current})`)

    const modelRef = useRef<HTMLDivElement>(null)

    const handleChange = () => {
        setColor(`rgba(${redRef.current},${greenRef.current},${blueRef.current}, ${alphaRef.current})`)
        if (onChange) {
            onChange(color, [redRef.current, greenRef.current, blueRef.current, alphaRef.current])
        }
    }


    useEffect(() => {
        const fnc = (e: MouseEvent) => {
            if (!modelRef.current?.contains(e.target as HTMLDivElement)) {
                setColorPicker(false)
            }
        }
        window.document.addEventListener("click", fnc)
    })



    return (
        <div className='relative' ref={modelRef}>
            <div onClick={() => setColorPicker(c => !c)} className="color_box border-slate-700 border-2 w-full h-5 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
            {colorPicker &&
                <div className="picker flex flex-col absolute gap-2 bg-slate-50 shadow-lg border-2 p-2 w-[250px] z-10">
                    <div className="colorP red flex flex-col gap-1">
                        <div className="flex">
                            <label htmlFor="redPicker">R: {redRef.current}</label>
                        </div>
                        <input type="range" className='range range-xs' onChange={(e) => {
                            redRef.current = Number(e.target.value)
                            handleChange()

                        }} min="0" max="255" value={redRef.current} id='redPicker' />

                    </div>
                    <div className="colorP green flex flex-col gap-1">
                        <div className="flex">
                            <label htmlFor="redPicker">G:{greenRef.current}</label>
                        </div>
                        <input id='greenPicker' className='range range-xs' onChange={(e) => {
                            greenRef.current = Number(e.target.value)
                            handleChange()

                        }} min="0" max="255" value={greenRef.current} type="range" />
                    </div>
                    <div className="colorP blue flex flex-col gap-1">
                        <div className="flex">
                            <label htmlFor="redPicker">B:{blueRef.current}</label>
                        </div>
                        <input id='bluePicker' className='range range-xs' onChange={(e) => {
                            blueRef.current = Number(e.target.value)
                            handleChange()

                        }} min="0" max="255" value={blueRef.current} type="range" />
                    </div>
                    <div className="colorP alpha flex flex-col gap-1">
                        <div className="flex">
                            <label htmlFor="redPicker">a:{alphaRef.current}</label>
                        </div>
                        <input id='alphaPicker' className='range range-xs' step="0.1" onChange={(e) => {
                            alphaRef.current = Number(e.target.value)
                            handleChange()

                        }} min="0" max="1" value={alphaRef.current} type="range" />
                    </div>
                </div>
            }
        </div>
    )
}

export default ColorInput