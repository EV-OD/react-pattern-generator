import { useEffect, useState } from "react";
import Gradient from "./components/gradient";
import useGradientStore from "./store";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';


const Editor = ({ outputRef }: { outputRef: React.RefObject<HTMLDivElement> }) => {
    const { gradients, addGradient } = useGradientStore();
    const [codeBg, setCodeBg] = useState("")
    const [codeBs, setCodeBs] = useState("")


    const handleAddGradient = () => {
        const newGradient = {
            rotation: 0,
            width: 100,
            height: 100,
            colors: [{
                value: "black",
                valueNum: [0, 0, 0, 1],
                stop: 50,
            },
            {
                value: "white",
                valueNum: [255, 255, 255, 1],
                stop: 50,
            }
            ]
        };
        addGradient(newGradient);
    };

    useEffect(() => {
        if (outputRef.current) {
            setCodeBg(outputRef.current.style.backgroundImage)
            setCodeBs(outputRef.current.style.backgroundSize)

        }
    })

    return (
        <div className="p-4 bg-slate-800 overflow-y-auto small:w-2/5 small:top-0 small:relative fixed bottom-0 top-[60%] w-full ">
            <h1 className="text-2xl font-bold mb-4 text-white">Gradient Editor</h1>
            <div className="flex flex-col gap-4">
                {gradients.map((gradient, index) => (
                    <Gradient key={index} index={index} />

                ))}
            </div>
            <div className="extra flex flex-col">
                <div style={{ display: (codeBg.length == 0 || codeBs.length == 0) ? "none" : "inline-block" }} className="code-output mt-2">
                    <SyntaxHighlighter language="css">
                        {`background-image: ${codeBg};
background-size: ${codeBs};`}
                    </SyntaxHighlighter>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    onClick={handleAddGradient}
                >
                    Add Gradient
                </button>
            </div>
        </div>
    );
};

export default Editor;
