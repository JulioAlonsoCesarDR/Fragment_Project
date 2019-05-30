<template>
  <div class="">
    <div class="container-login">
      <div class="d-flex flex-column justify-content-between w-100" style="height: 85vh;">
        <div class="text-center">
          <img src="../../assets/images/logo.png" class="logo-login"/>
        </div>
        <form class="text-center woke-form" @submit.prevent="signIn">
          <div class="d-flex flex-column justify-content-between">
            <div class=" form-group text-center">
              <div>
                <label class=" label-input ">Email</label>
                <input class="form-control input-login" v-model="login.email" id="useremal" placeholder="janedoe@example.com">
                <div :class="{active: login.validate}" class="invalid-feedback-login">
                    Username does not exist
                </div>
                <!-- <div :class="validateEmail" class="invalid-feedback-login">
                    Invalid Email
                </div> -->
                <label class=" label-input mt-2">Password</label>
                <input type="password" class="form-control input-login" v-model="login.password" placeholder="******">
                <div :class="{active: login.validate}" class="invalid-feedback-login">
                  Incorrect password
                </div>
              </div>
            </div>
            <div class="btns-login">
              <button type="submit" :disabled="validateLogin" class="btn btn-login" >Log in</button>
              <br>
              <b-btn v-b-modal.modal-register class="btn btn-newuser mt-3">Create an Account</b-btn>
            </div>
          </div>
        </form>
      </div>
      <footer style="position: absolute; bottom: 0; width: 100% ">
        <div class="icon-social align-items-center ">
        <div class="col-12 d-flex justify-content-center align-items-center flex-column">
          <span v-b-modal.modal-forgot class="forgot validate">I forgot my password</span>
          <ul class="list-inline mt-4">
            <li class="list-inline-item">
              <a href="#" class="text-white">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#" class="text-white">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#" class="text-white">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#" class="text-white">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
        </div>
      </footer>
    </div>
    <div>
      <b-modal id="modal-register" class="modal-home centered-modal" size="lg">
        <div class="text-center title">
          <h6><b>Create an Account</b></h6>
          <p :class="validateData" class="invalid-feedback text-center" style="font-size:15px; padding:0;">Please fill in all available fields.</p>
        </div>
        <form class="d-flex flex-column form-register"  @submit.prevent="register">
          <label>First Name</label>
          <input  v-model="user.name" type="text" placeholder="Jane"/>
            <div :class="validateName" class="invalid-feedback">Only letters please</div>
          <label >Last Name</label>
          <input  v-model="user.fathers_last" type="text" placeholder="Doe"/>
            <div :class="validateLast" class="invalid-feedback">Only letters please</div>
          <label >Username</label>
          <input  v-model="user.username" type="text" placeholder="@janedoe"/>
            <div class="invalid-feedback">Username taken</div>
          <label >Email</label>
          <input  v-model="user.email" placeholder="jane.doe@mail.com"/>
            <div  class="invalid-feedback">This email was already used</div>
          <label >Password</label>
          <input  v-model="user.password" type="password" placeholder="*******"/>
            <small :class="validatePass" class="minim">Minimum 8 characters</small>
          <label >Confirm Password</label>
          <input  v-model="user.passwordConfirmation" type="password" placeholder="*******"/>
            <div :class="validateConfirm" class="invalid-feedback">Password does not match</div>
            <p class="terms">By creating an account you agree to our <a href="#" data-toggle="modal" data-target="#modalterms">Terms and Conditions</a> and <a href="#" data-toggle="modal" data-target="#modalprivacy">Privacy Policy</a></p>
          <div class="text-center col-12 mb-2">
            <b-btn :disabled="validated" type="submit" v-b-modal.modal-register class="btn btn-newuser mt-3">Create an Account</b-btn>
          </div>
        </form>
      </b-modal>
      <b-modal id="modal-forgot" class="modal-home centered-modal">
        <div class="text-center title">
          <h6><b>Recover your password </b></h6>
        </div>
        <form class="d-flex flex-column mt-3"  @submit.prevent="register">
          <input required v-model="user.name" type="email" class="text-center" placeholder="name@myemail.com"/>
          <div class="d-flex align-items-center justify-content-center">
            <p class="text-center px-2">
              <br>
              We will be sending you an email <br>
              shortly with instructions on how to <br>
              recover your password. <br>
            </p>
          </div>
          <div class="text-center pb-3">
            <hr>
            <span class="title"><b>OK</b></span>
          </div>
        </form>
      </b-modal>
    </div>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="light"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      <span>Incorrect password or Username does not exist</span>
    </b-alert>
  </div>
</template>

<script>
import { NEW_USER_REQUEST, SIGN_IN_REQUEST } from "../../store/modules/auth";

export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
        validate: false,
        // validateEmail: false
      },
      user: {
        name: "",
        fathers_last: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      errors: {
        name: "",
        fathers_last: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        fullInfo: ""
      },
      validated: true,

      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  computed: {
    validateLogin: function(){
      if (this.login.email && this.login.password) {
        return false;
      }
        return true;
    },
    // validateEmail: function(){
    //   if (!this.login.email) {
    //     return "";
    //   } else if (!this.login.email.match(/^\w+@\w+\..{2,3}(.{2,3})?$/)){
    //     return "active";
    //   }
    //     return ""
    // },
    validateName: function() {
      if (this.user.name && !this.user.name.match(/^[A-Za-z]+$/)) {
        return "active";
      }
      return "";
    },
    validateLast: function() {
      if (this.user.fathers_last && !this.user.fathers_last.match(/^[A-Za-z]+$/)) {
        return "active";
      }
      return "";
    },
    validatePass: function() {
      if (this.user.password && !this.user.password.length >= 8) {
        return "active";
      }
      return "";
    },
    validateConfirm: function() {
      if (this.user.passwordConfirmation !== this.user.password) {
        return "active";
      }
      return "";
    },
    validateData: function() {
      if (
        !this.user.name ||
        !this.user.fathers_last ||
        !this.user.username ||
        !this.user.email ||
        !this.user.password ||
        !this.user.passwordConfirmation
      ) {
        this.validated = true;
        return "active";
      } else {
        this.validated = false;
        return "";
      }
      if (this.user.email.match(/^\w+@\w+\..{2,3}(.{2,3})?$/)
      || !this.user.password
      || !this.user.passwordConfirmation){
        this.validated = true;
      }
    }
  },
  methods: {
    register: function() {
      const {
        name,
        fathers_last,
        username,
        email,
        password,
        passwordConfirmation,
        invite_token
      } = this.user;
      let data = {
        app_user: {
          name,
          fathers_last,
          full_name: name + fathers_last,
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
          invite_token:this.$route.query.invite_token
        }
      };
      if (
        this.user.name ||
        this.user.fathers_last ||
        this.user.username ||
        this.user.email ||
        this.user.password ||
        this.user.passwordConfirmation
      ) {
        this.validated = false;
        this.$store
          .dispatch(NEW_USER_REQUEST, data)
          .then(() => {
            this.$router.push("/profile");
          })
          .catch(err => console.dir(err.response.status));
        return;
      } else {
      }
    },

    signIn: function() {
      const { email, password } = this.login;
      const data = {
        email,
        password
      };
      this.$store
        .dispatch(SIGN_IN_REQUEST, data)
        .then((response) => {
          this.$router.push("/profile");
        })
        .catch(err => {
          this.showAlert()
          this.login.password ="";
          this.dismissCountDown = this.dismissSecs
          console.dir(err.response.status);
        });
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
};
</script>
