import React, { useState } from "react";

function Tab({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 border border-frost/70 shadow-md shadow-frost/40 transition-all duration-300 ${
              activeTab === index
                ? "bg-gradient-to-r from-frost to-sapphire/50 text-snow text-md shadow-lg shadow-frost/70"
                : "bg-ash"
            } ${
              index === 0 ? "rounded-l-md" : "" // Apply rounded left edge to the first tab
            } ${
              index === tabs.length - 1 ? "rounded-r-md" : "" // Apply rounded right edge to the last tab
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {tabs[activeTab].explanation && (
        <div className="bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-frost/50 rounded-md text-xs p-2 my-2 shadow-lg shadow-frost/40">
          {tabs[activeTab].explanation}
        </div>
      )}
      <div className="mt-1">{tabs[activeTab].content}</div>
    </div>
  );
}

export default Tab;
