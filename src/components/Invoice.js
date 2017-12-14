import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import LineItem from './LineItem'
//import PropTypes from 'prop-types';
import NameAsyncTypeahead from './NameAsyncTypeahead'
import { Button, Form, HelpBlock, PageHeader, FormControl, Col, ControlLabel, FormGroup, Glyphicon, Grid } from 'react-bootstrap';

import { validateEmail, validateName, validateDate, validateLineItem, allInputValid } from '../util/validate'

//TODO PropTypes Validation


class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            dueDate: "",
            lineItems: [
                { key: this.randomStr(), description: "", "amount": 0.0, "error": { "description": "", "amount": "" } }
            ],
            nameError: "",
            "emailError": "",
            "dueDateError": "",
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleChangeLineItem = this.handleChangeLineItem.bind(this);
        this.addLineItem = this.addLineItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeText(label, validationFn, text) {
        var newState = {}
        const { error, validationState } = validationFn(text)
        newState[label] = text;
        newState[label + "Error"] = error;
        newState[label + "ValidationState"] = validationState;

        this.setState(newState);
        console.log(`Setting ${label} to `, text);
    }

    clearForm() {
        this.setState({
            name: "",
            email: "",
            dueDate: "",
            lineItems: [{ key: this.randomStr(), description: "", "amount": 0.0 }],
        })
    }
    handleSubmit() {
        fetch("http://localhost:8080/api/v1/invoices", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer:
                {
                    id: `${this.state.name}${this.state.email}`,
                    name: this.state.name,
                    email: this.state.email
                },
                invoice:
                {
                    totalAmount: this.calculateTotal(),
                    dueDate: this.state.dueDate
                },
                lineItems: this.state.lineItems
            })
        })
            .then(resp => {
                console.log(resp.json())
                this.clearForm()
                alert("Success!!");

            })
            .catch(console.error);

    }

    handleChangeLineItem(key, field, value) {
        this.setState({
            lineItems: this.state.lineItems.map(lineItem => {
                if (lineItem.key === key) {
                    if (key === "amount") {
                        value = parseFloat(value);
                    }
                    lineItem[field] = value;
                    lineItem.validation = validateLineItem(lineItem);
                }
                return lineItem;
            })
        })
    }

    randomStr = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    calculateTotal = () => this.state.lineItems.reduce((p, t) => p + parseFloat(t.amount), 0)

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
                <PageHeader>e-Invoice</PageHeader>
                <Form horizontal>
                    <FormGroup key="name" controlId="formHorizontalName" validationState={this.state.nameValidationState}>
                        <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                            Name
                    </Col>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            <NameAsyncTypeahead onChange={(text) => this.onChangeText("name", validateName, text)}>
                            </NameAsyncTypeahead>
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.nameError}</HelpBlock>
                        </Col>
                    </FormGroup>

                    <FormGroup key="email" controlId="formHorizontalEmail" validationState={this.state.emailValidationState}>
                        <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                            Email
                        </Col>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            <FormControl type="email" placeholder="email"
                                value={this.state.email}
                                onChange={(e) => this.onChangeText("email", validateEmail, e.target.value)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.emailError}</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup key="dueDate" controlId="formHorizontalDueDate" validationState={this.state.dueDateValidationState}>
                        <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                            Due Date
                        </Col>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            <FormControl type="date" placeholder="Due Date" value={this.state.dueDate}
                                onChange={(e) => this.onChangeText("dueDate", validateDate, e.target.value)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.dueDateError}</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>Description</Col>
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>Amount</Col>
                    </FormGroup>
                    {this.state.lineItems.map(lineItem => {

                        return <LineItem
                            key={lineItem.key}
                            idx={lineItem.key}
                            description={lineItem.description}
                            amount={lineItem.amount}
                            onDelete={() => this.handleDeleteLineItem(lineItem.key)}
                            onChange={(field, value) => this.handleChangeLineItem(lineItem.key, field, value)}
                            {...lineItem.validation }
                        />
                    }
                    )}
                    <FormGroup>
                        <Col smOffset={2} sm={1}>
                            <Button bsStyle="primary" bsSize="large" onClick={this.addLineItem}><Glyphicon glyph="plus" /></Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={10} sm={2}>
                            <h3>Total: $ {this.calculateTotal()}</h3>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={10} sm={2}>
                            <Button disabled={!allInputValid(this.state)} onClick={this.handleSubmit}>SEND</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid >
        );
    }
}

export default Invoice; 