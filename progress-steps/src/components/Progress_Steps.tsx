import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Step 1",
    description: "Welcome! Let’s start with something simple.",
    task: "What is 2 + 2?",
    hint: "It's the same as 2 doubled.",
    answer: "4",
  },
  {
    title: "Step 2",
    description: "Let’s test your memory.",
    task: "What was the task in Step 1?",
    hint: "It was a basic math question.",
    answer: "what is 2 + 2",
  },
  {
    title: "Step 3",
    description: "Something visual now.",
    task: "Name a color in the rainbow.",
    hint: "Think ROYGBIV.",
    answer: "red",
  },
  {
    title: "Step 4",
    description: "Final challenge!",
    task: "Type the word 'complete' to finish.",
    hint: "It starts with 'com' and ends with 'plete'.",
    answer: "complete",
  },
];

const ProgressSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const { title, description, task, hint, answer } = steps[currentStep];
  const normalizedAnswer = answer.trim().toLowerCase();
  const normalizedInput = input.trim().toLowerCase();
  const isAnswerCorrect = normalizedInput === normalizedAnswer;

  const nextStep = () => {
    if (isAnswerCorrect) {
      if (currentStep === steps.length - 1) {
        setIsCompleted(true);
      } else {
        setCurrentStep(currentStep + 1);
        setShowHint(false);
        setInput("");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowHint(false);
      setInput("");
    }
  };

  const progressWidth = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-50">
      {!isCompleted ? (
        <>
          {/* Step Tracker */}
          <div className="relative flex justify-between w-full max-w-xl mb-8">
            <div className="absolute top-5 left-0 right-0 h-2 bg-gray-300 rounded" />
            <motion.div
              className="absolute top-5 left-0 h-2 bg-blue-500 rounded"
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.4 }}
            />
            {steps.map((step, index) => (
              <div
                key={index}
                className="z-10 flex flex-col items-center w-1/4"
              >
                <motion.div
                  className={`flex items-center justify-center h-10 w-10 rounded-full border-2 text-white text-sm font-semibold ${
                    index < currentStep
                      ? "bg-green-500 border-green-500"
                      : index === currentStep
                      ? "bg-blue-500 border-blue-500"
                      : "bg-gray-200 border-gray-300 text-gray-700"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {index < currentStep ? "✓" : index + 1}
                </motion.div>
                <p
                  className={`mt-2 text-sm text-center ${
                    index === currentStep
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="text-center p-6 w-full max-w-xl border rounded-lg shadow bg-white"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-700 mb-4">{description}</p>

              {/* Task */}
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-800">Task:</p>
                <p className="text-blue-700">{task}</p>
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 mb-2 border rounded text-center text-black"
                placeholder="Type your answer..."
                onKeyDown={(e) => e.key === "Enter" && nextStep()}
              />

              {/* Hint Toggle */}
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="text-sm text-blue-500 underline mb-2"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>

              {/* Animated Hint */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    className="text-sm bg-yellow-100 text-yellow-800 p-3 rounded border border-yellow-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    💡 {hint}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex mt-6 space-x-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-5 py-2 rounded text-white transition ${
                currentStep === 0
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={!isAnswerCorrect || currentStep === steps.length - 1}
              className={`px-5 py-2 rounded text-white transition ${
                isAnswerCorrect && currentStep !== steps.length - 1
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <motion.div
          className="text-center bg-white p-10 rounded-lg shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-gray-700 text-lg">
            You’ve completed all the steps successfully.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressSteps;
