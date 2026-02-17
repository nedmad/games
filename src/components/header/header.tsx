import Link from "next/link";
import Container from "../container/container";
import Image from "next/image";
import { GiGameConsole, GiGamepad } from "react-icons/gi";

export default function Header() {
  return (
    <>
      <header className="py-3 px-2 bg-slate-100 flex">
        <Container>
          <div className="flex  sm:justify-between justify-center items-center">
            <nav className="flex justify-center gap-3">
              <Link href={"/"}>
                <Image
                  src="/logo.svg"
                  alt="logo"
                  quality={100}
                  width={100}
                  height={100}
                  priority={true}
                />
              </Link>
            </nav>
            <div className="hidden sm:flex">
              <GiGamepad size={30} />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
