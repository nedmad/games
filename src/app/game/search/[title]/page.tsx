import Container from "@/components/container/container";
import GameCard from "@/components/gameCard/gameCard";
import Input from "@/components/input/input";
import { Games } from "@/utils/types/games";

interface PageParams {
  params: Promise<{ title: string }>;
}
async function searchGame(title: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`,
    );
    return res.json();
  } catch (err) {
    throw new Error("Erro ao carregar api");
  }
}
export default async function SearchGame({ params }: PageParams) {
  const { title } = await params;
  const game = (await searchGame(title)) as Games[];
  if (!game) {
    return (
      <Container>
        <main>
          <Input />
          <div>
            <h1 className="font-bold">Veja oque encontramos na nossa base:</h1>
            <p>Jogo não encontrado!</p>
          </div>
        </main>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <main>
          <Input />
          <h1 className="font-bold">Veja oque encontramos na nossa base:</h1>

          <section className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  justify-center items-center gap-6">
            {game.map((ga) => (
              <GameCard key={ga.id} data={ga} />
            ))}
          </section>
        </main>
      </Container>
    </>
  );
}
