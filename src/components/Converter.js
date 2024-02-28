import { useState, useEffect } from 'react';
import '../App.css';

function Converter() {
    const [hexColor, setHexColor] = useState('#ffffff');
    const [rgbColor, setRgbColor] = useState('rgb(255, 255, 255)');
    const [error, setError] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = rgbColor
    }, [rgbColor])

    const onValueChange = (e) => {
        setHexColor(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (isHexColorValid(hexColor) === false) {
            return;
        }

        setError(false);
        const convertedColor = convertToRGB(hexColor);
        setRgbColor(convertedColor);
    }

    const convertToRGB = (color) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        return `rgb(${r}, ${g}, ${b})`;
    }

    const isHexColorValid = (color) => {
        if (!color.startsWith('#') || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.test(color) === false || color.length !== 7) {
            setError(true);
            return false;
        }
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <input id="input" type="text" className="input" placeholder="#ffffff" onChange={onValueChange} defaultValue={hexColor} maxLength="7" />
            <label className="label" htmlFor="input">
                <span className="label-text">{error ? 'Ошибка!' : rgbColor}</span>
            </label>
        </form>
    );
}

export default Converter;