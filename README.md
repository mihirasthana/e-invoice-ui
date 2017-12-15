# e-Invoice : Craft Demo

## Problem Statement
Implement a fully functional invoice page (including the HTML form, backend service, and data persistence). 
There is an arbitrary number of invoice line items (which have a description and an amount). The user can add 
more line items by clicking on the ‘+’ element. There is a read-only invoice TOTAL that updates as line items 
are added and the name and email fields are required fields. Refer to the wireframe for the specific information 
to be captured.

#### The following basic functionality is implemented:

- [X] User can enter name, email and date

- [X] User can add multiple line items in the same invoice and see the total amount

- [X] User can delete multiple line items in the same invoice

- [X] User can save the invoice into DB

- [X] Following RESTful endpoints have been defined:
      
        POST http://localhost:8080/api/v1/invoices
     
        GET  http://localhost:8080/api/v1/customers?q=${query}

#### The following features have been implemented for bonus considerations:

- [X] Used React

- [X] Responsive

- [X] Typeahead feature for name field

- [X] Added ability to remove line items

#### The following features/issues are being worked upon and are marked as [X] if completed:
- [X] Clear form on Submit
- [X] Disable submit button when invalid input
- [X] Disable submit button while submitting (to avoid sending mulitple invoices)
- [X] Form fields validations
- Proptype validations
- Typeahead Alignment
- [X] Typeahead Backend limit
- Test Cases 

## Tools and Technology Stack
 **React.js  SpringBoot MySQL**


