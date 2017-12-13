import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Button, Form, PageHeader, FormControl, Col, ControlLabel, FormGroup, Glyphicon, Grid } from 'react-bootstrap';

const formFieldsArr = [
    {
        label: "Name", type: "text", placeholder: "name", name: "Name"
    },
    {
        label: "Email", type: "email", placeholder: "email", name: "Email"
    },
    {
        label: "Due Date", type: "date", placeholder: "date", name: "DueDate"
    }
];

const staticFormFields = (onChangeText) => formFieldsArr.map((formField) => {
    return (
        <FormGroup key={formField.label} controlId={`formHorizontal${formField.name}`}>
            <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                {formField.label}
            </Col>
            <Col xs={10} sm={10} md={10} lg={10}>
                <FormControl type={formField.type} placeholder={formField.placeholder} onChange={(e) => onChangeText(formField.label, e.target.value)} />
            </Col>
        </FormGroup>
    )
})

const formInstance = (onChangeText) => (
    <div>
        {staticFormFields(onChangeText)}
    </div>
);

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

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            dueDate: "",
            lineItems: [{ key: this.randomStr(), description: "", "amount": 0.0 }]
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleChangeLineItem = this.handleChangeLineItem.bind(this);
        this.addLineItem = this.addLineItem.bind(this);
    }

    onChangeText(label, text) {
        this.setState({
            label: text
        });
        console.log(`Setting ${label} to `, text);
    }
    //TODO
    handleSubmit() {

    }
    handleChangeLineItem(key, field, value) {
        this.setState({
            lineItems: this.state.lineItems.map(lineItem => {
                if (lineItem.key === key) {
                    lineItem[field] = value
                }
                return lineItem
            })
        })
    }

    randomStr = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    addLineItem() {
        this.setState({
            lineItems: [...this.state.lineItems, {
                key: this.randomStr(), description: "", amount: 0.0
            }]
        });
    }

    handleDeleteLineItem(key) {
        this.setState({
            lineItems: this.state.lineItems.filter((lineItem) => lineItem.key !== key)
        });
    }
    render() {
        return (
            <Grid>
                <PageHeader>E-Invoice</PageHeader>
                <Form horizontal>
                    {formInstance(this.onChangeText)}
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>Description</Col>
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>Amount</Col>
                    </FormGroup>
                    {this.state.lineItems.map(lineItem => <LineItem
                        key={lineItem.key}
                        idx={lineItem.key}
                        description={lineItem.description}
                        amount={lineItem.amount}
                        onDelete={() => this.handleDeleteLineItem(lineItem.key)}
                        onChange={(field, value) => this.handleChangeLineItem(lineItem.key, field, value)} />
                    )}
                    <FormGroup>
                        <Col smOffset={2} sm={1}>
                            <Button bsStyle="primary" bsSize="large" onClick={this.addLineItem}><Glyphicon glyph="plus" /></Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={10} sm={2}>
                            <h3>Total: ${this.state.lineItems.reduce((p, t) => p + parseFloat(t.amount), 0)}</h3>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={10} sm={2}>
                            <Button type="submit">Send</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
}

export default Invoice; 