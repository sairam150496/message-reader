export const doesSupportTouch = () => {
  return "ontouchmove" in document.documentElement;
};
