import { useState } from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const [userResponse, setUserResponse] = useState<string | null>(null);
  const [noClicked, setNoClicked] = useState(false);

  const additionalTexts = ["Are you sure?", "I don't think so...", "Still loading..."];

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {/* Animated h1 */}
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Are you mad?
      </motion.h1>

      {userResponse === "yes" ? (
        <motion.p
          className="text-xl text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          I already know.
        </motion.p>
      ) : (
        <>
          {/* Buttons */}
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserResponse("yes")}
              className="px-4 py-2 bg-red-500 text-white rounded shadow"
            >
              Yes
            </motion.button>

            <motion.button
              whileHover={{ scale: noClicked ? 1 : 1.1 }}
              whileTap={{ scale: noClicked ? 1 : 0.95 }}
              onClick={() => {
                setUserResponse("no");
                setNoClicked(true);
              }}
              disabled={noClicked}
              className={`px-4 py-2 rounded shadow text-white ${
                noClicked ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
              }`}
            >
              No
            </motion.button>
          </div>

          {/* Loader and Additional Texts */}
          {userResponse === "no" && (
            <>
              {/* Loader */}
              <motion.div
                className="relative h-16 w-16 border-4 border-t-4 border-blue-500 border-solid rounded-full mt-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute inset-0 border-4 border-blue-300 border-solid rounded-full"
                  style={{ borderTopColor: "transparent" }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Animated additional texts */}
              <div className="mt-4 space-y-2 text-lg text-gray-600">
                {additionalTexts.map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 1, duration: 0.6 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Loader;
