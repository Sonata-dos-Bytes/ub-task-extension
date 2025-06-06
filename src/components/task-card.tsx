import { Clock, FileText } from "lucide-react"

import { useCountdown } from "../hooks/use-countdown"
import { getRandomColor } from "../scripts/color"
import { Task } from "../types/ITask"

const Card = ({ data }: { data: Task }) => {
  const bgColor = getRandomColor()
  const { isOverdue, dinamicCountdownText } = useCountdown(data.dateEnd)

  function handleClick() {}

  return (
    <div
      onClick={handleClick}
      className="w-[90%] min-w-[360px] min-h-[160px] mx-auto my-6 bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md cursor-pointer transition">
      <div className="flex items-start">
        <div
          className="p-2 rounded-md flex items-center justify-center"
          style={{ backgroundColor: bgColor }}>
          <FileText size={24} color="#ffffff" />
        </div>
        <div className="ml-3 flex-1">
          <h2 className="text-[#0D1B34] text-base font-bold">{data.title}</h2>
          <p className="text-xs uppercase text-slate-400 mt-1 font-semibold">
            {data.matter}
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 my-3" />

      <div className="flex items-center">
        <Clock size={18} color={isOverdue ? "#ef4444" : "#fbbf24"} />
        <span
          className={`ml-2 text-sm font-medium ${
            isOverdue ? "text-red-500" : "text-yellow-400"
          }`}>
          {dinamicCountdownText()}
        </span>
      </div>
    </div>
  )
}

export default Card
