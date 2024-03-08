import LineChart from "./components/LineChart/LineChart.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";

import FormEquation from "./components/FormEquation/FormEquation.tsx";

const App = () => {

    return (
        <div className='2xl:flex m-10 p-2 border-2 border-blue-600'>

            <div className='flex border-2 m-1 p-2 flex-grow'>
                <FormEquation/>
            </div>

            <div className=' flex border-2 m-2 p-6 flex-grow'>
                <LineChart/>
            </div>

        </div>
    )
}

export default App
