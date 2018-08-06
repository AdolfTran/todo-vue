<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <i class='plus icon'></i>
    </button>
    <modal name="modal-create-todo" class='content'>
        <div class='ui form'>
          <div class='field'>
            <label class="label">Title</label>
            <input v-model="item.titleText" type='text' ref='title'>
          </div>
          <div class='field'>
            <label class="label">Project</label>
            <textarea type='text' v-model="item.projectText" ref='project' defaultValue="" :rows="3" :amax-rows="6"></textarea>
          </div>
          <div class='field'>
            <label class="label">Date</label>
            <input v-model="item.dueDate" type='date' ref='date'>
          </div>
          <div class='ui btn row'>
            <button class='ui blue button col-lg-4' v-on:click="sendForm">
              Create
            </button>
            <button class='ui red button col-lg-4 col-lg-offset-1' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
    </modal>
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
      this.$modal.show('modal-create-todo')
    },
    closeForm () {
      this.$modal.hide('modal-create-todo')
    },
    sendForm () {
      if (this.item.titleText) {
        this.item.createDate = moment().unix()
        this.addNewTodo()
      }
      this.$modal.hide('modal-create-todo')
    },
    getUserId () {
      return firebase.auth().currentUser.uid
    },
    addNewTodo () {
      todoRef.child(this.currentUserId).push(this.item, () => {
        console.log('success')
        this.item.titleText = ''
        this.item.projectText = ''
        this.item.createDate = ''
        this.item.dueDate = ''
      })
    }
  }
}
</script>
<style>
  .v--modal-box{
    top: 210px !important;
    height: 400px !important;
  }
  .form {
    width: 80%;
    margin: 40px auto;
  }
  .label{
    font-size: 1.5rem !important;
    margin-bottom: 10px!important;
  }
  .btn{
    margin-top: 10px;
    width: 100% !important;
  }
</style>
