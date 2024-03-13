import {SubmitHandler, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {MyForm} from "../../App.tsx";


const FormEquation: React.FC = () => {
    const [countEquations, setCountEquations] = useState<number>(1)
    const {register, handleSubmit} = useForm<MyForm>({
        defaultValues: {
            countEquations: 1,
            startTime: 0
        }
    });


    const [equations, setEquations] = useState<MyForm[]>([{
        countEquations: 1,
        yi: [0],
        parameters: [0],
        startTime: 0,
        endTime: 0,
        stepTime: 0
    }]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const numberEquation = parseInt(event.target.value, 10);
        setCountEquations(numberEquation);

        if (numberEquation > countEquations) {
            const newEquations = [...equations];
            for (let i: number = equations.length; i < numberEquation; i++) {
                newEquations.push({
                    countEquations: 0,
                    yi: [],
                    parameters: [],
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
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({equations})
        };
        fetch('http://localhost:5189/calculate', requestOptions)
            .then(response => response.json())
        console.log('то что в equations ', equations)
// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [equations]);

    const submit: SubmitHandler<MyForm> = data => {
        console.log('Data', data);
    }

    return <div className='flex-col  '>
        <h1>Введите данные дифференциального уравнения</h1>
        <form onSubmit={handleSubmit(submit)} className='flex-col '>

            <div className='flex items-center p-1'>
                <p className='mr-2'>Количество уравнений :</p>
                <select
                    {...register('countEquations', {required: true})}
                    className='flex m-1 p-1 rounded-xl'
                    onChange={handleSelectChange}
                >{[1, 2, 3, 4].map(i =>
                    <option key={i} value={i}>{i}</option>
                )}
                </select>
            </div>

            {equations.map((_, index) => (
                <div className='flex items-center m-1 '>
                    <p className='mr-2'>Начальное значение для Y_{index + 1} :</p>
                    <input
                        type="number"
                        step='any'
                        {...register('yi', {required: true})}
                        className='flex m-1 p-1 rounded-xl'/>

                    <p className='mr-2'>Параметр для Y_{index + 1}:</p>
                    <input
                        type="number"
                        step='any'
                        {...register('parameters', {required: true})}
                        className='flex m-1 p-1 rounded-xl'/>
                </div>
            ))}

            <div className='flex items-center m-1'>
                <p className='mr-2'>Начальное время :</p>
                <input
                    type="number"
                    step='any'
                    {...register('startTime', {required: true})}
                    className='flex m-1 p-1 rounded-xl'/>
            </div>

            <div className='flex items-center m-1'>
                <p className='mr-2'>Конечное время :</p>
                <input
                    type="number"
                    step='any'
                    {...register('endTime', {required: true})}
                    className='flex m-1 p-1 rounded-xl'/>
            </div>

            <div className='flex items-center m-1'>
                <p className='mr-2'>Шаг по времени :</p>
                <input
                    type="number"
                    step='any'
                    {...register('stepTime', {required: true})}
                    className='flex m-1 p-1 rounded-xl'/>
            </div>

            <button className='rounded-2xl border-black border-2 p-1 bg-amber-100'>Отправить</button>
        </form>
    </div>
}

export default FormEquation