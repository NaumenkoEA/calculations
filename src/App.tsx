import LineChart from "./components/LineChart/LineChart.tsx";

import {useState} from "react";

import FormEquation from "./components/FormEquation/FormEquation.tsx";

export interface MyForm {
    countEquations: number;
    yi: number[];
    parameters: number[];
    startTime: number;
    endTime: number;
    stepTime: number;
}
const App = () => {

    const [result, setResult] = useState<MyForm>()
    console.log(result)
    return (
        <div className='2xl:flex m-10 p-2 border-2 border-blue-600'>

            <div className='flex border-2 m-1 p-2 flex-grow'>
                <FormEquation setResult={setResult} result={result}/>
            </div>

            <div className=' flex border-2 m-2 p-6 flex-grow'>
                <LineChart/>
            </div>

        </div>
    )
}

export default App
