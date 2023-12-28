import { GlobeIcon, StarFilledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Doctor } from "@/types/next-auth"

interface DoctorCardProps {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Link
      href={`/medic/${doctor.doctorId}`}
      key={doctor.doctorId}
      className="group bg-white dark:bg-background border border-[#DADCE2] dark:border-border rounded-md overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ease-in-out"
      >
      <div className="overflow-hidden relative h-80 bg-[#e3e7ea]">
        {doctor.imageGalleries && doctor.imageGalleries.length > 0 && (
          <Image
          className="transition-all duration-300 ease-in-out group-hover:brightness-110"
            src={doctor.imageGalleries[0].imagePath}
            alt={`${doctor.firtName} ${doctor.lastname}`}
            fill={true}
            style={{ objectFit: "cover" }}
            priority={true}
            />
            )}
      </div>
      <div className="flex items-center justify-between p-4 my-2 dark:text-foreground">
        <p className="text-lg font-semibold leading-none">
          {doctor.firtName}
          &nbsp;
          {doctor.lastname}
          <span className="text-[#727A88] block mt-1 text-sm font-normal leading-normal">
            {doctor.speciality.name}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1 px-4 text-sm dark:text-foreground">
        <p className="flex items-center gap-1">
          <StarFilledIcon className="w-4 h-4" />
          {doctor.rating}
        </p>
        <span>·</span>
        <GlobeIcon className="w-4 h-4" />
        <p className="font-medium">Buenos Aires</p>
      </div>
      <div className="px-4 pt-2 pb-4 text-sm text-[#727A88]">
        {doctor.description}
      </div>
    </Link>
  )
}

export default DoctorCard
