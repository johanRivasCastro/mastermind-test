import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import MatchScore from "./MatchScore";
import ColorsHole from "./ColorsHole";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    width: "350px",
    height: "80px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const ColorsRow = ({ colorsCode, allowedActions }) => {
  const styles = useStyles();

  const [userColorsCode, setUserColorsCode] = useState({});

  const onSelectedColor = (holeIndex, color) => {
    setUserColorsCode({
      ...userColorsCode,
      [holeIndex]: color,
    });
  };

  useEffect(() => {
    setUserColorsCode({});
  }, [colorsCode]);

  return (
    <Box className={styles.mainBox}>
      <MatchScore
        userColorsCode={userColorsCode}
        allowedActions={allowedActions}
      />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        {[...Array(4)].map((e, i) => (
          <ColorsHole
            key={i}
            holeIndex={i}
            onSelectedColor={onSelectedColor}
            allowedActions={allowedActions}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ColorsRow;
