import Link from "next/link"
import { Speciality } from "@/types/next-auth"

interface SpecialityCardProps {
  speciality: Speciality
}

const SpecialityCard = ({ speciality }: SpecialityCardProps) => {
  return (
    <Link
      href={`/specialities/${speciality.specialityId}`}
      key={speciality.specialityId}
      className="cursor-pointer border border-[#DADCE2] dark:border-border dark:hover:bg-accent/20  hover:shadow-md
ease-linear duration-200 transition-all shadow-sm
rounded-md h-64 bg-white dark:bg-card flex flex-col p-4 justify-between"
    >
      <div className="">
        <div className="h-12 w-12 bg-[#57B6C6] dark:bg-border rounded-full"></div>
      </div>
      <div className="flex flex-col justify-end h-32">
        <h4 className="text-xl font-bold">{speciality.name}</h4>
        <p className="text-sm text-[#727A88] dark:text-muted-foreground mt-2">
          {speciality.description}
        </p>
      </div>
    </Link>
  )
}

export default SpecialityCard
