import React, { useState } from "react";
import data from "./data.json";
import { Profession } from "./types";

const App = () => {
  const [currentProfession, setCurrentProfession] = useState<string | string[] | null>();
  const [currentSkill, setCurrentSkill] = useState<string | string[] | null>()

  const professions: Profession[] = data;
  const skills: string[] = Array.from(new Set(professions.reduce((skills, profession) => [...skills, ...profession.mainSkills, ...profession.otherSkills],[])))

  const handlerSelectProfession = (profession: Profession) => {
    setCurrentSkill(null);
    setCurrentProfession(profession.name);
    setCurrentSkill([...profession.mainSkills, ...profession.otherSkills]);
  };

  const handlerSelectSkill = (skill: string) => {
    setCurrentProfession(null);
    setCurrentSkill(skill);
  };

  const isCurrentItem = (item: string, type: "skill" | "profession") => {
    let current = type === "skill" ? currentSkill : currentProfession;
    if (Array.isArray(current)) return current.includes(item)
    return current === item;
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen text-[10px]">
      <div className="relative flex justify-center items-center rounded-full border-2 border-solid border-gray w-[602px] h-[602px]">
        <div>
          {skills.map((item, index) => (
            <div
              key={index}
              className={`absolute top-[285px] right-[285px] flex justify-center items-center font-bold rounded-full w-7 h-7 ${isCurrentItem(item, "skill") ? "bg-[#FF7A00]" : "bg-[#FFD4AD]"} text-[#3A3A3A] cursor-pointer`}
              style={{
                transform: `rotate(${360 / skills.length * (index + 1)}deg) translate(300px) rotate(-${360 / skills.length * (index + 1)}deg)`
              }}
              onClick={() => handlerSelectSkill(item)}
            >
              <span style={{
              transform: `rotate(${360 / skills.length * (index + 1)}deg) translate(50px) rotate(-${360 / skills.length * (index + 1)}deg)`
            }}>
              {item}
            </span>
            </div>
          ))}
        </div>
        <div className="relative border-2 border-solid border-gray rounded-full w-[203px] h-[203px]">
          {professions.map((item, index) => (
            <div
              key={index}
              className={`absolute top-[87px] right-[85px] flex justify-center items-center font-bold rounded-full w-7 h-7 ${
                isCurrentItem(item.name, "profession") ? "bg-[#00A372]" : "bg-gray"
              } text-[#3A3A3A] cursor-pointer`}
              style={{
                transform: `rotate(${360 / professions.length * (index + 1)}deg) translate(100px) rotate(-${360 / professions.length * (index + 1)}deg)`
              }}
              onClick={() => handlerSelectProfession(item)}
            >
            <span style={{
              transform: `rotate(${360 / professions.length * (index + 1)}deg) translate(70px) rotate(-${360 / professions.length * (index + 1)}deg)`
            }}>
              {item.name}
            </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;