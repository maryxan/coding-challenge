import React from 'react';
import {Row, Form, Button } from "reactstrap";
import AutoCompletePopup from './AutoCompletePopup';
import produce from 'immer';
import $ from "jquery";
import styles from './Searchbar.module.scss';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            locations: [],
            inputvalue : '',
            isPopupOpen : false,
            language : '',
            isfound : ''
        }
        this.hidePopup=this.hidePopup.bind(this);

    }

    checkLang(inputvalue){
        const englishpattern = /^[A-Za-z]*/;
        const elpattern = /^[α-ωΑ-Ω-Ωάέήίύώόϊϋΐΰ]*$/;

        if (elpattern.test(inputvalue)){
            this.state.language = 'el'
            console.log(this.state.language)
        }else {
            this.state.language = 'en'
            console.log(this.state.language)
        }
    }

    handleClick() {
        window.open("https://www.google.com/search?q="+this.state.inputvalue+"",'_blank');
    }

    inputChangedHandler(event, field) {
        event.persist();
        event.preventDefault();
        //console.log(event.target.value);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft[field]= v;
            })
        )

        if(field === "inputvalue") {
            this.checkLang(v);
            this.locationsGet(v);

        }

    }


    locationsGet(value){
        if(value===''){
            this.hidePopup();
            return;
        }
        if(this.state.inputvalue.length === 0){
            this.hidePopup();
            return;
        }

        setTimeout(() => {
        $.ajax({
            url: "http://35.180.182.8/search?keywords="+value+"&language="+this.state.language+"",
            dataType: 'json',
            contentType: "application/json",
            type: 'GET'
        })
        .then(json => {
            console.log("Ajax success!");
            console.log(json)
            this.setState({locations:json.entries});
            this.showPopup();
            console.log("Ajax end");
            this.state.isfound = 1;
        })
        .fail(err=>{
            console.log(err)
        })
        }, 2000);
    }

    SelectHandler(value){
        console.log("SelectHandler start");
        console.log(this.state);
        this.setState({inputvalue:value});
        this.hidePopup();
        console.log(this.state);
        console.log("SelectHandler end");
    }


    showPopup() {
        setTimeout(() => {

            this.setState({ isPopupOpen: true });
        }, 1000);
    }

    hidePopup() {
        this.setState({ isPopupOpen: false });

    }

    render(){
        return(
            <Form>
            <Row className="d-flex justify-content-center align-items-start" >

                <div>
                    <div className={styles.searchcontainer} >
                        <div
                             className={styles.content}
                        >
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Please type your search term.."
                                style={{ marginBottom:" 7px"}}
                                value={this.state.inputvalue}
                                onChange={(event)=> this.inputChangedHandler(event, "inputvalue")}
                                onClick={() => {if(this.state.inputvalue!==''){ this.showPopup()}}}
                            />

                            <AutoCompletePopup
                                isOpen={this.state.isPopupOpen}
                                items = {this.state.locations}
                                select={(value) => this.SelectHandler(value)}
                                onRequestClose={this.closePopup}

                            />
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="justify-content-start">
                {/*<Button  disabled={!this.state.locations.items} onClick={this.handleClick.bind(this)}>Click to search</Button>*/}
                <Button disabled={!this.state.locations.length} onClick={this.handleClick.bind(this)}>Click to search</Button>
            </Row>
         </Form>
        )
    }
}


export default SearchBar;