import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ProgressCard = ({ friend }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 w-full sm:w-72 md:w-80 lg:w-96 flex flex-col"
    >
      {/* Top section: Left (Profile Picture and Name) and Right (Day, Week, Total Score) */}
      <div className="flex mb-4">
        {/* Left side: Profile Picture and Name */}
        <div className="flex flex-col items-center mr-4">
          <img
            src={friend.avatar}
            className="w-16 h-16 rounded-full border mb-2"
            alt={friend.name}
          />
          <p className="text-center font-semibold text-black dark:text-white">
            {friend.name}
          </p>
        </div>

        {/* Right side: Day, Week, Total Score */}
        <div className="flex flex-col justify-between flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300"><b>Day - </b> {friend.dayStreak}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300"><b>Week - </b> {friend.weekStreak}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300"><b>Total Score - </b> {friend.totalScore}</p>
        </div>
      </div>

      {/* Bottom section: Today status centered */}
      <div className="mt-4 text-center">
        {friend.todayStatus === "Done" ? (
          <p className="text-green-500 font-medium flex justify-center items-center">
            <CheckCircle size={16} className="mr-1" /> Done
          </p>
        ) : (
          <p className="text-red-500 font-medium">Not Done</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProgressCard;
