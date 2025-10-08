import { ReceivedData } from "@/components/received-data";
import { TestUart } from "@/components/test-uart";
import { ThemeProvider } from "@/hooks/use-theme";

export default function App() {
  return (
    <ThemeProvider>
      <header className="border-b h-14 sticky inset-0 flex items-center">
        <div className="flex items-center justify-between container ">
          <a className="font-bold text-lg">Nhom 4</a>
        </div>
      </header>

      <main className="container py-4 grid md:grid-cols-2 gap-4">
        <TestUart />
        <ReceivedData />
      </main>
    </ThemeProvider>
  );
}
