import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FailureModal = ({ isOpen, onClose, retryPayment }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/userProfile/orders");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg text-center overflow-hidden"
          >
            {/* Top section with red background */}
            <div className="bg-red-500 px-5 py-14">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-32 h-32 bg-red-300 rounded-full mx-auto flex items-center justify-center"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, type: "tween" }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              </motion.div>
            </div>

            {/* Bottom section with white background */}
            <div className="bg-white p-8">
              <h2 className="text-2xl font-bold mt-4">Payment Failed</h2>
              <p className="mt-2">Your order could not be completed.</p>
              <p className="mt-2 text-lg font-semibold text-red-600">
                Please try again or contact support.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={retryPayment}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 font-semibold rounded-lg"
                >
                  RETRY PAYMENT
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="text-red-600 px-4 py-2 font-semibold"
                >
                  CLOSE
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FailureModal;
