
Vue.component('tasks', {
	template: `
	<section class="todoapp">
		<header class="header">
			<h1>Tareas</h1>
			<input type="text" class="new-todo" v-model="newTask" v-on:keyup.enter="add">
		</header>
		<section>
			<ul class="todo-list">
				<li class="todo" is="task" v-for="task in tasks" :task="task"></li>
			</ul>
		</section>
		<footer class="footer">
			<span class="todo-count">Completadas {{ completed }}</span> | <span class="todo-count">Completadas {{ incompleted }}</span>
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
			<label v-text="task.title"></label>
		</div>
		
	</li>
	`,
	computed:{
		Classess: function(){
			//return ['glyphicon', this.task.completed ? 'glyphicon-check': 'glyphicon-unchecked']
			return { completed: this.task.completed };
		}
	}

});

var app = new Vue({
	el: "#app",
});