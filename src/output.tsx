import useGradientStore from "./store";

const Output = () => {
    const { gradients } = useGradientStore();

    let code = ""
    let codeSize = ""

    gradients.forEach((gradient, i) => {
        let g = `linear-gradient(${gradient.rotation}deg`
        gradient.colors.forEach(color => {
            g += `,${color.value} ${color.stop}%`
        })
        g += ")"
        code += `${g} ${i == gradients.length - 1 ? "" : ","}`
        codeSize += `${gradient.width}% ${gradient.height}% ${i == gradients.length - 1 ? "" : ","}`
    })

    let styleObj = {
        backgroundImage: code,
        backgroundSize: codeSize,
    }

    return (
        <div className="w-full h-screen p-5 border-4 border-slate-800">
            <div
                className="w-full h-full"
                style={styleObj}
            ></div>
        </div>
    );
};

export default Output;
