import { Games } from "@/utils/types/games";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowCircle } from "react-icons/bi";

interface GameCardProp {
  data: Games;
}
export default function GameCard({ data }: GameCardProp) {
  return (
    <>
      <section
        className="hover:scale-105 transition-all duration-300"
        key={data.id}
      >
        <Link href={`/game/${data.id}`}>
          <div className="w-full relative h-56">
            <Image
              src={data.image_url}
              alt={data.title}
              fill={true}
              quality={100}
              className="object-cover rounded-xl"
              sizes="(max-width:760px) 100vw, (max-width:44vw)"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <p className="font-bold truncate text-ellipsis">{data.title}</p>
            <BiRightArrowCircle size={20} />
          </div>
        </Link>
      </section>
    </>
  );
}
