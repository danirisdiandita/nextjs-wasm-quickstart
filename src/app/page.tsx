"use client";

import { useEffect, useState } from "react";

const WebAssembly = {
  wrapper: null as any,
  binary: null as any,
  instance: null as any,
};

interface NumberValue {
  a: number;
  b: number;
}

export default function Home() {
  const [numbers, setNumbers] = useState<NumberValue>({ a: 0, b: 0 });
  const [results, setResults] = useState(0);

  useEffect(() => {
    // dynamic imports

    async function loadWasm() {
      if (typeof window !== "undefined") {
        WebAssembly.wrapper = await import("../wasm/adder_wasm.js");
        WebAssembly.binary = await fetch("/adder_wasm.wasm"); // connected to the /public folder 
        WebAssembly.instance = await WebAssembly.wrapper.default({
          locateFile: () => `/adder_wasm.wasm`,
        });
      }
    }

    loadWasm();
  }, []);

  const handleAdd = () => {
    if (WebAssembly.instance) {
      const res = WebAssembly.instance._adder(numbers.a, numbers.b);
      setResults(res);
    }
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold text-center text-black">WASM Addition in Next.js</h1>
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="mb-4 space-y-4">
        <input
          type="number"
          value={numbers.a}
          onChange={(e) => setNumbers({ ...numbers, a: parseInt(e.target.value) })}
          className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={numbers.b}
          onChange={(e) => setNumbers({ ...numbers, b: parseInt(e.target.value) })}
          className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add
      </button>
      <p className="mt-4 text-xl font-semibold text-center text-black">
        Result: <span className="text-blue-600">{results}</span>
      </p>
    </div>
  </div>
  
  );
}
