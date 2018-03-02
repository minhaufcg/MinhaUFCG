angular.module('mufcg')
.service('Pagination', function Pagination() {
    var current = 0;
    var perPage = 5;
    var data = [];

    const configure = function (config) {
        perPage = config.perPage || perPage;
        data = config.data || data;  
    };

    const itemsTotal = function () {
        return data.length;
    }

    const pagesTotal =  function () {
        return Math.ceil(itemsTotal() / perPage); 
    }

    const goToPage = function (index) {
        current = index;
        var begin = index > 0 ? index * perPage : index;
        var end = begin + perPage;
        end = end > itemsTotal() ? itemsTotal() : end;
        var newData = data.slice(begin, end);
        return {
            data: newData,
            current: current,
            from: begin,
            to: end
        }
    };

    const next = function() {
        if(current + 1 == pagesTotal()) {
            return goToPage(current);
        }
        current++;
        return goToPage(current);
    }

    const prev = function() {
        if (current == 0) {
            return goToPage(current);
        }
        current--;
        return goToPage(current);
    }

    return {
        configure: configure,
        itemsTotal: itemsTotal,
        pagesTotal: pagesTotal,
        goToPage: goToPage,
        next: next,
        prev: prev
    };
});