//as all the jsx gets converted into React.createElement() calls
import React from 'react';

export default class AddOption extends React.Component{
    state = {
        error: undefined   //new syntax
    };
    /*
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
    }
    */
    //handleAddOption() They're both the exact same function invocation, 
    //it's just that we're capturing the return value from the second one into a variable called error. 
    handleAddOption = (e) => { 
        //e, is called event object, contains various information about the events
        //to prevent default behavior that full page refresh
        e.preventDefault(); 
        const option = e.target.elements.option.value.trim(); //grab the value contents
        const error =  this.props.handleAddOption(option);
        this.setState(() => {
            return {
                error: error
            }
        });
        if (!error) {
            e.target.elements.option.value = '';
        }
    };
    render(){
        return(
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit = {this.handleAddOption}>  
                     {/*this.handleAddOption just reference on form submit, we do not want to call it.*/}
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}