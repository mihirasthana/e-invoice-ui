import React, { Component } from 'react';
import { Button, Form, HelpBlock, Row, PageHeader, FormControl, Col, ControlLabel, FormGroup, Glyphicon, Grid } from 'react-bootstrap';

import LineItem from './LineItem'
import NameAsyncTypeahead from './NameAsyncTypeahead'
import { validateEmail, validateName, validateDate, validateLineItem, allInputValid, isLineItemValid } from '../util/Validate'

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            dueDate: "",
            lineItems: [
                {
                    key: this.randomStr(),
                    description: "",
                    amount: "",
                    error:
                    { description: "", amount: "" },
                    validation: {
                        "validationStates":
                        { amount: null, description: null },
                        "validationMessages":
                        { amount: "", description: "" }
                    }
                }
            ],
            nameError: "",
            emailError: "",
            dueDateError: "",
        }
        this._bind("onChangeText", "handleChangeLineItem", "addLineItem", "handleSubmit")
    }

    /* Utility method to bind all functions */
    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

    onChangeText(label, validationFn, text) {
        var newState = {}
        const { error, validationState } = validationFn(text)
        newState[label] = text;
        newState[label + "Error"] = error;
        newState[label + "ValidationState"] = validationState;
        this.setState(newState);
    }

    clearForm() {
        this.setState({
            email: "",
            dueDate: "",
            lineItems: [{
                key: this.randomStr(), description: "", "amount": 0.0, error:
                { description: "", amount: "" },
                validation: {
                    "validationStates":
                    { amount: null, description: null },
                    "validationMessages":
                    { amount: "", description: "" }
                }
            }],
            nameError: "",
            emailError: "",
            dueDateError: "",
            emailValidationState: null,
            dueDateValidationState: null,
            nameValidationState: 'success'
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
            .then(() => {
                this.clearForm()
                alert("Invoice created successfully!!");

            })
            .catch((e) => alert(JSON.stringify(e)));

    }

    handleChangeLineItem(key, field, value) {
        this.setState({
            lineItems: this.state.lineItems.map(lineItem => {
                if (lineItem.key === key) {
                    if (field === "amount") {
                        if (value !== '') {
                            value = Number(value);
                        }
                    }
                    lineItem[field] = value;
                    lineItem.validation = validateLineItem(lineItem);
                }
                return lineItem;
            })
        })
    }

    randomStr() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    calculateTotal() {
        return this.state.lineItems.filter(isLineItemValid).reduce((p, t) => p + Number(t.amount), 0)
    }

    addLineItem() {
        this.setState({
            lineItems: [...this.state.lineItems, {
                key: this.randomStr(), description: "", amount: "", error:
                { description: "", amount: "" },
                validation: {
                    "validationStates":
                    { amount: null, description: null },
                    "validationMessages":
                    { amount: "", description: "" }
                }
            }]
        });
    }

    handleDeleteLineItem(key) {
        this.setState({
            lineItems: this.state.lineItems.filter((lineItem) => lineItem.key !== key)
        });
    }

    renderNameFormGroup() {
        return (
            <FormGroup key="name" controlId="formHorizontalName" validationState={this.state.nameValidationState}>
                <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>Name</Col>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <NameAsyncTypeahead onChange={(text) => this.onChangeText("name", validateName, text)} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.state.nameError}</HelpBlock>
                </Col>
            </FormGroup>
        );
    }

    renderEmailFormGroup() {
        return (
            <FormGroup key="email" controlId="formHorizontalEmail" validationState={this.state.emailValidationState}>
                <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>Email</Col>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <FormControl type="email" placeholder="email"
                        value={this.state.email}
                        onChange={(e) => this.onChangeText("email", validateEmail, e.target.value)} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.state.emailError}</HelpBlock>
                </Col>
            </FormGroup>
        );
    }
    renderDueDateFormGroup() {
        return (
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
        )
    }
    renderLineItems() {
        return (
            this.state.lineItems.map(
                lineItem =>
                    <LineItem
                        key={lineItem.key}
                        idx={lineItem.key}
                        description={lineItem.description}
                        amount={lineItem.amount}
                        onDelete={() => this.handleDeleteLineItem(lineItem.key)}
                        onChange={(field, value) => this.handleChangeLineItem(lineItem.key, field, value)}
                        {...lineItem.validation }
                    />
            ));
    }
    render() {
        return (
            <Grid>
                <PageHeader>e-Invoice</PageHeader>
                <Form horizontal>
                    {this.renderNameFormGroup()}
                    {this.renderEmailFormGroup()}
                    {this.renderDueDateFormGroup()}
                    <Row>
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>Description</Col>
                        <Col componentClass={ControlLabel} sm={2} smOffset={3}>Amount</Col>
                    </Row>
                    {this.renderLineItems()}
                    <FormGroup>
                        <Col smOffset={2} sm={1}>
                            <Button bsStyle="primary" bsSize="large" onClick={this.addLineItem}><Glyphicon glyph="plus" /></Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={10} sm={2}>
                            <h3>Total: $ {this.calculateTotal().toFixed(2)}</h3>
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