<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <i class='plus icon'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input v-model="item.titleText" type='text' ref='title' defaultValue="">
          </div>
          <div class='field'>
            <label>Project</label>
            <textarea type='text' v-model="item.projectText" ref='project' defaultValue="" :rows="3" :amax-rows="6"></textarea>
          </div>
          <div class='field'>
            <label>Title</label>
            <input v-model="item.dueDate" type='date' ref='title'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase, {todoRef} from '@/firebase'
export default {
  data () {
    return {
      isCreating: false,
      currentUserId: '',
      item: {
        titleText: '',
        projectText: '',
        status: 0,
        createDate: '',
        dueDate: '',
        progress: 0
      }
    }
  },
  created () {
    this.currentUserId = this.getUserId()
  },
  methods: {
    openForm () {
      this.isCreating = true
    },
    closeForm () {
      this.isCreating = false
    },
    sendForm () {
      if (this.item.titleText) {
        this.item.createDate = moment().unix()
        this.addNewTodo()
      }
      this.isCreating = false
    },
    getUserId () {
      return firebase.auth().currentUser.uid
    },
    addNewTodo () {
      todoRef.child(this.currentUserId).push(this.item, () => {
        console.log('success')
      })
    }
  }
}
</script>
