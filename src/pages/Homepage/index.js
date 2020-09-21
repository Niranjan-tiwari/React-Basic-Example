import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./home-page.scss";

const Homepage = () => {
  const dropdownOptions = [
    {
      label: "React",
      value:
        "React (also known as React.js or ReactJS) is an open-source JavaScript library[3] for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing.[7][8] Redux[9] and React Router[10] are respective examples of such libraries.",
    },
    {
      label: "Angular",
      value:
        "Angular (commonly referred to as Angular 2+ or Angular v2 and above)[3][4] is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.",
    },
    {
      label: "Vue",
      value:
        "Vue.js is an open-source model–view–viewmodel JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members coming from various companies such as Netlify and Netguru",
    },
    {
      label: "Svelte",
      value:
        "Svelte is a free and open-source JavaScript framework written by Rich Harris. Svelte applications do not include framework references. Instead, building a Svelte application generates code to manipulate the DOM, which may give better client run-time performance.",
    },
  ];
  const [text, setText] = useState("");
  return (
    <Navbar>
      <div>
        <select
          className="select"
          id="lang"
          value={text}
          onChange={(e) =>
            e.target.value === "select" ? null : setText(e.target.value)
          }
        >
          <option value="select">Dropdown</option>
          {dropdownOptions.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {text && <div className="display-text">{text}</div>}
      </div>
    </Navbar>
  );
};

export default Homepage;
