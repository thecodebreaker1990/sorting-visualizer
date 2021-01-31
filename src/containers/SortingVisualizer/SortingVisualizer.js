import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import GridContainer from '../../components/GridContainer/GridContainer';
import Toolbar from '../../components/Toolbar/Toolbar';
import Sidebar from '../../UI/Sidebar/Sidebar';
import RangeSlider from '../../components/UI/RangeSlider/RangeSlider';

import { randomIntFromInterval, generateStyleObjMap } from '../../helper/utility';
import { bubbleSort, selectionSort } from '../../helper/sortingalgos/sortingAlgos';

import classes from './SortingVisualizer.module.css';

class SortingVisualizer extends Component {

    constructor(props) {
        super(props);
        this.timerId = null;
        this.state = {
            array: [],
            sortingOptions: [
                { label: 'Bubble Sort', key: 'BUB' },
                { label: 'Selection Sort', key: 'SEL' }
            ],
            selectedSortingMethod: 'BUB',
            styleMap: {},
            currentSwappers: [],
            currentSorted: [],
            currentSelectTwo: [],
            speed: 100
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        randomIntFromInterval.reset();
        for(let i = 0; i < 20; i++) {
            array.push(randomIntFromInterval.find(5, 60));
        }
        this.setState({ 
            array,
            styleMap: generateStyleObjMap(array), 
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
            const currentSorted = this.state.array.map((el) => el);
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
                const styleCopy = JSON.parse(JSON.stringify(this.state.styleMap));
                const [first, second] = element;
                const { left: firstLeft } = { ...styleCopy[first] };
                const { left: secondLeft } = { ...styleCopy[second] };
                styleCopy[first] = {
                    ...styleCopy[first],
                    left: secondLeft
                };
                styleCopy[second] = {
                    ...styleCopy[second],
                    left: firstLeft
                };
                this.setState({ styleMap: styleCopy, currentSwappers: element });
                break;
            case 'sorted':
                const currentSorted = this.state.currentSorted.slice();
                currentSorted.push(element);
                this.setState({ currentSorted, currentSwappers: [], currentSelectTwo: [] });
                break;
            default:
       }
       animationSteps.shift();
       this.timerId = setTimeout(() => this.handleAnimation(animationSteps, speed), speed); 
    }
    render() {
        const { array, styleMap, speed } = this.state;
        const toolbar = <Toolbar 
                            randomize={this.resetArray.bind(this)}
                            sort={this.applySort.bind(this)}
                            sortOptions={this.state.sortingOptions}
                            selectedSort={this.state.selectedSortingMethod}
                            selectSort={this.handleSortingSelection.bind(this)}
                        />;
        const sidebar = <Sidebar />
        return <Layout toolbar={ toolbar } sidebar={ sidebar }>
                <div className={classes.Visualizer}>
                    <GridContainer 
                        list={array}
                        styleMap={styleMap}
                        currentSwappers={this.state.currentSwappers}
                        currentSorted={this.state.currentSorted}
                        currentSelectTwo={this.state.currentSelectTwo}
                    />
                    <RangeSlider 
                        min="50" 
                        max="1000" 
                        value={speed} 
                        onInput={(value) => this.setState({ speed: value })} 
                    />
                </div>
        </Layout>
    }
}

export default SortingVisualizer;
