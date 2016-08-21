# vue-dragula
### Features
- simple nested drag and drops
- multiple dragula instances automatically
- Vue.js keeps track of all changes


### Installation
```
bower install vue-dragula
```
### Usage
Include vueDragula after Vue.js and dragula:
```html
<script src="path/to/vue.js"></script>
<script src="path/to/dragula.js"></script>
<script src="bower_components/vuedragula/vuedragula.min.js"></script>
```
Make your Vue.js components draggable, e.g.:
```javascript
Vue.component('dnd-board', {
    props: ['id'],
    template: '#dnd-board',
    ready: function() {
        Vue.dnd.initialize(this, 'class-of-handle', 'direction');
    },
    beforeDestroy: function () {
        Vue.dnd.destroy(this);
    }
});
```
To pass the class of a handle and a direction are optional. The default direction is vertical. In the above example child-elements of dnd-board will be draggable. 
You have to make sure dnd-board has an id representing its draggable children's position in the Vue instance's data object, e.g.:
```html
<dnd-board v-cloak id="lists">
    <div class="column" v-for="list in lists">
        <h2 class="dnd-lists-handle">
            {{list.title}}
        </h2>
        <dnd-row v-cloak :id="'lists-' + $index + '-todos'" :list="list">
            <div class="card" v-for="todo in list.todos">
                {{todo.title}}
            </div>
        </dnd-row>
    </div>
</dnd-board>
<dnd-item v-cloak :id="'lists-' + $index + '-todos'"></dnd-item>
```
When the Vue instance's data object is:
```javascript
data: {
    lists: [
        {
            title: 'Todo',
            todos: [
                {title: 'code'},
                {title: 'eat'},
                {title: 'sleep'},
                {title: 'repeat'}
            ]
        },
        {
            title: 'Todo',
            todos: [
                {title: 'code'},
                {title: 'eat'},
                {title: 'sleep'},
                {title: 'repeat'}
            ]
        },
        {
            title: 'Todo',
            todos: [
                {title: 'code'},
                {title: 'eat'},
                {title: 'sleep'},
                {title: 'repeat'}
            ]
        }
    ]
}
```