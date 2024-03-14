// import { useForm} from "react-hook-form";
// import React, { useState} from "react";
//
// export interface MyForm {
//     countEquations: number;
//     yi: number[];
//     parameters: number[];
//     startTime: number;
//     endTime: number;
//     stepTime: number;
// }
//
// const FormEquation: React.FC = () => {
//     const {register} = useForm<MyForm>({
//         defaultValues: {
//             countEquations: 1,
//             startTime: 0
//         }
//     });
//
//
//     const [equations, setEquations] = useState<MyForm[]>([{
//         countEquations: 0,
//         yi: [0],
//         parameters: [0],
//         startTime: 0,
//         endTime: 0,
//         stepTime: 0
//     }]);
//
//     const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const numberEquation = parseInt(event.target.value, 10);
//
//
//         if (numberEquation > equations.length) {
//             const newEquations = [...equations];
//             for (let i: number = equations.length; i < numberEquation; i++) {
//                 newEquations.push({
//                     countEquations: 0,
//                     yi: [],
//                     parameters: [],
//                     startTime: 0,
//                     endTime: 0,
//                     stepTime: 0
//                 });
//             }
//             setEquations(newEquations);
//         } else {
//             setEquations(equations.slice(0, numberEquation));
//         }
//     };
//
//
//     const handleSubmits = async (e: React.FormEvent) => {
//         e.preventDefault();
//
//         try {
//             const response = await fetch("http://localhost:5098/calculate", {
//
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(equations),
//             });
//
//             if (!response.ok) {
//                 throw new Error("Request failed");
//             }
//
//             const responseData = await response.json();
//
//             // Set the returned data in the state
//             setEquations((prevData) => ({
//                 ...prevData,
//                 returnedData: responseData,
//             }));
//         } catch (error) {
//             console.log("Error:", error);
//         }
//     };
//
//     return <div className='flex-col  '>
//         <h1>Введите данные дифференциального уравнения</h1>
//         <form onSubmit={handleSubmits} className='flex-col '>
//
//             <div className='flex items-center p-1'>
//                 <p className='mr-2'>Количество уравнений :</p>
//                 <select
//                     {...register('countEquations', {required: true})}
//                     className='flex m-1 p-1 rounded-xl'
//                     onChange={handleSelectChange}
//                 >{[1, 2, 3, 4].map(i =>
//                     <option  value={i}>{i}</option>
//                 )}
//                 </select>
//             </div>
//
//             {equations.map((_, index) => (
//                 <div className='flex items-center m-1 '>
//                     <p className='mr-2'>Начальное значение для Y_{index + 1} :</p>
//                     <input
//                         type="number"
//                         step='any'
//                         {...register('yi', {required: true})}
//                         className='flex m-1 p-1 rounded-xl'/>
//
//                     <p className='mr-2'>Параметр для Y_{index + 1}:</p>
//                     <input
//                         type="number"
//                         step='any'
//                         {...register('parameters', {required: true})}
//                         className='flex m-1 p-1 rounded-xl'/>
//                 </div>
//             ))}
//
//             <div className='flex items-center m-1'>
//                 <p className='mr-2'>Начальное время :</p>
//                 <input
//                     type="number"
//                     step='any'
//                     {...register('startTime', {required: true})}
//                     className='flex m-1 p-1 rounded-xl'/>
//             </div>
//
//             <div className='flex items-center m-1'>
//                 <p className='mr-2'>Конечное время :</p>
//                 <input
//                     type="number"
//                     step='any'
//                     {...register('endTime', {required: true})}
//                     className='flex m-1 p-1 rounded-xl'/>
//             </div>
//
//             <div className='flex items-center m-1'>
//                 <p className='mr-2'>Шаг по времени :</p>
//                 <input
//                     type="number"
//                     step='any'
//                     {...register('stepTime', {required: true})}
//                     className='flex m-1 p-1 rounded-xl'/>
//             </div>
//
//             <button className='rounded-2xl border-black border-2 p-1 bg-amber-100'>Отправить</button>
//         </form>
//     </div>
// }
//
// export default FormEquation


import React, {useState} from "react";
import {ResultData} from "../../App.tsx";
export interface MyForm {
    countEquations: number;
    yi: number[];
    parameters: number[];
    startTime: number;
    endTime: number;
    stepTime: number;
}

const FormEquation = ({setResult}:ResultData) => {
    const [formData, setFormData] = useState<MyForm>({
        countEquations: 0,
        yi: [],
        parameters: [],
        startTime: 1,
        endTime: 1,
        stepTime: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5189/calculate", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const responseData = await response.json();

            // Set the returned data in the state
            setResult(responseData);
        } catch (error) {
            console.log("Error:", error);
        }


    };

    return (
        <form onSubmit={handleSubmit} className='flex-col '>
            <label>
                Count Equations:
                <input
                    type="number"
                    name="countEquations"
                    value={formData.countEquations}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                yi:
                <input
                    type="number"
                    name="yi"
                    value={formData.yi}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                Parameters:
                <input
                    type="number"
                    name="parameters"
                    value={formData.parameters}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                Start Time:
                <input
                    type="number"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                End Time:
                <input
                    type="number"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                Step Time:
                <input
                    type="number"
                    name="stepTime"
                    value={formData.stepTime}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormEquation;