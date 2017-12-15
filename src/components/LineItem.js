import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Button, HelpBlock, FormControl, Col, FormGroup, Glyphicon } from 'react-bootstrap';

class LineItem extends Component {
    render() {
        let validationState;
        if (this.props.validationStates.description === null && this.props.validationStates.amount === null) {
            validationState = null;
        } else {
            validationState = this.props.validationStates.description && this.props.validationStates.amount ? 'success' : 'error';
        }

        return <div><FormGroup key={this.props.idx} controlId={`${this.props.idx}`}
            validationState={validationState} >
            <Col smOffset={2} sm={7} md={7} xs={7} lg={7}>
                <FormControl type="text" placeholder="description" value={this.props.description.toString()}
                    onChange={(e) => this.props.onChange("description", e.target.value)} />
            </Col>
            <Col sm={2} md={2} xs={2} lg={2}>
                <FormControl type="number" placeholder="amount" value={this.props.amount}
                    onChange={(e) => this.props.onChange("amount", e.target.value.replace(/^(0+)/g, ''))} />

            </Col>
            <Col sm={1} md={1} xs={1} lg={1}>
                <Button bsStyle="danger" onClick={this.props.onDelete}> <Glyphicon glyph="remove" /> </Button>
            </Col>
        </FormGroup>
            <FormGroup>
                <Col>
                    <HelpBlock>{Object.values(this.props.validationMessages).join(', ')}</HelpBlock>
                </Col>
            </FormGroup>
        </div>
    }
}

LineItem.defaultProps = {
    validationStates: { description: false, amount: false },
    validationMessages: { description: "", amount: "" },
}

export default LineItem