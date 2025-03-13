import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function DivSearch({ size = "1", insideText, marki, simpleSearchInputs }) {
  const isNew = !simpleSearchInputs.includes(insideText);
  const [divSearchStatus, setDivSearchStatus] = useState(false);
  const wrapperRef = useRef(null);
  const [choseName, setChoseName] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDivSearchStatus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function divOption() {
    setDivSearchStatus((isDivSearchStatus) => !isDivSearchStatus);
  }

  const DivInsideInformation = ({ name }) => {
    return (
      <div
        id={name}
        className="flex space-x-3 border-2 border-solid border-black p-0.5 rounded-2xl"
      >
        <span>{name}</span>
        <span className="font-extrabold">X</span>
      </div>
    );
  };

  DivInsideInformation.propTypes = {
    name: PropTypes.string,
  };

  return (
    <motion.div
      ref={wrapperRef}
      layout
      layoutId={insideText}
      // Animacja wejścia tylko dla nowych elementów
      initial={isNew ? { scale: 0, opacity: 0 } : false}
      animate={isNew ? { scale: 1, opacity: 1 } : false}
      exit={isNew ? { scale: 0 } : false}
      value={insideText}
      id={`${insideText}div`}
      className={`col-span-${size} bg-gray-300 rounded-[6px] w-full h-full ease-in-out relative `}
    >
      <div
        className="h-full flex items-center justify-start p-1.5 space-x-1 overflow-x-auto"
        onClick={divOption}
      >
        {choseName.length <= 3 ? (
          choseName.length === 0 ? (
            insideText
          ) : (
            choseName.map((prop, index) => <DivInsideInformation key={prop + index} name={prop} />)
          )
        ) : (
          <>
            {choseName.map((prop, index) =>
              index < 3 ? <DivInsideInformation key={prop + index} name={prop} /> : null
            )}
            <DivInsideInformation key={choseName[5] + 5} name={`+${choseName.length - 3}`} />
          </>
        )}
      </div>
      {divSearchStatus && (
        <div className="absolute max-h-48 bg-gray-300 w-full p-1.5 border-x-2 border-b-2 border-t-0 border-gray-400 border-solid top-10 rounded-b-xl overflow-x-auto">
          {marki.map((name) => (
            <div
              className="font-bold border-solid border-gray-400 border-[1px] p-1 rounded-sm cursor-pointer"
              key={`div${name}`}
              onClick={() => {
                setChoseName([...choseName, name]);
              }}
            >
              <input type="checkbox" className="mr-1" />
              {name}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

DivSearch.propTypes = {
  size: PropTypes.string,
  insideText: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  marki: PropTypes.arrayOf(PropTypes.string).isRequired,
  simpleSearchInputs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DivSearch;
