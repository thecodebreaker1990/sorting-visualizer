import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import GridContainer from '../../components/GridContainer/GridContainer';
import Toolbar from '../../components/Toolbar/Toolbar';

import { randomIntFromInterval } from '../../helper/utility';
import { bubbleSort, selectionSort } from '../../helper/sortingalgos/sortingAlgos';

import classes from './SortingVisualizer.module.css';

class SortingVisualizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sortingOptions: [
                { label: 'Bubble Sort', key: 'BUB' },
                { label: 'Selection Sort', key: 'SEL' }
            ],
            selectedSortingMethod: 'BUB',
            currentSwappers: [],
            currentSorted: [],
            currentSelectTwo: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 20; i++) {
            array.push(randomIntFromInterval(5, 60));
        }
        this.setState({ 
            array, 
            currentSwappers: [],
            currentSorted: [],
            currentSelectTwo: [] 
        });
    }
    handleSortingSelection(key) {
        this.setState({ selectedSortingMethod: key });
    }
    applySort() {
        let animationSteps = [];
        switch(this.state.selectedSortingMethod) {
            case 'BUB': 
                animationSteps = bubbleSort(this.state.array);
                break;
            case 'SEL': 
                animationSteps = selectionSort(this.state.array);
                break;
            default:
        }
        this.handleAnimation(animationSteps, 100);
    }
    handleAnimation(animationSteps, speed) {
       if(!animationSteps.length) {
            const currentSorted = this.state.array.map((_, index) => index);
            this.setState({ currentSorted, currentSwappers: [] });
            return;
       }
       const { type, element } = animationSteps[0];
       switch(type) {
            case 'set_minimum':
                this.setState({ currentSelectTwo: element });
                break;
            case 'comparison': 
                this.setState({ currentSwappers: element });
                break;
            case 'swap':
                const arrCopy = this.state.array.slice();
                const [first, second] = element;
                const temp = arrCopy[first];
                arrCopy[first] = arrCopy[second];
                arrCopy[second] = temp;
                this.setState({ array: arrCopy, currentSwappers: element });
                break;
            case 'sorted':
                const currentSorted = this.state.currentSorted.slice();
                currentSorted.push(element);
                this.setState({ currentSorted, currentSwappers: [], currentSelectTwo: [] });
                break;
            default:
       }
       animationSteps.shift();
       setTimeout(() => this.handleAnimation(animationSteps, speed), speed); 
    }
    render() {
        const { array } = this.state;
        const toolbar = <Toolbar 
                            randomize={this.resetArray.bind(this)}
                            sort={this.applySort.bind(this)}
                            sortOptions={this.state.sortingOptions}
                            selectedSort={this.state.selectedSortingMethod}
                            selectSort={this.handleSortingSelection.bind(this)}
                        />;
        return <Layout toolbar={ toolbar }>
                <div className={classes.Visualizer}>
                    <GridContainer 
                        list={array}
                        currentSwappers={this.state.currentSwappers}
                        currentSorted={this.state.currentSorted}
                        currentSelectTwo={this.state.currentSelectTwo}
                    />
                </div>
        </Layout>
    }
}

export default SortingVisualizer;
