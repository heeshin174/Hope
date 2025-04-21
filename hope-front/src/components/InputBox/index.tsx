import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'
import './style.css'

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    onButtonClick?: () => void;
    message?: string;

    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

// ref: enter 치면 다음 줄로 넘어감
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    // properties
    const { label, type, error, placeholder, value, icon, message } = props
    const { onChange, onButtonClick, onKeyDown } = props

    // event handlers
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!onKeyDown) return;
        onKeyDown(e);
    }

    return (
        <div className="inputbox">
            <div className="inputbox-label">{label}</div>
            <div className={error ? "inputbox-container-error" : "inputbox-container"}>
                <input ref={ref} className="input" type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
                {onButtonClick && (
                    <div className="icon-button" onClick={onButtonClick}>
                        {icon && <div className={`icon ${icon}`}></div>}
                    </div>
                )}
            </div>
            {message && <div className="inputbox-message">{message}</div>}
        </div>
    )
})

export default InputBox