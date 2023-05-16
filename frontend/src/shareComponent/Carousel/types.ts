// import {  } from ;

export type CSSCarouselProps<TLength = string | 0> = {
  className?: string;
  startSpace?: string;
  endSpace?: string;
  gap?: string;
  padding?: string;
  disableSnap?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
