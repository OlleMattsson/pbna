import { useState, FunctionComponent, ReactNode } from "react";


/*
Components displays a button for displaying / hiding wrapped component.

<TogglableVisibility >
  <MyComponent />
<TogglableVisibility />

*/

export const TogglableVisibility: FunctionComponent<{ children: ReactNode }> = (props) => {
  const [display, setDisplay] = useState(false);
  const handler = () => {
    setDisplay(!display);
  };
  const buttonText = (visible: boolean) => {
    if (visible) {
      return "hide";
    } else {
      return "show";
    }
  };
  return (
    <div>
      <button onClick={handler}>{buttonText(display)}</button>
      {display && <div>{props.children}</div>}
    </div>
  );
};
