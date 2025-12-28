import { Games } from "@/utils/types/games";
import Image from "next/image";
import DetailsGame from "./components/detailsGame";
import Container from "@/components/container/container";
import GameCard from "@/components/gameCard/gameCard";
import { Metadata } from "next";

export interface ParamsId {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({
  params,
}: ParamsId): Promise<Metadata> {
  const id = (await params).id;

  try {
    const res: Games = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    ).then((data) => data.json());
    return {
      title: res.title,
      description: `${res.description.slice(100)}...`,
      keywords: ["gta", "games", "steam"],
      openGraph: {
        images: [res.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (err) {
    return { title: "DalyGames" };
  }
}

async function getGameDay() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 60 } }
    );
    return res.json();
  } catch (err) {
    throw new Error("Error ao consultar");
  }
}

async function getGameId(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    );
    return res.json();
  } catch (err) {
    throw new Error("Erro");
  }
}
export default async function GameInfo({ params }: ParamsId) {
  const id = (await params).id;
  const game: Games = await getGameId(id);
  const gameDay = await getGameDay();
  return (
    <>
      <main>
        <div className="w-full h-80 relative">
          <Image
            className="object-cover"
            src={game.image_url}
            alt={game.title}
            priority={true}
            fill={true}
            quality={100}
          />
        </div>
        <Container>
          <section className="mt-5 p-10 mx-auto">
            <div>
              <h1 className="text-3xl font-bold">{game.title}</h1>
              <p className="mt-2">{game.description}</p>
            </div>
            <div className="mt-10">
              <h1 className="font-bold">Plataformas:</h1>
              <div className="flex gap-2">
                {game.platforms.map((cat) => (
                  <DetailsGame detail={cat} key={cat} />
                ))}
              </div>
            </div>
            <div className="mt-10">
              <h1 className="font-bold">Categorias:</h1>
              <div className="flex gap-2">
                {game.categories.map((cat) => (
                  <DetailsGame detail={cat} key={cat} />
                ))}
              </div>
            </div>
            <p className="mt-10">
              <span className="font-bold">Data de lançamento: </span>
              {game.release}
            </p>
          </section>
          <section className="flex">
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-5">Jogos recomendados:</h1>
              <GameCard data={gameDay} />
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
