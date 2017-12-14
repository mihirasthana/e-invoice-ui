import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Button, FormControl, Col, FormGroup, Glyphicon } from 'react-bootstrap';

class LineItem extends Component {

    render() {
        return <FormGroup key={this.props.idx} controlId={`${this.props.idx}`} >
            <Col smOffset={2} sm={7} md={7} xs={7} lg={7}>
                <FormControl type="text" placeholder="description" value={this.props.description} onChange={(e) => this.props.onChange("description", e.target.value)} />
            </Col>
            <Col sm={2} md={2} xs={2} lg={2}>
                <FormControl type="number" placeholder="amount" value={this.props.amount} onChange={(e) => this.props.onChange("amount", e.target.value)} />
            </Col>
            <Col sm={1} md={1} xs={1} lg={1}>
                <Button bsStyle="danger" onClick={this.props.onDelete}> <Glyphicon glyph="remove" /> </Button>
            </Col>
        </FormGroup>
    }
}

export default LineItem