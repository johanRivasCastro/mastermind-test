import React, { useEffect, useState, useCallback, createContext } from "react";
import { Card, CardContent, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ColorsRow from "../components/ColorsRow";
import COLORS from "../utils/colors";
import ColorsHole from "../components/ColorsHole";
import Confirm from "../components/DynamicDialog";
import CustomButton from "../components/CustomButton";

export const AppContext = createContext({
  colorsCode: null,
  updateCurrentRow: () => {},
  onCorrectCodeApplied: () => {},
  allowedActions: false,
});

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    maxWidth: "360px",
    minHeight: "600px",
    margin: "50px auto",
    background: "#71CEED",
    border: "1px solid #128CBA",
  },
  title: {
    fontFamily: "Open Sans Condensed",
    textAlign: "center",
    fontSize: "35px",
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  rightColorsCode: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1.5px solid #128CBA",
    padding: "5px",
    maxWidth: "248px",
    borderRadius: "6px",
  },
  rightColorsCodeBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "61px",
  },
}));

const CrackedCode = ({ colorsCode }) => {
  const styles = useStyles();
  return (
    <Box className={styles.rightColorsCode}>
      <ColorsHole color={colorsCode[0]} />
      <ColorsHole color={colorsCode[1]} />
      <ColorsHole color={colorsCode[2]} />
      <ColorsHole color={colorsCode[3]} />
    </Box>
  );
};

const Dashboard = () => {
  const styles = useStyles();
  const [colorsCode, setColorsCode] = useState({});
  const [currentRow, setCurrentRow] = useState(0);
  const [correctCode, setCorrectCode] = useState(false);

  const generateColorsCode = useCallback(() => {
    let colorsCod = {};
    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * COLORS.length);
      colorsCod[i] = COLORS[randomNum];
    }
    setColorsCode(colorsCod);
  }, []);

  const updateCurrentRow = async () => {
    let row = currentRow;
    row++;
    if (row > 9) {
      await Confirm.show({
        message: "You have exhausted all attempts, the right code is",
        content: <CrackedCode colorsCode={colorsCode} />,
      });
    }
    setCurrentRow(row);
  };

  const onCorrectCodeApplied = async () => {
    setCorrectCode(true);
    setCurrentRow(11);
    await Confirm.show({
      message: "You have cracked the code !!!",
      content: <CrackedCode colorsCode={colorsCode} />,
    });
  };

  const handleClickReestart = () => {
    setCurrentRow(0);
    generateColorsCode();
    setCorrectCode(false);
  };

  useEffect(() => {
    generateColorsCode();
  }, [generateColorsCode]);

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box mb={3} className={styles.title}>
          Mastermind
        </Box>
        <Box display="flex" justifyContent="flex-end" mr={2} mb={2}>
          <CustomButton
            disabled={currentRow < 1}
            onClick={handleClickReestart}
            label="Reestart"
          />
        </Box>
        {correctCode ||
          (currentRow > 9 && (
            <Box className={styles.rightColorsCodeBox}>
              <CrackedCode colorsCode={colorsCode} />
            </Box>
          ))}

        {[...Array(10)].map((e, i) => (
          <AppContext.Provider
            value={{
              colorsCode: colorsCode,
              updateCurrentRow: updateCurrentRow,
              onCorrectCodeApplied: onCorrectCodeApplied,
            }}
            key={i}
          >
            <ColorsRow allowedActions={i === currentRow} />
          </AppContext.Provider>
        ))}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
