import React from 'react';
import {Col, Container, Row} from "reactstrap";
import styles from './Search.module.css';
import SearchBar from './SearchBar';
import logoex from './logo.jpg';

class Search extends React.Component {

    render() {
        return (
            <Container
                // className={styles.searchpage}

            >
                <Row className="justify-content-start">
                        <img src={logoex}/> <br/>
                    <h5>What place are you looking for?</h5>

                </Row>
                {/*<Row className="justify-content-around">*/}
                {/*    <h4>What place are you looking for?</h4><br/>*/}
                {/*</Row>*/}
                <Row className="justify-content-center">
                    <SearchBar/>
                </Row>
            </Container>

        );
    }

}

export default Search;

