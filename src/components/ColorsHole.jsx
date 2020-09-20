import React, { useState, useEffect, useContext } from "react";
import { Box, Popper, Paper, ClickAwayListener, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import COLORS from "../utils/colors";
import { AppContext } from "../pages/Dashboard";

const useStyles = makeStyles((theme) => ({
  hole: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "2px solid #128CBA",
    marginRight: "10px",
    marginLeft: "10px",
    cursor: "pointer",
    background: "#F9DDA3",
  },
  colorsPalette: {
    width: "125px",
    height: "110px",
    border: "3px solid #FFF",
    borderRadius: "20px !important",
  },
  colorInpalette: {
    width: "30px",
    height: "30px",
    border: "1px solid #C0C0C0",
    borderRadius: "50%",
    margin: "5px",
    cursor: "pointer",
  },
}));

let colors1 = COLORS.slice(0, 3);
let colors2 = COLORS.slice(2 + 1);

const ColorsHole = ({
  holeIndex,
  allowedActions,
  onSelectedColor = () => {},
  color = null,
}) => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const anchorRef = React.useRef(null);
  const { colorsCode } = useContext(AppContext);

  const handleToggle = () => {
    if (allowedActions) setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleClickSetColor = (e, color) => {
    setSelectedColor(color);
    onSelectedColor(holeIndex, color);
    handleClose(e);
  };

  useEffect(() => {
    setSelectedColor([]);
  }, [colorsCode]);

  return (
    <>
      <Box
        ref={anchorRef}
        className={styles.hole}
        onClick={handleToggle}
        style={{ background: color ? color : selectedColor }}
      ></Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  className={styles.colorsPalette}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Box display="flex" flexDirection="row">
                    {colors1.map((color, i) => (
                      <Box
                        key={i}
                        className={styles.colorInpalette}
                        style={{ background: color }}
                        onClick={(e) => handleClickSetColor(e, color)}
                      />
                    ))}
                  </Box>
                  <Box display="flex" flexDirection="row">
                    {colors2.map((color, i) => (
                      <Box
                        key={i}
                        className={styles.colorInpalette}
                        style={{ background: color }}
                        onClick={(e) => handleClickSetColor(e, color)}
                      />
                    ))}
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ColorsHole;
