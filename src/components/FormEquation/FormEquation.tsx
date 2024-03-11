import React, {useEffect, useState} from "react";
import {useLogicForm} from "./useLogicForm";
import {EquationFormData} from "../../App.tsx";

interface FormEquationProps {
setResult: React.Dispatch<React.SetStateAction<EquationFormData | undefined>>;
}

const FormEquation: React.FC<FormEquationProps> = ({ setResult }) => {
    const [countEquation, setCountEquation] = useState<number>(1);
    const {
        equations,
        handleStartValueChange,
        handleParametersChange,
        handleTimeInputChange,
        setEquations
    } = useLogicForm();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const numberEquation = parseInt(event.target.value, 10);
        setCountEquation(numberEquation);

        if (numberEquation > equations.length) {
            const newEquations = [...equations];
            for (let i :number = equations.length; i < numberEquation; i++) {
                newEquations.push({
                    countEquations: 0,
                    yi: [0],
                    parameters: [0],
                    startTime: 0,
                    endTime: 0,
                    stepTime: 0
                });
            }
            setEquations(newEquations);
        } else {
            setEquations(equations.slice(0, numberEquation));
        }
    };

    useEffect(() => {
        const sendDataToServer = async (equations: EquationFormData[]) => {
            try {
                const response = await fetch('http://localhost:5189/calculate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        equations
                    })
                });

                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных на сервер');
                }

                const data = await response.json();
                setResult(data); // Устанавливаем полученные данные в result
                console.log('Данные успешно отправлены на сервер:', data);
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        };

        sendDataToServer(equations);
    }, [equations, setResult]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Данные уравнений:', equations);
        try {
            // Дополнительные действия при отправке формы, если необходимо
        } catch (error) {
            console.error('Ошибка отправки данных на сервер:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='flex items-center flex-grow '>
                <h1 className='w-72'>Выберите количество уравнений:</h1>
                <select
                    value={countEquation.toString()}
                    onChange={handleSelectChange}
                    className='border-2 border-black p-1 rounded-2xl w-12 '
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            {equations.map((_, index) => (
                <div className='flex items-center flex-grow' key={index}>
                    <p>Введите начальное значение для Y_{index + 1}:</p>
                    <input
                        className='border-2 border-black m-2 p-1'
                        type="number"
                        value={equations[index].yi[0] ?? []}
                        step="any"
                        onChange={(event) => handleStartValueChange(index, event.currentTarget.value)}
                    />
                </div>
            ))}

            {equations.map((_, index) => (
                <div className='flex items-center flex-grow' key={index}>
                    <p>Введите параметры для Y_{index + 1}:</p>
                    <input
                        className='border-2 border-black m-2 p-1'
                        type="number"
                        value={equations[index].parameters[0] ?? ""}
                        step="any"
                        onChange={(event) => handleParametersChange(index, event.currentTarget.value)}
                    />
                </div>
            ))}

            <div className='flex items-center flex-grow'>
                Начальное время :
                <input
                    type="number"
                    name="startTime"
                    value={equations[0].startTime ?? ""}
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
                    value={equations[0].endTime ?? ""}
                    onChange={(event) => handleTimeInputChange(event)}
                />
            </div>

            <div className='flex items-center flex-grow'>
                Шаг :
                <input
                    type="number"
                    name="stepTime"
                    className='border-2 border-black m-2 p-1'
                    value={equations[0].stepTime ?? ""}
                    onChange={(event) => handleTimeInputChange(event)}
                />
            </div>

            <button type="submit" className='border-black border-2 rounded-full p-2'>Отправить</button>
        </form>
    );
}

export default FormEquation;
