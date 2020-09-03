import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import {
  DialogActions,
  DialogContent,
  Box,
  Typography,
} from "@material-ui/core";
import { render } from "react-dom";

let resolve;
const modalRoot = document.getElementById("modal-root");
class DinamicDialog extends Component {
  static create(props = {}) {
    const containerElement = document.createElement("div");
    modalRoot.appendChild(containerElement);

    return render(
      <DinamicDialog createConfirmProps={props} />,
      containerElement
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  show(props = {}) {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { message, content } = showConfirmProps;

    return ReactDOM.createPortal(
      <Box>
        <Dialog open={isOpen} onClose={this.handleCancel}>
          <DialogContent>
            <Typography variant="h5">{message}</Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              {content}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </Box>,
      modalRoot
    );
  }
}

export default DinamicDialog;
