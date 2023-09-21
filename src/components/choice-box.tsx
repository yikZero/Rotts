interface ChoiceboxProps {
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Choicebox({ title, description, isSelected, onSelect }: ChoiceboxProps) {
  return(
    <div onClick={onSelect} className={`w-full p-3 flex flex-row gap-6 justify-between items-center rounded-[6px] border ${isSelected ? 'bg-blue-50 border-blue-600' : 'bg-white hover:bg-[#FAFAFA] border-[#EBEBEB] hover:border-[#C9C9C9]'} cursor-pointer`}>
      <div className="flex flex-col gap-y-[2px]">
        <div className="font-medium text-black">{title}</div>
        <div className="font-normal text-gray-500">{description}</div>
      </div>
      <div className={`bg-white hover:bg-[#FAFAFA] w-4 h-4 border ${isSelected ? 'border-blue-600' :'border-[#C9C9C9] hover:border-blue-600'} rounded-full flex justify-center items-center`}>
        <div className={`rounded-full ${isSelected ? 'w-2 h-2' :'w-0 h-0'} bg-blue-600`}></div>
      </div>
    </div>
  )
}