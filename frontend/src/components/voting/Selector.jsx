import { useId } from "react";

export default function Selector({label, options, value, setValue}) {
    const id = useId();

    return (
        <>
            <label htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={e => setValue(e.target.value)}
            >
                {
                    options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
                }
            </select>

        </>
    )
}