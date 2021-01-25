import React, {MouseEventHandler} from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customButton: {
    color: "#FFF !important",
    backgroundColor: "#F89B07",
    borderColor: "#FFF !important",
    "&:disabled": {
      color: "#F9DDA3 !important",
      borderColor: "#fff !important",
      backgroundColor: "#BDBDBD",
    },
  },
}));

interface Props {
  onClick: MouseEventHandler,
  label: string,
  disabled:boolean
}

const CustomButton:React.FC<Props> = ({ onClick = () => {}, label, ...rest }) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.customButton}
      size="small"
      variant="outlined"
      onClick={onClick}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
