import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%&*-{}[]~";

    for (let i = 1; i <= length; i++) {
      let newChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(newChar);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 8);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <div className=" flex justify-center items-center w-full h-screen ">
        <div className=" bg-slate-700 text-white max-w-max p-5 flex flex-col gap-5 rounded-md overflow-hidden">
          <div className="flex w-full">
            <input
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordRef}
              className=" w-full border-none rounded-l-lg outline-none py-2 px-4 text-black"
            />
            <button
              className=" bg-blue-600 text-white py-2 px-4 rounded-r-lg text-center shrink-0"
              onClick={copyPasswordToClipBoard}
            >
              Copy
            </button>
          </div>
          <div className=" flex gap-x-2 text-sm">
            <div className=" flex items-center gap-x-1  w-[12.4rem]">
              <input
                type="range"
                value={length}
                min={8}
                max={50}
                className=" cursor-pointer "
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="length">Length: {length}</label>
            </div>
            <div className=" flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
              <input
                type="checkbox"
                defaultChecked={char}
                id="charInput"
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
