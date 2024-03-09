import React, { useState } from "react";
import { useLogicForm } from "./useLogicForm.ts";

const FormEquation: React.FC = () => {
    const [formState, setFormState] = useState({ numberEquation: 1 });
    const {
        equations,
        timeFormData,
        handleStartValueChange,
        handleParametersChange,
        handleTimeInputChange,
        setEquations
    } = useLogicForm();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const numberEquation = parseInt(event.target.value, 10);
        setFormState({ ...formState, numberEquation });

        if (numberEquation > equations.length) {
            setEquations([...equations, ...Array(numberEquation - equations.length).fill({ startValue: 0, parameters: 0 })]);
        } else {
            setEquations(equations.slice(0, numberEquation));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Данные уравнений:', equations);
        console.log('Данные времени:', timeFormData);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='flex items-center flex-grow '>
                <h1 className='w-72'>Выберите количество уравнений:</h1>
                <select
                    value={formState.numberEquation.toString()}
                    onChange={handleSelectChange}
                    className='border-2 border-black p-1 rounded-2xl w-12 '
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            {equations.map((equation, index) => (
                <div className='flex items-center flex-grow' key={index}>
                    <p>Введите начальное значение для Y_{index + 1}:</p>
                    <input
                        className='border-2 border-black m-2 p-1'
                        type="number"
                        value={equation.startValue === null ? '' : equation.startValue}
                        step="any"
                        onChange={(event) => handleStartValueChange(index, parseFloat(event.target.value))}
                    />
                </div>
            ))}

            {equations.map((equation, index) => (
                <div className='flex items-center flex-grow' key={index}>
                    <p>Введите параметры для Y_{index + 1}:</p>
                    <input
                        className='border-2 border-black m-2 p-1'
                        type="number"
                        value={equation.parameters === null ? '' : equation.parameters}
                        step="any"
                        onChange={(event) => handleParametersChange(index, parseFloat(event.target.value))}
                    />
                </div>
            ))}

            <div className='flex items-center flex-grow'>
                Начальное время :
                <input
                    type="number"
                    name="startTime"
                    value={timeFormData.startTime}
                    onChange={(event) => handleTimeInputChange(event)}
                    className='border-2 border-black m-2 p-1'
                />
            </div>

            <div className='flex items-center flex-grow'>
                Конечное время :
                <input
                    type="number"
                    name="endTime"
                    className='border-2 border-black m-2 p-1'
                    value={timeFormData.endTime}
                    onChange={(event) => handleTimeInputChange(event)}
                />
            </div>

            <div className='flex items-center flex-grow'>
                Шаг :
                <input
                    type="number"
                    name="step"
                    className='border-2 border-black m-2 p-1'
                    value={timeFormData.step}
                    onChange={(event) => handleTimeInputChange(event)}
                />
            </div>

            <button type="submit" className='border-black border-2 rounded-full p-2'>Отправить</button>
        </form>
    );
}

export default FormEquation;
