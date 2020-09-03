import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    width: "70px",
    height: "60px",
  },
  smallHole: {
    width: "14px",
    minHeight: "14px",
    borderRadius: "50%",
    border: "1.5px solid #128CBA",
    margin: "4px",
    background: "#F9DDA3",
  },
  checkButton: {
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

const SmallHole = ({ color }) => {
  const styles = useStyles();
  return <Box className={styles.smallHole} style={{ background: color }} />;
};

const MatchScore = ({
  colorsCode,
  userColorsCode,
  allowedActions,
  updateCurrentRow = () => {},
  onCorrectCodeApplied = () => {},
}) => {
  const styles = useStyles();
  const [matchColors, setMatchColors] = React.useState([]);

  const allRowColorsSelected = () => {
    return Object.keys(userColorsCode).length === 4;
  };

  const validateExactMatchCases = () => {
    let auxColorsCode = { ...colorsCode };
    let auxUserColorsCode = { ...userColorsCode };
    let countBlack = 0;
    for (let i = 0; i < 4; i++) {
      if (auxColorsCode[i] === userColorsCode[i]) {
        auxColorsCode[i] = "match";
        auxUserColorsCode[i] = "match";
        countBlack++;
      }
    }
    return {
      auxColorsCode,
      auxUserColorsCode,
      countBlack,
    };
  };

  const validatePartialMatchCases = (auxColorsCode, auxUserColorsCode) => {
    let countWhite = 0;
    let secretColorsCode = Object.values(auxColorsCode);
    for (let i = 0; i < 4; i++) {
      if (auxUserColorsCode[i] !== "match") {
        let index = secretColorsCode.indexOf(auxUserColorsCode[i]);
        if (index > -1) {
          secretColorsCode[index] = "partialMatch";
          countWhite++;
        }
      }
    }
    return countWhite;
  };

  const setColorsFeedback = (blacks = [], whites = []) => {
    let colors = [];

    blacks.forEach(() => {
      colors.push("black");
    });
    whites.forEach(() => {
      colors.push("white");
    });

    setMatchColors(colors);
    updateCurrentRow();
    if (blacks.length === 4) onCorrectCodeApplied();
  };

  const handleClickValidateUserCode = () => {
    const {
      auxColorsCode,
      auxUserColorsCode,
      countBlack,
    } = validateExactMatchCases();
    const countWhite = validatePartialMatchCases(
      auxColorsCode,
      auxUserColorsCode
    );

    //next line should be removed in a not testing project
    console.log(colorsCode, userColorsCode);
    setColorsFeedback([...Array(countBlack)], [...Array(countWhite)]);
  };

  useEffect(() => {
    setMatchColors([]);
  }, [colorsCode]);

  return (
    <>
      {allowedActions ? (
        <Button
          className={styles.checkButton}
          size="small"
          variant="outlined"
          disabled={!allRowColorsSelected()}
          onClick={handleClickValidateUserCode}
        >
          Check
        </Button>
      ) : (
        <Box className={styles.mainBox}>
          <Box display="flex" flexDirection="row">
            <SmallHole color={matchColors[0]} />
            <SmallHole color={matchColors[1]} />
          </Box>
          <Box display="flex" flexDirection="row">
            <SmallHole color={matchColors[2]} />
            <SmallHole color={matchColors[3]} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MatchScore;
