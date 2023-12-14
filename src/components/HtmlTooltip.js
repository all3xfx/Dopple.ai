import { Tooltip } from "@mui/material";

export default function HtmlTooltip(props) {
  const { className } = props;
  return <Tooltip {...props} classes={{ popper: className }} />;
};
