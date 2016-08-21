//----- drag and drop -----//
var vueDragula = {
    install: function (Vue, options) {
        'use strict';
        
        Vue.dnd = {};
        Vue.dnd.dragIndex = 0;
        
        //----- Initialize drag and drop -----//
        Vue.dnd.initialize = function (elem, handle = undefined, orientation = undefined) {
            var name = Object.getPrototypeOf(elem).constructor.name;
            if(Vue.dnd[name]) {
                elem.drake = Vue.dnd[name];
            } else {
                Vue.dnd[name] = Vue.dnd.dragulaInstance(handle ? handle : undefined, orientation ? orientation : 'vertical');
                elem.drake = Vue.dnd[name];
            }
            elem.drake.containers.push(elem.$el);
        };
        
        //----- safely destroy drag and drop -----//
        Vue.dnd.destroy = function(elem) {
            let dndIndex = elem.drake.containers.indexOf(elem.$el);
            if (dndIndex >= 0) elem.drake.containers.splice(dndIndex, 1);
            if (elem.drake.containers.length === 0) elem.drake.destroy();
        };
        
        //----- retrieve DOM index -----//
        Vue.dnd.domIndexOf = function (child, parent) {
            return Array.prototype.indexOf.call(parent.children, child);
        };
        
        //----- Query Builder -----//
        Vue.dnd.buildQuery = function (ary) {
            var query = 'self.vm';
            for (let x of ary) {
                if (isNaN(x)) {
                    query = query + '.' + x;
                } else {
                    query = query + '[' + x + ']';
                }
            }
            return query;
        };
        
        //----- Create Dragula Instances -----//
        Vue.dnd.dragulaInstance = function (handleParam = undefined, directionParam = 'vertical') {
            var drake = dragula({
                accepts: function (el, target, source, sibling) {
                    if (this.containers.includes(target) && this.containers.includes(source)) return true;
                    return false;
                },
                moves: function (el, container, handle) {
                    if (!handleParam) return true;
                    if (handle.classList.contains(handleParam)) return true;
                    if (handle.parentNode.classList.contains(handleParam)) return true;
                    return false;
                },
                direction: directionParam
            });
            drake.on('drag', function(el, source) {
                Vue.dnd.dragIndex = Vue.dnd.domIndexOf(el, source);
            });
            drake.on('drop', function (dropElem, target, source) {
                if (!target) return;
                var targetPosition = target.id.split("-");
                var sourcePosition = source.id.split("-");
                
                //----- This does the magic -----//
                // 1. a query is built e.g. self.vm.lists[1].title
                // 2. the query is evaluated, returns array
                // 3. array is spliced where element is dragged from
                //    and dragged element is deleted and returned
                // 4. returned element is inserted at index of dropped element
                eval(Vue.dnd.buildQuery(targetPosition)).splice(Vue.dnd.domIndexOf(dropElem, target), 0, eval(Vue.dnd.buildQuery(sourcePosition)).splice(Vue.dnd.dragIndex, 1)[0]);
                
                //----- If vuePS plugin -----//
                if (Vue.ps.scrollElems) Vue.ps.update();
            });
            return drake;
        };
    }
};

Vue.use(vueDragula);