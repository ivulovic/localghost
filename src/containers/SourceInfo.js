import React from "react";
import {SourceListItem} from "../components/SourceListItem";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import Dialog from "@material-ui/core/es/Dialog/Dialog";

export class SourceInfo extends React.Component{
  render() {
    return(
      <div>
        <Dialog
          open={this.props.sourceInfoDialogOpened}
          onClose={this.props.onSourceInfoDialogClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          fullWidth={true}
          maxWidth = {'lg'}>
          <DialogTitle id="scroll-dialog-title">Source Info: {this.props.source? this.props.source.title:''}</DialogTitle>
          <DialogContent>
            <ul className="source-items-list">
              {Boolean(this.props.source) && Boolean(this.props.source.items) && this.props.source.items.map((source, i) => <SourceListItem key={i} description={source.description} link={source.link } /> )}
            </ul>
            {Boolean(this.props.source) && !Boolean(this.props.source.items) && <p className="color-gray medium-line-spacing">No data found for this source.</p>}
          </DialogContent>
          {/*<DialogActions>*/}
          {/*<Button onClick={this.handleClose} color="primary">*/}
          {/*Cancel*/}
          {/*</Button>*/}
          {/*<Button onClick={this.handleClose} color="primary">*/}
          {/*Subscribe*/}
          {/*</Button>*/}
          {/*</DialogActions>*/}
        </Dialog>
      </div>
    )
  }
}
