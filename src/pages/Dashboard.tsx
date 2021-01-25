import React, { useEffect, useState, createContext, ReactNode } from "react";
import { Card, CardContent, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ColorsRow from "../components/ColorsRow";
import COLORS from "../utils/colors";
import ColorsHole from "../components/ColorsHole";
import DynamicDialog from "../components/DynamicDialog";
import CustomButton from "../components/CustomButton";

export const AppContext = createContext({
  colorsCode: {},
  updateCurrentRow: () => {},
  onCorrectCodeApplied: () => {},
  // allowedActions: false,
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

interface IColorsCode {
  [char: number]: string;
}

const CrackedCode = ({ colorsCode }: { colorsCode: IColorsCode }) => {
  const styles = useStyles();
  return (
    <Box className={styles.rightColorsCode}>
      <ColorsHole color={colorsCode[0]} holeIndex={0} />
      <ColorsHole color={colorsCode[1]} holeIndex={1} />
      <ColorsHole color={colorsCode[2]} holeIndex={2} />
      <ColorsHole color={colorsCode[3]} holeIndex={3} />
    </Box>
  );
};

const Dashboard = () => {
  const styles = useStyles();
  const [colorsCode, setColorsCode] = useState({});
  const [currentRow, setCurrentRow] = useState(0);
  const [correctCode, setCorrectCode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);

  const generateColorsCode = () => {
    let colorsCod: IColorsCode = { 0: "", 1: "", 2: "", 3: "" };
    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * COLORS.length);
      colorsCod[i] = COLORS[randomNum];
    }
    setColorsCode(colorsCod);
  };

  const updateCurrentRow = () => {
    let row = currentRow;
    row++;
    if (row > 9) {
      setDialogMessage("You have exhausted all attempts, the right code is");
      setDialogContent(<CrackedCode colorsCode={colorsCode} />);
      setOpenDialog(true);
    }
    setCurrentRow(row);
  };

  const onCorrectCodeApplied = () => {
    setCorrectCode(true);
    setCurrentRow(11);
    setDialogMessage("You have cracked the code !!!");
    setDialogContent(<CrackedCode colorsCode={colorsCode} />);
    setOpenDialog(true);
  };

  const handleClickReestart = () => {
    setCurrentRow(0);
    generateColorsCode();
    setCorrectCode(false);
  };

  useEffect(() => {
    generateColorsCode();
  }, []);

  return (
    <Card className={styles.card}>
      <CardContent>
        <>
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
              <ColorsRow
                allowedActions={i === currentRow}
                colorsCode={colorsCode}
              />
            </AppContext.Provider>
          ))}
        </>
      </CardContent>
      {openDialog && (
        <DynamicDialog
          open={openDialog}
          setOpen={setOpenDialog}
          message={dialogMessage}
          content={dialogContent}
        />
      )}
    </Card>
  );
};

export default Dashboard;
