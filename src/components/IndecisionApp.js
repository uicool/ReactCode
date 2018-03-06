import React from 'react';
import AddOption from './AddOption.js';
import Action from './Action.js';
import Header from './Header.js';
import Options from './Options.js';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component{ 
    state = {
        options : [],
        selectedOption: undefined
    };
    /*
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        this.state = {
            options : []
        };
    }
    */
    handleDeleteOptions = () => {
        //this.setState(() => ({ options:[] }));
        this.setState(() => {
            return {
                options: []
            };
        });
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    };

    //handlePick() - pass down to Action and setup onClick -- bind here
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        //Modal should appear here.
        this.setState(() => ({
            selectedOption: option
        }));
    };
    
    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add item';
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
    };
    //we mount a single instance of indecision app component
    //If you do need to use lifecycle, you're going to use a class based component
    //we can use componentDidMount() for fetching data
    componentDidMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({options}));
            }
        } catch (e) {

        }
    }
    //it comes to figure out when components data has changed inside
    componentDidUpdate(prevPros, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    
    render(){
        const subtitle = '!!Put your life in the hands of a computer';

        return(
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0   }
                        //handlePick - pass down to child Action through props
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options = {this.state.options} 
                            handleDeleteOptions = {this.handleDeleteOptions} 
                            handleDeleteOption = {this.handleDeleteOption} 
                        />
                        <AddOption 
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
} //class IndecisionApp end

export default IndecisionApp;