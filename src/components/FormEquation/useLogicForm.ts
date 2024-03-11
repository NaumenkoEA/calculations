import React, {useState} from 'react';
import {EquationFormData} from "../../App.tsx";



export const useLogicForm = () => {
    const [equations, setEquations] = useState<EquationFormData[]>([{
        countEquations: 1,
        yi: [0],
        parameters: [0],
        startTime: 0,
        endTime: 0,
        stepTime: 0
    }]);

    const handleStartValueChange = (index: number, value: string) => {
        const newEquations = equations.map((equation, eqIndex) => {
            if (eqIndex === index) {
                return {
                    ...equation,
                    yi: [value === '' ? 0 : parseFloat(value)] // Обновляем значение yi
                };
            }
            return equation;
        });
        setEquations(newEquations);
    };


    const handleParametersChange = (index: number, value: string) => {
        const newEquations = equations.map((equation, eqIndex) => {
            if (eqIndex === index) {
                return {
                    ...equation,
                    parameters: [value === '' ? 0 : parseFloat(value)]
                };
            }
            return equation;
        });
        setEquations(newEquations);
    };

    const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const parsedValue = value !== '' ? parseFloat(value) : null;
        const newEquations = equations.map(equation => ({
            ...equation,
            [name]: parsedValue
        }));
        setEquations(newEquations);
    };

    return {
        equations,
        handleStartValueChange,
        handleParametersChange,
        handleTimeInputChange,
        setEquations
    };
};
