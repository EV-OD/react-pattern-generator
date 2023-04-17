import React, { useState } from "react";
import useGradientStore from "../store";
import ColorInput from "./ColorInput";
import type { Gradient } from '../store'
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid"


const Gradient: React.FC<{ index: number }> = ({ index }) => {
    const { updateGradient, removeGradient } = useGradientStore()
    const gradient = useGradientStore((state) => state.gradients[index]);
    const [rotation, setRotation] = useState(gradient.rotation);

    const [width, setWidth] = useState(gradient.width)
    const [height, setHeight] = useState(gradient.height)
    const [isOpen, setIsOpen] = useState(false)



    return <div className="bg-slate-600 p-2 rounded-md grow-[1]">
        <div className="title flex justify-between items-center">
            <h1 className="text-white text-xl text-center">Linear Gradient{index}</h1>
            <div className="btn-group">
                <button className="btn btn-sm" onClick={() => setIsOpen(c => !c)}><ChevronDownIcon width={10} height={10} /></button>
                <button className="btn btn-sm" onClick={() => removeGradient(index)}><TrashIcon width={20} height={20} /></button>
            </div>
        </div>

        {
            isOpen &&
            <div className="mt-3">
                <InputRange extra={{ min: 0, max: 360 }} dim={rotation} gradient={gradient} setDim={setRotation} updateGradient={updateGradient} index={index} />
                <InputRange dim={width} name="width" gradient={gradient} setDim={setWidth} updateGradient={updateGradient} index={index} />
                <InputRange dim={height} name="height" gradient={gradient} setDim={setHeight} updateGradient={updateGradient} index={index} />

                <div className="colorsModifier bg-slate-700 p-3 rounded-md flex flex-col gap-1">
                    {gradient.colors.length > 0 &&
                        gradient.colors.map((colourLocal, i) => {
                            return <div className="modifier" key={i}>

                                <InputRange dim={colourLocal.stop} name="stop" gradient={gradient} setDim={setRotation} onChange={(e) => {
                                    let newGradient: Gradient = JSON.parse(JSON.stringify(gradient))

                                    newGradient.colors[i].stop = Number(e.target.value)
                                    updateGradient(index, newGradient)

                                }} updateGradient={updateGradient} index={index}
                                    ExtraComponent={<ColorInput c={colourLocal.valueNum} onChange={(color, colorNum) => {
                                        let newGradient: Gradient = JSON.parse(JSON.stringify(gradient))
                                        newGradient.colors[i].valueNum = colorNum
                                        newGradient.colors[i].value = color
                                        updateGradient(index, newGradient)

                                    }} />}
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        }
    </div>
};

export default Gradient;

type InputRangeType = {
    dim: number,
    gradient: Gradient,
    setDim: React.Dispatch<React.SetStateAction<number>>,
    updateGradient: (index: number, gradient: Gradient) => void,
    index: number,
    name?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    extra?: any,
    ExtraComponent?: React.ReactNode
}

function InputRange({ dim, gradient, setDim, updateGradient, index, name, onChange, extra, ExtraComponent }: InputRangeType) {
    const [open, setOpen] = useState(false);
    return <div className="flex flex-col gap-2 bg-slate-800 font-semibold mb-1 p-2 rounded-md justify-center">
        {ExtraComponent &&
            ExtraComponent
        }
        <div className="summary flex gap-2 items-center">
            <label htmlFor="" className="mr-auto text-white">{name || "Rotation"}</label>
            <input type="number" className="px-1 rounded-sm bg-slate-600 text-white" value={dim} onChange={onChange ? onChange : (e) => {
                let newGradient: Gradient = JSON.parse(JSON.stringify(gradient));
                newGradient[name ? name : "rotation"] = Number(e.target.value);
                setDim(Number(e.target.value));
                updateGradient(index, newGradient);
            }} />
            <button className="btn btn-sm" onClick={() => setOpen(c => !c)}><ChevronDownIcon width={10} height={10} /></button>
        </div>
        {open &&
            <input type="range" {...extra} value={dim} onChange={onChange ? onChange : (e) => {
                let newGradient: Gradient = JSON.parse(JSON.stringify(gradient));
                newGradient[name ? name : "rotation"] = Number(e.target.value);
                setDim(Number(e.target.value));
                updateGradient(index, newGradient);
            }} />
        }
    </div>
}

