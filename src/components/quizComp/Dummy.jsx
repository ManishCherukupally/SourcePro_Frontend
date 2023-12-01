import { Button, Group, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { QuizScoreGreen, QuizScoreRed } from './QuizScoreColor';

const Dummy = () => {

    return(
        <>
        
        </>
    )
};

export default Dummy;

// const [inputValue, setInputValue] = useState('');
//     const [showScore, setShowScore] = useState(false);

//     const handleInputChange = (/** @type {{ target: { value: React.SetStateAction<string>; }; }} */ e) => {
//         setInputValue(e.target.value);
//     };

//     const handleSubmit = (/** @type {{ preventDefault: () => void; }} */ e) => {
//         e.preventDefault();

//         // Convert the input value to a number
//         const score = parseFloat(inputValue);

//         // Check if the score is above 70
//         if (!isNaN(score) && score > 70) {
//             setShowScore(true);
//         } else {
//             setShowScore(false);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <Group>
//                     <TextInput type='number'
//                         w={'10rem'}
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Enter your score"
//                     />
//                     <Button type="submit">Submit</Button>
//                 </Group>
//             </form>
//             {showScore ? <QuizScoreGreen /> : <QuizScoreRed />}
//         </div>
//     );
