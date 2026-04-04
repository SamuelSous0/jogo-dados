import JogoDados from "./Components/JogoDados";

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
    <center>
      <h1 className="text-4xl font-extrabold mb-8">Campeonato de Dados</h1>
      <JogoDados />
    </center>
    </main>
  );
}