import Gradient from "./components/gradient";
import useGradientStore from "./store";

const Editor = () => {
    const { gradients, addGradient } = useGradientStore();

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

    return (
        <div className="p-4 bg-slate-800 overflow-y-auto w-2/5">
            <h1 className="text-2xl font-bold mb-4 text-white">Gradient Editor</h1>
            <div className="flex flex-col gap-4">
                {gradients.map((gradient, index) => (
                    <Gradient key={index} index={index} />

                ))}
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleAddGradient}
            >
                Add Gradient
            </button>
        </div>
    );
};

export default Editor;
