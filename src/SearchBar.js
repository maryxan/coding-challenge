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
            categories: [],
            categoryvalue : '',
            isCategoryPopupOpen : false,
            language : '',
            isfound : ''
        }

    }

    checkLang(categoryvalue){
        const englishpattern = /^[A-Za-z]*/;
        const elpattern = /^[α-ωΑ-Ω-Ωάέήίύώόϊϋΐΰ]*$/;

        if (elpattern.test(categoryvalue)){
            this.state.language = 'el'
            console.log(this.state.language)
        }else {
            this.state.language = 'en'
            console.log(this.state.language)
        }
    }

    handleClick() {
        window.open("https://www.google.com/search?q="+this.state.categoryvalue+"",'_blank');
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

        if(field === "categoryvalue") {
            this.checkLang(v);
            this.categoriesGet(v);

        }

    }


    categoriesGet(value){
        if(value===''){
            this.hideCategoryPopup();
            return;
        }

        setTimeout(() => {
        $.ajax({
            url: "http://35.180.182.8/search?keywords="+value+"&language="+this.state.language+"&limit=5",
            dataType: 'json',
            type: 'GET'
        })
        .then(json => {
            console.log("Ajax success!");
            console.log(json)
            this.setState({categories:json.entries});
            this.showCategoryPopup();
            console.log("Ajax end");
            this.state.isfound = 1;
        })
        .fail(err=>{
            console.log(err)
        })
        }, 2000);
    }

    categorySelectHandler(value){
        console.log("categorySelectHandler start");
        console.log(this.state);
        this.setState({categoryvalue:value});
        this.hideCategoryPopup();
        console.log(this.state);
        console.log("categorySelectHandler end");
    }


    showCategoryPopup() {
        setTimeout(() => {

            this.setState({ isCategoryPopupOpen: true });
        }, 3000);
    }

    hideCategoryPopup() {
        this.setState({ isCategoryPopupOpen: false });

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
                                value={this.state.categoryvalue}
                                onChange={(event)=> this.inputChangedHandler(event, "categoryvalue")}
                                onClick={() => {if(this.state.categoryvalue!==''){ this.showCategoryPopup()}}}
                            />

                            <AutoCompletePopup
                                isOpen={this.state.isCategoryPopupOpen}
                                items = {this.state.categories}
                                select={(value) => this.categorySelectHandler(value)}
                            />
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="justify-content-start">
                <Button  disabled={!this.state.categories.item} onClick={this.handleClick.bind(this)}>Click to search</Button>
                <Button variant="outline-secondary">haaa</Button>
            </Row>
         </Form>
        )
    }
}


export default SearchBar;