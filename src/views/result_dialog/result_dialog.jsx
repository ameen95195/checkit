import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import PropTypes from "prop-types";
import { FOOD, HEALTH, MEDICINE } from "../../containers/Home/Home";
import { indigo, purple, red } from "@mui/material/colors";

const ResultDialog = (props) => {
  const { onClose, result, open } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(false);
  };

  const colorizeResRow = (type) => {
    if (type === FOOD) return red[100];
    if (type === HEALTH) return purple[100];
    return indigo[100];
  };


  const colorizeRes = (type) => {
    if (type === FOOD) return red[700];
    if (type === HEALTH) return purple[700];
    return indigo[700];
  };

  const namedRes = (type) => {
    if (type === FOOD) return "Food";
    if (type === HEALTH) return "Health";
    return "Medicine";
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{result.productName}</DialogTitle>
      <DialogContent>
        <Typography variant="h4"></Typography>
        <Table aria-label="result">
          {/* table header  */}
          <TableHead>
            <TableRow>
              <TableCell>Material Name</TableCell>
              <TableCell>LL</TableCell>
              <TableCell>UL</TableCell>
              <TableCell>Entered Value</TableCell>
              <TableCell>Categorize</TableCell>
            </TableRow>
          </TableHead>

          {/* Table body */}
          <TableBody>
            {result.row
              ? result.row.map((row) => (
                  <TableRow
                    sx={{ backgroundColor: colorizeResRow(row.checkedMat) }}
                  >
                    <TableCell>{row.material.material.name}</TableCell>
                    <TableCell>{row.material.material.lower}</TableCell>
                    <TableCell>{row.material.material.upper}</TableCell>
                    <TableCell>{row.material.value}</TableCell>
                    <TableCell>{namedRes(row.checkedMat)}</TableCell>
                  </TableRow>
                ))
              : "  "}
          </TableBody>
        </Table>
        <br />
        <Typography variant="h5" display={'inline-flex'}>
          The product category will be:
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={colorizeRes(result.res)}
          >
            {namedRes(result.res)}
          </Typography>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

ResultDialog.propsType = {
  result: PropTypes.object.isRequired,
};

export default ResultDialog;
