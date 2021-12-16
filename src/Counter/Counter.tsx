import React, {ChangeEvent, useState} from 'react' ;
import s from './Counter.module.css'


function Counter() {
    const [maxValue, setMaxValue] = useState<number>(5)
    const [minValue, setMinValue] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isActiveSetting, setIsActiveSetting] = useState<boolean>(false)
    const [isActiveResetButton, setIsActiveResetButton] = useState<boolean>(false)


    const maxNumber = 5;

    const maxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(+e.currentTarget.value)
        setIsActiveSetting(true)
        setCount(0)
        if(minValue >= +e.currentTarget.value || 0 > +e.currentTarget.value){
            setErrorMessage('Неверное значение')    
        } else {
            setErrorMessage('')
            setMessage('Подтвердите выбранное значение')
        }
    }

    const minValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMinValue(+e.currentTarget.value)
        setIsActiveSetting(true)
        setCount(0)
        if(maxValue <= +e.currentTarget.value || 0 > +e.currentTarget.value){
            setErrorMessage('Неверное значение')    
        } else {
            setErrorMessage('')
            setMessage('Подтвердите выбранное значение')
        }
    }
    
    const setNumber = () => {
        setCount(minValue)
        setMessage('')
        setIsActiveSetting(false)
        setIsActiveResetButton(true)
    }

    const incCallback = () => {
        setCount((prev:number) => prev + 1)
        setIsActiveResetButton(false)
    }

    const resetCallback = () => {
        setCount(minValue)
        setIsActiveResetButton(true)
    }

    return (
        <div className={s.maincontainer}>
            <div className={s.item}>
                <div className={s.block1}>
                    <div className={s.inputStyle1}>
                        max value: <input 
                                        type={"number"}
                                        value={maxValue}
                                        onChange={maxValueChange}
                                    />
                        min value: <input 
                                        type='number'
                                        value={minValue} 
                                        onChange={minValueChange}
                                    />
                    </div>
                    <div className={s.setButton}>
                        <button disabled={!!errorMessage || !isActiveSetting} onClick={setNumber}>Set</button>
                    </div>
                </div>
                <div className={s.block2}>
                    <div 
                        className={`
                            ${s.sValue} 
                            ${errorMessage ? s.redNumber : ''}
                            ${count >= maxValue ? s.redNumber : ''}
                        `}>
                        {errorMessage ? errorMessage : message ? message : count}
                    </div>
                    <div className={s.inc_reset}>
                        <button disabled={isActiveSetting || count === maxValue} onClick={incCallback}>Inc</button>
                        <button disabled={isActiveSetting || isActiveResetButton} onClick={resetCallback}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Counter