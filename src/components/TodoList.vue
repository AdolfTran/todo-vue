<template>
  <div>
    <h1 class="border-bottom">Vue.js Todo App</h1>
    <button v-on:click="logout" class="text-danger">Logout</button>
    <div class='container-fluid'>
      <create-todo v-on:a="createTodo"></create-todo>
      <Container orientation="horizontal"
                 @drop="onColumnDrop($event)"
                 drag-handle-selector=".column-drag-handle"
                 @drag-start="dragStart" class="row">
        <div class="col-sm-2">
        </div>

        <Draggable :key="0" class="col-sm-2 border border-info pb-3 mr-3 min-height">
          <h5 class="border-bottom pt-3 text-info">TO DO</h5>

          <Container
            group-name="col"
            @drop="(e) => onCardDrop(0, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(0)"
          >
            <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :todo.sync="todo"
                  v-for="todo in todos" v-if="todo.status == 0"></todo>
          </Container>
        </Draggable>
        <Draggable :key="3" class="col-sm-2 border border-danger pb-3 mr-3 min-height">
          <h5 class="border-bottom pt-3 text-danger">PENDING</h5>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(3, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(3)"
          >
            <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :todo.sync="todo"
                  v-for="todo in todos"
                  v-if="todo.status == 3"></todo>
          </Container>
        </Draggable>
        <Draggable :key="1" class="col-sm-2 border border-primary pb-3 mr-3 min-height">
          <h5 class="border-bottom pt-3 text-primary">DOING</h5>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(1, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(1)"
          >
            <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :todo.sync="todo"
                  v-for="todo in todos"
                  v-if="todo.status == 1"></todo>
          </Container>
        </Draggable>
        <Draggable :key="2" class="col-sm-2 border border-success pb-3 mr-3 min-height">
          <h5 class="border-bottom pt-3 text-success">DONE</h5>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(2, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(2)"
          >
            <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :todo.sync="todo"
                  v-for="todo in todos"
                  v-if="todo.status == 2"></todo>
          </Container>
        </Draggable>

        <div class="col-sm-2">
        </div>
      </Container>
    </div>
  </div>
</template>

<script type="text/javascript">
import swal from 'sweetalert2'
import {Container, Draggable} from 'vue-smooth-dnd'
import Todo from './Todo'
import CreateTodo from '@/components/CreateTodo'
import firebase, {todoRef} from '@/firebase'

export default {
  components: {
    Todo,
    CreateTodo,
    Container,
    Draggable
  },
  data () {
    return {
      todos: [],
      currentUserId: ''
    }
  },
  created () {
    this.currentUserId = this.getUserId()
    this.getListToDo()
  },
  methods: {
    onColumnDrop: function (dropResult) {
      console.log('onColumnDrop', dropResult)
      // const scene = Object.assign({}, this.scene);
      // scene.children = applyDrag(scene.children, dropResult);
      // this.scene = scene;
    },

    onCardDrop: function (columnId, dropResult) {
      if (dropResult.addedIndex !== null) {
        let newStatus = columnId
        let idTodo = dropResult.droppedElement.id
        todoRef.child(this.currentUserId).child(idTodo).update({status: newStatus})
      }
    },

    getCardPayload: function (columnId) {
      console.log('getCardPayload', columnId)
      // return index => {
      //   return this.scene.children.filter(p => p.id === columnId)[0].children[
      //     index
      //     ];
      // };
    },
    dragStart: function () {},
    log: function (...params) { },

    deleteTodo (todo) {
      swal({
        title: 'Are you sure?',
        text: 'This To-Do will be permanently deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          let idTodo = todo['.key']
          todoRef.child(this.currentUserId).child(idTodo).remove()
        }
      })
    },
    completeTodo (todo) {
      let idTodo = todo['.key']
      let progress = todo.progress ? todo.progress : 0
      todoRef.child(this.currentUserId).child(idTodo).update({
        dueDate: todo.dueDate,
        titleText: todo.titleText,
        projectText: todo.projectText,
        progress: progress <= 0 ? (progress > 100 ? 100 : progress) : 0
      })
      swal('Success!', 'To-Do completed!', 'success')
    },
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    getUserId () {
      return firebase.auth().currentUser.uid
    },
    getListToDo () {
      this.$bindAsArray('todos', todoRef.child(`${this.currentUserId}`))
    }
  }
}
</script>
<style scoped>
  .min-height {
    min-height: 150px;
  }
  button {
    padding: 10px 20px;
    backgroud: #42b938;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    outline: 0;
    cursor: pointer;
  }

  .card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
  }

  .card-ghost-drop{
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
  }
</style>
