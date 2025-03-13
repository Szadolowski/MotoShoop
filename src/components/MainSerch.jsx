import PropTypes from "prop-types";
import { useState } from "react";
// import { motion } from "motion/react";
import { motion } from "framer-motion";
import DivSearch from "./DivSearch";

const marki = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Hyundai",
  "Kia",
  "Mazda",
  "Nissan",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Volvo",
  "Jaguar",
  "Land Rover",
  "Lexus",
  "Subaru",
  "Jeep",
  "Alfa Romeo",
  "Maserati",
  "Bentley",
];

const simpleSearchInputs = [
  "Marka Samochodu",
  "Model pojazdu",
  "cena do",
  "Rok produkcji od",
  "Typ nadwozia",
  "rodzaj paliwa",
];

function InputSerch({ size = "1", insideText }) {
  // Sprawdzamy, czy input jest nowy (nie ma go w SimpleSearch)
  const isNew = !simpleSearchInputs.includes(insideText);

  return (
    <motion.input
      layout
      layoutId={insideText}
      // Animacja wejścia tylko dla nowych elementów
      initial={isNew ? { scale: 0, opacity: 0 } : false}
      animate={isNew ? { scale: 1, opacity: 1 } : false}
      exit={isNew ? { scale: 0 } : false}
      type="text"
      value={insideText}
      id={`${insideText}text`}
      className={`col-span-${size} bg-gray-300 rounded-[6px] p-1.5 w-full h-full ease-in-out`}
    />
  );
}

InputSerch.propTypes = {
  size: PropTypes.string,
  insideText: PropTypes.string.isRequired,
  inputType: PropTypes.string,
};

let SimpleSearch = ({ setChange }) => {
  return (
    <motion.div
      layout
      layoutId="search"
      className=" flex justify-center items-center pt-5"
      id="search"
      // transition={{ duration: 0.4, ease: "easeInOut" }}
      // initial={{ scale: 1.1 }}
      // animate={{ scale: 1 }}
    >
      <div className="bg-gray-50 rounded-2xl shadow-2xl border-black p-12 grid grid-cols-4 grid-rows-3 gap-x-4 gap-y-8 place-items-center">
        <DivSearch
          insideText={"Marka Samochodu"}
          size={2}
          marki={marki}
          simpleSearchInputs={simpleSearchInputs}
        />
        <InputSerch insideText={"Model pojazdu"} size={2} />
        <InputSerch insideText={"cena do"} />
        <InputSerch insideText={"Rok produkcji od"} />
        <InputSerch insideText={"Typ nadwozia"} />
        <InputSerch insideText={"rodzaj paliwa"} />
        <span
          className="col-span-2 text-blue-600 font-bold cursor-pointer"
          onClick={() => {
            setChange(true);
          }}
        >
          Wyszukiwanie {<br></br>} Zaawansowane
        </span>
        <button className="col-span-2 w-full h-full bg-red-700 text-amber-50 font-bold rounded-xl">
          Szukaj
        </button>
      </div>
    </motion.div>
  );
};

SimpleSearch.propTypes = {
  setChange: PropTypes.func.isRequired,
};

let AdvanceSearch = ({ setChange }) => {
  return (
    <motion.div
      layout
      layoutId="search"
      className=" flex justify-center items-center pt-5"
      id="search"
    >
      <div className="bg-gray-50 rounded-2xl shadow-2xl border-black p-12 grid grid-cols-6 grid-rows-4 gap-x-4 gap-y-8 place-items-center">
        <InputSerch insideText={"Marka Samochodu"} size={2} />
        <InputSerch insideText={"Model pojazdu"} size={2} />
        <InputSerch insideText={"Generacja"} size={2} />
        <InputSerch insideText={"cena od"} />
        <InputSerch insideText={"cena do"} />
        <InputSerch insideText={"Rok produkcji od"} />
        <InputSerch insideText={"Rok produkcji do"} />
        <InputSerch insideText={"Przebieg od"} />
        <InputSerch insideText={"Przebieg do"} />
        <InputSerch insideText={"Typ nadwozia"} size={2} />
        <InputSerch insideText={"rodzaj paliwa"} size={2} />
        <span
          className="col-span-2 text-blue-600 font-bold cursor-pointer"
          onClick={() => {
            setChange(false);
          }}
        >
          Wyszukiwanie {<br></br>} Zaawansowane
        </span>
        <button className="col-span-2 w-full h-full bg-red-700 text-amber-50 font-bold rounded-xl">
          Szukaj
        </button>
      </div>
    </motion.div>
  );
};

AdvanceSearch.propTypes = {
  setChange: PropTypes.func.isRequired,
};

function MainSerch() {
  const [advanceMode, setAdvanceMode] = useState(false);

  return (
    <>
      {advanceMode ? (
        <AdvanceSearch setChange={setAdvanceMode} />
      ) : (
        <SimpleSearch setChange={setAdvanceMode} />
      )}
      {/* <SimpleSearch />
      <AdvanceSearching /> */}
    </>
  );
}

export default MainSerch;
