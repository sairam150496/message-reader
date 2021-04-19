export const doesOrientedToPortrait = () => {
  return window.screen.orientation.type.includes("portrait") || false;
};
