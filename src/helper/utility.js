const randomIntFromInterval = (function(global) {
    let array = [];
    let maxIndex = 0;

    function find(min, max) {
        if(array.length === 0) {
            fillArray(min, max);
            maxIndex = max - min - 1;
        }
        let randomIndex = Math.floor(Math.random() * maxIndex);
        let randomData  = array[randomIndex];

        let temp = array[maxIndex];
        array[maxIndex] = array[randomIndex];
        array[randomIndex] = temp;
        maxIndex--;

        return randomData;
    }
    function fillArray(min, max) {
        for(let i=min; i<=max; i++) {
            array.push(i);
        }
    }
    function reset() {
        maxIndex = 0;
        array = [];
    }

    const publicAPI = {
        find,
        reset
    };

    return publicAPI;
})(window);

const generateStyleObjMap = function(array) {
    const map = {}, bottom = 50, gap = 50;
    array.forEach(function(value, index) {
        map[value] = {
            height: `${value * 5}px`,
            left: `${gap * index}px`,
            bottom: `${bottom}px`
        };
    });
    return map;
}

export { randomIntFromInterval, generateStyleObjMap };