"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useReducer, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Input() {
  let router = useRouter();
  const [input, setInput] = useState("");
  function searchGame(event: FormEvent) {
    event.preventDefault();
    if (!input) {
      return;
    }
    router.push(`/game/search/${input}`);
  }
  return (
    <>
      <form
        onSubmit={searchGame}
        className="w-full flex bg-slate-300 my-7 px-3 rounded-lg"
      >
        <input
          type="text"
          className="w-full outline-0 bg-slate-300 p-2"
          placeholder="Procure seu jogo.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="cursor-pointer">
          <FiSearch size={20} color="#FFA500" />
        </button>
      </form>
    </>
  );
}
