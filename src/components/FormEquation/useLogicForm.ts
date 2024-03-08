// equationsLogic.ts
import React, {useState} from "react";

const isValidNumberInput = (input: string) => /^-?\d*\.?\d*$/.test(input);

interface EquationFormData {
    startValue: string;
    parameters: string;
}

interface TimeFormData {
    startTime: string;
    endTime: string;
    step: string;
}

export const useLogicForm = () => {
    const [equations, setEquations] = useState<EquationFormData[]>([{startValue: '', parameters: ''}]);
    const [timeFormData, setTimeFormData] = useState<TimeFormData>({startTime: '', endTime: '', step: ''});

    const handleStartValueChange = (index: number, value: string) => {
        if (isValidNumberInput(value)) {
            const newEquations = [...equations];
            newEquations[index].startValue = value;
            setEquations(newEquations);
        }
    };

    const handleParametersChange = (index: number, value: string) => {
        if (isValidNumberInput(value)) {
            const newEquations = [...equations];
            newEquations[index].parameters = value;
            setEquations(newEquations);
        }
    };

    const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;
        if (isValidNumberInput(value)) {
            setTimeFormData({...timeFormData, [name]: value});
        }
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
