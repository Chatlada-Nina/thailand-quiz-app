import React, { useEffect, useState } from 'react'
import quizData from "../../assets/quizData.json"

const backgrounds = [
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg8.jpg",
    "/bg9.jpg",
    "/bg10.jpg",
];

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizEnd, setQuizEnd] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const getFinalMessage = () => {
        if (score <= 4) return "😅 You might just try only Pad Thai... Not a Thai fan(yet)!";
        if (score <= 6) return "😎 You've had some Thai-thing and it shows — kinda Thai, kinda shy.";
        if (score <= 8) return "This is what we're talking about! Thailand is strong with you!";
        return "🔥 Thai at heart, spirit and maybe past life! You're basically born in a tuk-tuk!";
      };

    const currentQuestion = quizData[currentIndex];
    const [backgroundImage, setBackgroundImage] = useState('');
    const [fadeBg, setFadeBg] = useState(true);

    useEffect(() => {
        let newBg;
        do {
            newBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        } while (newBg === backgroundImage); // prevent repeat
        setBackgroundImage(newBg);
    }, [currentIndex]);

    if (!backgroundImage) return <div className="min-h-screen bg-white" />;

    const handleAnswer = (selectedAnswer) => {
        setSelectedAnswer(selectedAnswer);

        if (selectedAnswer === currentQuestion.answer) {
            setScore(score + 1);
            setFeedback("✅ Correct!");
        } else {
            setFeedback("❌ Oops! not a Thai-thing.");
        }

        // Move to next question after 1 second
        setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < quizData.length) {
            setCurrentIndex(nextIndex);
            setSelectedAnswer(null); // reset for next question
        } else {
            setQuizEnd(true);
        }

        setFeedback(''); // clear feedback at the same time
        }, 1500);
    };

    if (quizEnd) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-rose-50 p-4'>
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-8">Quiz Completed 🎉</h1>
                <p className="text-xl font-semibold mb-2">Your Score: {score} / {quizData.length}</p>
                <h2 className='text-lg italic text-gray-700 mb-8'>{getFinalMessage()}</h2>
                <button onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setQuizEnd(false);
                setSelectedAnswer(null);
                setFeedback('');
            }} className='px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition'>
                Restart
            </button>
            </div>
            </div>
        );
    }
    return (
        <div className={`min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat transition-opacity duration-700 p-4 ${
    fadeBg ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
                <h1 className='text-3xl md:text-4xl font-bold mb-8 text-rose-500'>Think You Know Thailand?</h1>
                <h2 className='text-xl font-semibold mb-8 leading-relaxed'>{currentQuestion.question}</h2>
                {feedback && <p className='mb-2 text-lg font-medium transition-opacity duration-300 text-rose-600 leading-relaxed'>{feedback}</p>}

                <div className='flex flex-col space-y-4'>
                    {currentQuestion.options.map((option, index) => {
                        let baseClass = "w-full py-2 px-4 rounded-lg font-semibold border transition-colors duration-300";
                        let buttonClass;

                        if (selectedAnswer) {
                            if (option === currentQuestion.answer) {
                                buttonClass = `${baseClass} bg-emerald-100 text-emerald-700 border-emerald-300`;
                            } else if (option === selectedAnswer) {
                                buttonClass = `${baseClass} bg-rose-100 text-rose-700 border-rose-300`;
                            } else {
                                buttonClass = `${baseClass} bg-gray-100 text-gray-500 border-gray-300`;
                            }
                        } else {
                            buttonClass = `${baseClass} bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200`;
                        }

                        return (
                            <button
                                key={index}
                                className={buttonClass}
                                onClick={() => handleAnswer(option)}
                                disabled={!!selectedAnswer} // prevent double-clicking
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
                <p className='text-sm text-gray-500 mt-8'>Question {currentIndex + 1} of {quizData.length}</p>
            </div>
        </div>
    );
};

export default Quiz
