import React, { FunctionComponent } from "react";
import { CSSCarouselProps } from "./types";

export const CarouselCustom: FunctionComponent<CSSCarouselProps> = ({
  className: propClassNames = "",
  children = [],
  startSpace = "1em",
  endSpace = "1em",
  gap = "1em",
  padding = "1em",
  disableSnap = false,
  ...props
}) => {
  const childClass = `
    scroll-snap-align: center;
    :first-child {
      scroll-snap-align: start;
    }
  `;
  const childrenArray = React.Children.map(children, (child) => {
    if (!disableSnap) return <div className={childClass}>{child}</div>;
    return child;
  });

  const containerClass = `
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-x: scroll;
    display: grid;
    grid-gap: ${gap};
    padding: ${padding};
    // -webkit-overflow-scrolling: touch;

    ::before,
    ::after {
      content: "";
    }
  `;

  const spaceSnap = `
    ::before,
    ::after {
      scroll-snap-align: end;
    }
  `;

  const gridTemplateCols = `
    grid-template-columns:
      ${startSpace}
      repeat(${childrenArray?.length}, 1fr)
      ${endSpace};
  `;

  return (
    <div
      {...props}
      className={`${containerClass} ${
        disableSnap ? "" : spaceSnap
      } ${gridTemplateCols} ${propClassNames} flex overflow-auto scrollbar-hide`}
    >
      {childrenArray}
    </div>
  );
};
