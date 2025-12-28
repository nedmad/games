import Container from "@/components/container/container";
import GameCard from "@/components/gameCard/gameCard";
import Input from "@/components/input/input";
import { Games } from "@/utils/types/games";
import Image from "next/image";
import { BsArrowRightSquare } from "react-icons/bs";
async function getGameDay() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 300 } }
    );
    return res.json();
  } catch (err) {
    throw new Error("Error ao consultar");
  }
}
async function getGames() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {
      next: { revalidate: 300 },
    });
    return res.json();
  } catch (err) {
    throw new Error("Error ao consultar");
  }
}
export default async function Home() {
  const gameDay: Games = await getGameDay();
  const games: Games[] = await getGames();

  return (
    <>
      <Container>
        <main>
          <section className=" my-4 w-full  rounded-lg ">
            <div className="bg-black w-full max-h-80 h-80 relative  rounded-lg ">
              <div className="flex absolute z-20 text-amber-50 p-3 bottom-0 gap-2">
                <p>{gameDay.title}</p>
                <div>
                  <BsArrowRightSquare size={20} />
                </div>
              </div>
              <Image
                alt={gameDay.description}
                src={gameDay.image_url}
                priority={true}
                quality={100}
                fill={true}
                className="opacity-50 object-cover max-h-80 h-80 hover:opacity-100 transition-all duration-300 border rounded-lg "
              />
            </div>
            <Input />
            <section className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  justify-center items-center gap-6">
              {games &&
                games.map((game) => <GameCard key={game.id} data={game} />)}
            </section>
          </section>
        </main>
      </Container>
    </>
  );
}
