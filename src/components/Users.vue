<template>
<div class="ui container">
  <div class="user_title">User list</div>
  <table class="ui compact celled definition table">
    <thead class="full-width">
      <tr>
        <th v-for="column in columns">
          {{column}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(input, key) in persons" :key="key">
        <td>{{key}}</td>
        <td>
          {{input.lname}}
        </td>
        <td>
          {{input.fname}}
        </td>
        <td>
          {{input.age}} years
        </td>
        <td>
          {{input.job}}
        </td>
        <td>
          {{input.address}}
        </td>
        <td>
          <button class="ui yellow button" @click="edit(key)">
            <div class="icon_box">
              <i class="edit icon"></i>
            </div>
          </button>
          <!-- <button class="ui orange button">
            <div class="icon_box">
              <i class="archive icon">
              </i>
            </div>
          </button> -->
          <button class="ui red button" @click="delete_list_user(key)">
            <div class="icon_box">
              <i class="minus icon">
              </i>
            </div>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <table>
    <tbody>
      <tr>
        <td>
          <sui-form equal-width>
            <sui-form-fields>
              <sui-form-field>
                <input type="text" ref="lname" v-model="input.lname" id="lname" required />
                <label>Last Name1</label>
              </sui-form-field>
              <sui-form-field>
                <input type="text" v-model="input.fname" id="fname" required />
                <label>First name</label>
              </sui-form-field>
              <sui-form-field>
                <input type="text" v-model="input.age" id="age" required />
                <label>Age</label>
              </sui-form-field>
              <sui-form-field>
                <input type="text" v-model="input.job" id="job" required />
                <label>Job</label>
              </sui-form-field>
              <sui-form-field>
                <input v-model="input.address" id="address" type="text" required />
                <label>address</label>
              </sui-form-field>
            </sui-form-fields>
          </sui-form>
        </td>
        <td style="padding-left: 20px;padding-top: 10px;">
          <i class="plus big green icon" @click="add"></i>
        </td>
      </tr>
    </tbody>
  </table>
  <br />

  <table class="ui compact celled definition table" v-show="bin.length">
    <thead class="full-width">
      <tr>
        <th v-for="column in columns">
          {{column}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(person,key) in bin">
        <td>{{key}}</td>
        <td>
          {{person.lname}}
        </td>
        <td>
          {{person.fname}}
        </td>
        <td>
          {{person.age}} years
        </td>
        <td>
          {{person.job}}
        </td>
        <td>
          {{person.address}}
        </td>
        <td>
          <button class="ui yellow button" @click="restore(key)"><i class="undo icon"></i></button>
          <button class="ui red button" @click="delete_archive_user(key)"><i class="minus icon"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

  <sui-modal v-model="open">
    <sui-modal-header>Edit User</sui-modal-header>
    <sui-modal-content scrolling image>
      <sui-modal-description>
        <sui-header>User Profile</sui-header>
        <sui-form equal-width>
          <sui-form-fields>
            <sui-form-field>
              <input id="last_name" type="text" v-model="editInput.lname" required />
              <label>Last Name</label>
            </sui-form-field>
            <sui-form-field>
              <input id="first_name" type="text" v-model="editInput.fname" required />
              <label>First Name</label>
            </sui-form-field>
          </sui-form-fields>
          <sui-form-fields>
            <sui-form-field>
              <input id="edit_age" type="text" v-model="editInput.age" required />
              <label>Age</label>
            </sui-form-field>
            <sui-form-field>
              <input id="edit_job" type="text" v-model="editInput.job" required />
              <label>Job</label>
            </sui-form-field>
          </sui-form-fields>
          <sui-form-fields>
            <sui-form-field>
              <input id="edit_address" type="text" v-model="editInput.address" required />
              <label>address</label>
            </sui-form-field>
          </sui-form-fields>
        </sui-form>
      </sui-modal-description>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button @click="updateUser()" positive @click.native="toggle">OK</sui-button>
    </sui-modal-actions>
  </sui-modal>

</div>
</template>

<script>
import firebase_root from '../Firebase'

export default {
  data() {
    return {
      columns: ['ID', 'Last Name', 'First Name', 'Age', 'Job', 'Address', 'Actions'],
      persons: [],
      bin: [],
      current_id: "",
      input: {
        lname: "",
        fname: "",
        age: "",
        job: "",
        address: ""
      },
      editInput: {
        lname: "",
        fname: "",
        age: "",
        job: "",
        address: ""
      },
      open: false,
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    add() {
      firebase_root.ref('users').push({
          lname: this.input.lname,
          fname: this.input.fname,
          age: this.input.age,
          job: this.input.job,
          address: this.input.address
        })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        });

      for (var key in this.input) {
        this.input[key] = '';
      }
    },
    edit(key) {
      this.open = !this.open;
      this.editInput = this.persons[key];
      this.current_id = key;
      console.log(key);
    },
    updateUser() {
      firebase_root.ref('users/' + this.current_id).set(this.editInput)
    },
    delete_list_user(key) {
      firebase_root.ref('users/' + key).remove();
    },
    // archive: function (index) {
    //   this.bin.push(this.persons[index]);
    //   this.persons.splice(index, 1);
    // },
    // restore: function (index) {
    //   this.persons.push(this.bin[index]);
    //   this.bin.splice(index, 1);
    // },
    // delete_archive_user: function (index) {
    //   // console.log(this.bin[index]);
    //   this.bin.splice(index, 1);
    // },
  },
  created() {
    firebase_root.ref('users').on('value', (snapshot) => {

      this.persons = snapshot.val();
    });
  }
}
</script>

<style lang="scss">
.user_title {
  text-align: center;
  margin: 2em 1em;
  font-size: 2em
}

.ui.container {
  max-width: 768px;
}

.ui.button>.icon:not(.button) {
  height: .85714286em;
  opacity: 1;
}

.ui.form {
  .field {
    position: relative;
    width: 100%;

    &:not(.checkbox) {
      margin-top: 1rem;
      margin-bottom: 1.7rem;
    }

    label {
      color: lightgrey;
      position: absolute;
      left: .7rem;
      top: .7rem;
      transition: .2s ease-in;
    }

    input:not([type=checkbox]),
    textarea {
      background: transparent;
      border: none;
      border-bottom: 2px solid lightgrey;
      border-radius: 0;
      padding: .7rem;
      transition: .2s ease-in;

      &:focus~label,
      &:valid~label {
        color: grey;
        font-size: 80%;
        top: -1rem;
        left: 0;
      }

      &:focus {
        border-bottom: 2px solid dodgerblue;
        outline: none;
      }
    }
  }
}

.ui.form .field input:not([type=checkbox]):focus,
.ui.form .field textarea:focus {
  border-bottom: 2px solid dodgerblue;
  outline: none;
  border-radius: 0;
}

.ui.button .icon_box i.icon {
  margin: 0 0 0 0;
}
</style>
