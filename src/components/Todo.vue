<template>
    <Draggable class='ui centered card'>
      <div class="content" :id="todo['.key']" v-show="!isEditing">
        <div class='header'>
          {{ todo.titleText }}
        </div>
        <div class='border container v-content' v-html="reformat(todo.projectText)"> </div>
        <div class='border container v-content'> <p><b>Assignee: </b> {{todo.assignee}}</p> </div>
        <div class='border container v-content'> <p><b>Estimation: </b> {{todo.estimate}} <b>hours</b></p> </div>
        <div class="progress mt-2" v-if="todo.status == 3">
          <div class="progress-bar progress-bar-striped" role="progressbar" :style="'width:'  + (todo.progress ? todo.progress : 0) + '%'"> {{ todo.progress ? todo.progress : 0}} %</div>
        </div>
        <div class="progress mt-2" v-if="todo.status == 1">
          <div class="progress-bar progress-bar-striped" role="progressbar" :style="'width:'  + (todo.testProgress ? todo.testProgress : 0) + '%'"> {{ todo.testProgress ? todo.testProgress : 0}} %</div>
        </div>
        <div class="row footer-todo">
          <div class="col-lg-6 text-left">
          {{ todo.dueDate }}
          </div>
          <div class='extra content col-lg-4'>
              <span class='right floated edit icon' v-on:click="showForm">
            <i class='edit icon'></i>
            </span>
              <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
              <i class='trash icon'></i>
            </span>
          </div>
        </div>
      </div>
      <div class="content" v-show="isEditing">
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input type='text' v-model="todo.titleText">
          </div>
          <div class='field'>
            <label>Project</label>
            <textarea type='text' v-model="todo.projectText" :rows="3" :amax-rows="6"></textarea>
          </div>
          <div class='field'>
            <label>Assignee</label>
            <select v-model="todo.assignee">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div class='field'>
            <label>Estimation</label>
            <input type='number' v-model="todo.estimate">
          </div>
          <div class='field'>
            <label>Due date</label>
            <input v-model="todo.dueDate" type='date'>
          </div>
          <div class='field' v-if="todo.status == 3">
            <label>Progress</label>
            <input v-model="todo.progress" type='number'>
          </div>
          <div class='field' v-if="todo.status == 1">
            <label>Progress</label>
            <input v-model="todo.testProgress" type='number'>
          </div>
          <div>
            <button class='ui green button' v-on:click="completeTodo(todo)">
              Save
            </button>
            <button class='ui red button' v-on:click="hideForm">
              Close
            </button>
          </div>
        </div>
      </div>
      <div class='ui bottom attached basic button' :class="statusClass[todo.status]">
        {{ statusText[todo.status] }}
      </div>
    </Draggable>
</template>

<script type="text/javascript">
import {Draggable} from 'vue-smooth-dnd'
export default {
  props: ['todo'],
  components: {Draggable},
  data () {
    return {
      statusText: [
        'Todo', 'In Test', 'Completed', 'In Progress'
      ],
      statusClass: [
        'teal', 'blue', 'green', 'red'
      ],
      isEditing: false
    }
  },
  methods: {
    showForm () {
      this.isEditing = true
    },
    hideForm () {
      this.isEditing = false
    },
    deleteTodo (todo) {
      this.$emit('delete-todo', todo)
    },
    completeTodo (todo) {
      this.$emit('complete-todo', todo)
      this.hideForm()
    },
    reformat (value) {
      return value.replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
  }
}
</script>

<style scoped>
  .card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
  }

  .card-ghost-drop{
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
  }
  .v-content{
    min-height: 50px;
    text-align: left;
    padding: 8px;
  }
  .footer-todo{
    margin-bottom: -10px;
    margin-top: 5px;
  }
  .col-lg-6, .col-lg-4{
    margin: 10px !important;
  }
</style>
