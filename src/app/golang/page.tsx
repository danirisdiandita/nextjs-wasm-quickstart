"use client";

import React from "react";
import { useState, useEffect } from "react";

interface NumberValue {
  a: number;
  b: number;
}

const WASMGolang = () => {
  const [numbers, setNumbers] = useState<NumberValue>({ a: 0, b: 0 });
  const [results, setResults] = useState(0);

  const handleAdd = () => {
    const res = (window as any).adder(numbers.a, numbers.b);
    console.log("res", res);
    setResults(res);
  };

  useEffect(() => {
    // dynamic imports

    async function loadWasm() {
      if (typeof window !== "undefined") {
        const wasmExec = document.createElement('script');
        wasmExec.src = '/wasm_exec.js'; // Place wasm_exec.js in your public folder
        wasmExec.async = true;
        
        await new Promise((resolve) => {
          wasmExec.onload = resolve;
          document.head.appendChild(wasmExec);
        });

        const go = new (window as any).Go();
        WebAssembly.instantiateStreaming(fetch("/adder.wasm"), go.importObject).then((result) => {
          go.run(result.instance);
        });
      }
    }

    loadWasm();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center text-black">
        WASM Addition in Next.js
      </h1>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4 space-y-4">
          <input
            type="number"
            value={numbers.a}
            onChange={(e) =>
              setNumbers({ ...numbers, a: parseInt(e.target.value) })
            }
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={numbers.b}
            onChange={(e) =>
              setNumbers({ ...numbers, b: parseInt(e.target.value) })
            }
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
};

export default WASMGolang;
