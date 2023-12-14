import { Tooltip } from "@mui/material";

export const HtmlTooltip = props => {
  const { className } = props;
  return <Tooltip {...props} classes={{ popper: className }} />;
};
