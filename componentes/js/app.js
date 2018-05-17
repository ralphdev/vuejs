
Vue.component('tasks', {
	template: `
	<section class="todoapp">
		<header class="header">
			<h1>Tareas</h1>
			<input type="text" class="new-todo" v-model="newTask" v-on:keyup.enter="add" placeholder="Agrega Tareas">
		</header>
		<section>
			<ul class="todo-list">
				<li class="todo" is="task" v-for="task in tasks" :task="task"></li>
			</ul>
		</section>
		<footer class="footer" v-show="tasks.length">
			<span class="todo-count">Completadas {{ completed }}</span>
			<span class="todo-count">Completadas {{ incompleted }}</span>
		</footer>
	</section>`,
	data: function(){
		return {
			newTask:"",
			tasks: [
				{title:"Aprende Angular", completed: true},
				{title:"Aprende PHP", completed: true},
				{title:"Aprende HTML", completed: true},
				{title:"Aprende Git", completed: false}
			]
		}
	},
	methods:{
		add: function(){

			if(this.newTask.length <= 1) return alert("La tarea no puede estar en blanco");
			
			this.tasks.push({
				title: this.newTask,
				completed: false
			});
			this.newTask = "";
		}
	},
	computed: {
		completed: function(){
			return this.tasks.filter(function(task) {
				return task.completed;
			}).length;
		},
		incompleted: function(){
			return this.tasks.filter(function(task) {
				return ! task.completed;
			}).length;
		}
	}
});

Vue.component('task', {
	props: ['task'],
	template: `
	<li :class="Classess">
		<div class="view">
			<input type="checkbox" class="toggle" v-model="task.completed" />
			<label v-text="task.title" @dblclick="edit()"></label>
			<button class="destroy" @click="remove()"></button>
		</div>
		<input type="text" class="edit" v-model="task.title" @keyup.enter="doneEdit()" @blur="doneEdit()" @keyup.esc="cancelEdit()"/>
	</li>
	`,
	data: function(){
		return {
			editing: false,
			cacheBeforeEdit: ''
		}
	},
	methods: {
		edit: function(){
			this.cacheBeforeEdit = this.task.title;
			this.editing = true;
		},
		doneEdit: function(){
			if(! this.task.title){
				this.remove();
			}
			this.editing = false;
			this.task.title = this.cacheBeforeEdit;
		},
		cancelEdit: function(){
			this.editing = false,
			this.task.title = this.cacheBeforeEdit;
		},
		remove: function(){
			//hay que llamar al componente padre
			var tasks = this.$parent.tasks;
			tasks.splice(tasks.indexOf(this.task), 1);
		}
	},
	computed:{
		Classess: function(){
			//return ['glyphicon', this.task.completed ? 'glyphicon-check': 'glyphicon-unchecked']
			return { completed: this.task.completed, editing: this.editing };
		}
	}

});

var app = new Vue({
	el: "#app",
});