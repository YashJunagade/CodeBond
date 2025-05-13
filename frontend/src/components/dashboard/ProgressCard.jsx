import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ProgressCard = ({ friend }) => {
 return (
  <motion.div
   whileHover={{ y: -5, boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
   className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 w-64"
  >
   <img src={friend.avatar} className="w-16 h-16 rounded-full mx-auto border mb-2" />
   <p className="text-center font-semibold text-black dark:text-white">{friend.name}</p>
   <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1">
    <p>Day - {friend.dayStreak}</p>
    <p>Week - {friend.weekStreak}</p>
    <p>Total Score - {friend.totalScore}</p>
   </div>
   <div className="mt-2 text-center">
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
