import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class NameAsyncTypeahead extends React.Component {
    state = {
        isLoading: false,
        options: [],
    };

    render() {
        return (
            <AsyncTypeahead
                multiple={false}
                isLoading={this.state.isLoading}
                onInputChange={this.props.onChange}
                onSearch={query => {
                    this.setState({ isLoading: true });
                    fetch(`http://localhost:8080/api/v1/customers?q=${query}`)
                        .then(resp => resp.json())
                        .then(json => this.setState({
                            isLoading: false,
                            options: json,
                        }));
                }}
                options={this.state.options}
            />
        );
    }
}

export default NameAsyncTypeahead