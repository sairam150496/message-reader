import React from "react";

import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";

const renderThumb = ({ style, ...rest }: any) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(35, 49, 86, 0.8)",
  };
  return <div style={{ style, ...thumbStyle }} {...rest} />;
};

export const CustomScrollbars = (props: ScrollbarProps) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);
