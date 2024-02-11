import React, { useEffect, useState } from "react";
import data from "./data.json";
import { Profession } from "./types";
import gsap from "gsap";

const App = () => {
  const [currentProfession, setCurrentProfession] = useState<string | string[] | null>();
  const [currentSkill, setCurrentSkill] = useState<string | string[] | null>()

  const [professions, setProfessions] = useState<Profession[]>(data);
  const [skills, setSkills] = useState<string[]>(Array.from(
    new Set(professions.reduce(
      (skills, profession) => [...skills, ...profession.mainSkills, ...profession.otherSkills],[])
    )
  ));

  const handlerSelectProfession = (profession: Profession) => {
    const index = professions.findIndex(prof => prof.name === profession.name);
    const skillsProfession = [...profession.mainSkills, ...profession.otherSkills];
    const otherSkills = skills.filter(skill => !skillsProfession.includes(skill));
    const firstPartEndIndex = Math.floor(360 / professions.length * index / (360 / skills.length)) - Math.ceil(skillsProfession.length / 2);
    if (firstPartEndIndex < 0) {
      const firstPartSkillProfession = skillsProfession.slice(Math.abs(firstPartEndIndex));
      const secondPartSkillProfession = skillsProfession.slice(0, Math.abs(firstPartEndIndex));
      setSkills([
        ...firstPartSkillProfession,
        ...otherSkills,
        ...secondPartSkillProfession
      ]);
    } else {
      const firstPart = otherSkills.slice(0, firstPartEndIndex);
      const secondPart = otherSkills.slice(firstPart.length);
      setSkills([
        ...firstPart,
        ...skillsProfession,
        ...secondPart
      ]);
    }
    setCurrentSkill(null);
    setCurrentProfession(profession.name);
    setCurrentSkill(skillsProfession);
  };

  const handlerSelectSkill = (skill: string) => {
    setCurrentSkill(skill);
    const profList = professions.filter(
      prof => prof.otherSkills.includes(skill) || prof.mainSkills.includes(skill)
    );
    const index = skills.findIndex(currentSkill => currentSkill === skill);
    const firstPartEndIndex = Math.floor(professions.length / skills.length * index) - Math.floor(profList.length / 2);
    const otherProfessions = professions.filter(
      prof => !prof.otherSkills.includes(skill) && !prof.mainSkills.includes(skill)
    );
    if (firstPartEndIndex < 0) {
      const firstPartProfessionsSkill = profList.slice(Math.abs(firstPartEndIndex));
      const secondPartProfessionsSkill = profList.slice(0, Math.abs(firstPartEndIndex));
      setProfessions([
        ...firstPartProfessionsSkill,
        ...otherProfessions,
        ...secondPartProfessionsSkill
      ]);
    } else {
      const firstPart = otherProfessions.slice(0, firstPartEndIndex);
      const secondPart = otherProfessions.slice(firstPart.length);
      setProfessions([
        ...firstPart,
        ...profList,
        ...secondPart
      ]);
    }
    // console.log(index);
    // console.log(360 / skills.length * index);
    // console.log(Math.floor(professions.length / skills.length * index));
    // console.log("profList.length: ", profList.length);
    // console.log(Math.ceil(profList.length / 2));
    // console.log(Math.floor(professions.length / skills.length * index) - Math.ceil(profList.length / 2));
    setCurrentProfession(profList.map(prof => prof.name));
  };

  const isCurrentItem = (item: string, type: "skill" | "profession") => {
    let current = type === "skill" ? currentSkill : currentProfession;
    if (Array.isArray(current)) return current.includes(item)
    return current === item;
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen text-[10px]">
      <div className="relative flex justify-center items-center rounded-full border-2 border-solid border-gray w-[602px] h-[602px]">
        {/*<div className="absolute top-[63px] left-[131px]">*/}
        {/*  <svg xmlns="http://www.w3.org/2000/svg">*/}
        {/*    <path d="M0 0 Q 52.5 10, 95 80 T 170 130" fill="none" stroke="orange" strokeWidth="2"/>*/}
        {/*  </svg>*/}
        {/*</div>*/}
        {/*<div className="absolute top-[25px] left-[185px] h-[200px]">*/}
        {/*  <svg xmlns="http://www.w3.org/2000/svg" className="h-full">*/}
        {/*    <path d="M0 0 Q 52.5 10, 65 100 T 180 130" fill="none" stroke="orange" strokeWidth="2"/>*/}
        {/*  </svg>*/}
        {/*</div>*/}
        <div>
          {skills.map((item, index) => (
            <div
              key={index}
              className={`absolute top-[285px] right-[285px] flex justify-center items-center font-bold rounded-full w-7 h-7 ${isCurrentItem(item, "skill") ? "bg-orange" : "bg-[#FFD4AD]"} text-[#3A3A3A] cursor-pointer`}
              style={{
                transform: `rotate(${360 / skills.length * index}deg) translate(0, -300px) rotate(-${360 / skills.length * index}deg)`
              }}
              onClick={() => handlerSelectSkill(item)}
            >
              <span style={{
              transform: `rotate(${360 / skills.length * index}deg) translate(0, -50px) rotate(-${360 / skills.length * index}deg)`
            }}>
              {item + "   " + index}
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
                transform: `rotate(${360 / professions.length * index}deg) translate(0, -100px) rotate(-${360 / professions.length * index}deg)`
              }}
              onClick={() => handlerSelectProfession(item)}
            >
            <span style={{
              transform: `rotate(${360 / professions.length * index}deg) translate(0, -70px) rotate(-${360 / professions.length * index}deg)`
            }}>
              {item.name + "   " + index}
            </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;