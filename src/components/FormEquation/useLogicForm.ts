import React, { useState } from "react";

interface EquationFormData {
    startValue: number;
    parameters: number;
}

interface TimeFormData {
    startTime: number;
    endTime: number;
    step: number;
}

export const useLogicForm = () => {
    const [equations, setEquations] = useState<EquationFormData[]>([{ startValue: 0, parameters: 0 }]);
    const [timeFormData, setTimeFormData] = useState<TimeFormData>({ startTime: 0, endTime: 0, step: 0 });

    const handleStartValueChange = (index: number, value: number) => {
        const newEquations = [...equations];
        newEquations[index].startValue = value;
        setEquations(newEquations);
    };

    const handleParametersChange = (index: number, value: number) => {
        const newEquations = [...equations];
        newEquations[index].parameters = value;
        setEquations(newEquations);
    };

    const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTimeFormData({ ...timeFormData, [name]: parseFloat(value) }); // преобразуем строку в число
    };

    return {
        equations,
        timeFormData,
        handleStartValueChange,
        handleParametersChange,
        handleTimeInputChange,
        setEquations
    };
};
