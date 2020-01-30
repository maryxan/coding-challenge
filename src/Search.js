import React from 'react';
import {Container, Row} from "reactstrap";
import SearchBar from './SearchBar';
import logoex from './logo.jpg';

class Search extends React.Component {

    render() {
        return (
            <Container>
                <Row className="justify-content-start">
                        <img src={logoex}/> <br/>
                    <h5>What place are you looking for?</h5>

                </Row>
                <Row className="justify-content-center">
                    <SearchBar/>
                </Row>
            </Container>

        );
    }

}

export default Search;

