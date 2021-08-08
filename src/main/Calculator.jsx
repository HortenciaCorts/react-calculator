import React, {Component} from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const inicialState = {
    displayOld: '',
    displayValue: '0',
    cleanDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{
    state = {...inicialState}

    constructor(props){
        super(props)
        this.cleanMemory = this.cleanMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.deleteLastNumber = this.deleteLastNumber.bind(this)
    }
    cleanMemory(){
        this.setState({...inicialState})
    }
    deleteLastNumber() {
        let values = [...this.state.values]
        const newValue = String(values[0]).slice(0, -1)
        values[0] = newValue === '' ? '0' : newValue;
        values[1] = 0
        this.setState({displayValue: values[0], values})
      }
    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, cleanDisplay: true})
        }else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            if(currentOperation === '/' && values[1] === 0){
                return 'Não é possível dividir por zero'
            }
            const displayOld = `${values[0]}${currentOperation}${values[1]}`
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }catch(e){
            }
            values[1] = 0
            this.setState({
                displayOld,
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                cleanDisplay: !equals,
                values
            })
        }
    }
    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }
        const cleanDisplay = this.state.displayValue === '0' 
            || this.state.cleanDisplay
        const currentValue = cleanDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, cleanDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} valueOld={this.state.displayOld} />
                <Button label="AC" click={this.cleanMemory} double />
                <Button label="⌫" click={this.deleteLastNumber} />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}