interface DetailProps {
  detail: string;
}
export default function DetailsGame({ detail }: DetailProps) {
  return (
    <>
      <div className="flex-grow sm:flex-grow-0 hover:font-bold transition-all duration-300">
        {detail}
      </div>
    </>
  );
}
