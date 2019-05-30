<template>
  <div class="container-fluid-base edit-profile">
    <div class="bg-white  my-1 py-3">
      <div class="container-fluid d-flex justify-content-between">
          <div class="text-center ml-auto mr-auto">
            <img src="../../../assets/images/logoColor.png" class="logo-landing" />
          </div>
          <div>
            <router-link :to="{name: 'Profile'}" class=" back-button ">

              <img src="../../../assets/images/closered.png" class="back-button">
            </router-link>
          </div>
        </div>
      <!-- <div class="d-flex align-items-center justify-content-center header-detail">
        <div class="text-center img-logo ml-auto">
          <img src="../../../assets/images/logoColor.png" class="logo-landing" />
        </div>
        <router-link :to="{name: 'Profile'}" class="ml-auto back-button" >
          <img src="../../../assets/images/closered.png" class="back-button" />
        </router-link>
      </div> -->
      <div class="container">
        <!-- <button v-on:click="savepUdate">update</button> -->
        <div class="col-12 my-5">
          <!-- <div class="text-center">
            <img v-if="!profile.image" class="img-profile" src="../../../assets/images/add_profile.png" alt="profile">
          </div> -->
          <div class="d-flex justify-content-center">
            <div v-if="!profile.image">
            <base64-upload
              :imageSrc="img_blank"
              :imageStyle="{'border-radius': '100%','width':'8rem','height':'8rem'}"
              @change="onChangeImage">
            </base64-upload>
            </div>
            <div v-else>
              <base64-upload
                :imageSrc="profile.image"
                :imageStyle="{'border-radius': '100%','width':'8rem','height':'8rem'}"
                @change="onChangeImage">
              </base64-upload>
            </div>

            <!-- <vue-base64-file-upload
              class="v1"
              accept="image/png,image/jpeg"
              image-class="v1-image"
              input-class="v1-image"
              file-name= "Change image"
              @load="onLoad" /> -->
          </div>
        </div>
        <form action="">
          <div class="form-group-edit">
            <label  class="title-2">First Name</label>
            <input disabled v-model="profile.name" type="text" class="col-12 title-2" aria-describedby="name" placeholder="Katya">

            <label for="" class="title-2">Last Name</label>
            <input disabled v-model="profile.fathers_last" type="text" class="col-12 title-2" aria-describedby="lastname" placeholder="Zamolodchikova">

            <label for="" class="title-2">About</label>
            <b-form-textarea
              placeholder="Tell us about you"
              v-model="profile.description"
              :rows="2"
              class="form-control text-area title-2">
            </b-form-textarea>

            <label for="" class="title-2">Industry</label>
            <select class="select-profile title-2" v-model="profile.industry">
              <option value="" selected disabled>Select industry</option>
              <option v-for="(option, index) in options" :value="option.value" :key="index">
                {{ option.text }}
              </option>
            </select>
            <div :class="validateIndustry" class="invalid-feedback">Select Industry</div>

            <label for="" class="title-2">Website</label>
            <input v-model="profile.website" type="text" class="col-12 title-2" aria-describedby="website" placeholder="http://www.yourwebsite.com">
            <div :class="validateUlrWebsite" class="invalid-feedback">URL invalid</div>

            <label for="" class="title-2">Facebook</label>
            <input v-model="profile.facebook" type="text" class="col-12 title-2" aria-describedby="face" placeholder="https://www.facebook.com/jane.doe">
            <div :class="validateUlrFb" class="invalid-feedback">URL invalid</div>

            <label for="" class="title-2">Instagram</label>
            <input v-model="profile.instagram" type="text" class="col-12 title-2" aria-describedby="insta" placeholder="https://www.instagram.com/jane.doe/">
            <div :class="validateUlrInstagram" class="invalid-feedback">URL invalid</div>

            <label for="" class="title-2">Twitter</label>
            <input v-model="profile.twitter" type="text" class="col-12 title-2" aria-describedby="twitter" placeholder="https://twitter.com/jane.doe">
            <div :class="validateUlrTwitter" class="invalid-feedback">URL invalid</div>

            <label for="" class="title-2">LinkedIn</label>
            <input v-model="profile.linked_in" type="text" class="col-12 title-2" aria-describedby="linkedin" placeholder="https://www.linkedin.com/in/jane_doe/">
            <div  :class="validateUlrLinkedIn" class="invalid-feedback">URL invalid</div>

            <label for="" class="title-2">Behance</label>
            <input v-model="profile.behance" type="text" class="col-12 title-2" aria-describedby="Behance" placeholder="https://www.behance.net/janedoe">
            <div :class="validateUlrBehance" class="invalid-feedback">URL invalid</div>
          </div>
        </form>
        <button @click="savepUdate" :disabled="validateSave" class="btn-save title-2 pointer">Save</button>
      </div>
    </div>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="light"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      <span>{{messageAlert}}</span>
    </b-alert>
    <div class="vld-parent">
      <loading :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"></loading>
    </div>

  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  UPDATE_USER_REQUEST,
} from "../../../store/modules/profile";
import Base64Upload from "vue-base64-upload";
import Loading from 'vue-loading-overlay';

export default {
  name: "Edit",
  components: {
    Base64Upload,
    Loading
  },
  data() {
    return {
      profile: {
        id: this.$store.state.auth.response.app_user.profile.id,
        name : this.$store.state.auth.response.app_user.profile.name,
        fathers_last: this.$store.state.auth.response.app_user.profile.fathers_last,
        industry: this.$store.state.auth.response.app_user.profile.industry,
        description: this.$store.state.auth.response.app_user.profile.description,
        website: this.$store.state.auth.response.app_user.profile.website,
        facebook: this.$store.state.auth.response.app_user.profile.facebook,
        instagram: this.$store.state.auth.response.app_user.profile.instagram,
        twitter: this.$store.state.auth.response.app_user.profile.twitter,
        linked_in: this.$store.state.auth.response.app_user.profile.linked_in,
        behance: this.$store.state.auth.response.app_user.profile.behance,
        image: this.$store.state.auth.response.app_user.profile.image,
      },
      imgBackground: '/static/img/add_profile.419daad.png',
      options: [
        { text: "Art", value: 1 },
        { text: "Accounting", value: 2 },
        { text: "Aerospace & Air Transport", value: 3 },
        { text: "Agriculture", value: 4 },
        { text: "Alcohol", value: 5 },
        { text: "Architecture", value: 6 },
        { text: "Automotive", value: 7 },
        { text: "Banking", value: 8 },
        { text: "Biology", value: 9 },
        { text: "Building & Construction", value: 10 },
        { text: "Creative", value: 11 },
        { text: "Chemical", value: 12 },
        { text: "Clothing", value: 13 },
        { text: "Communications", value: 14 },
        { text: "Computer Science", value: 15 },
        { text: "Consulting", value: 16 },
        { text: "Culture", value: 17 },
        { text: "Education", value: 18 },
        { text: "Electronics", value: 19 },
        { text: "Energy & Natural Resources", value: 20 },
        { text: "Engineering", value: 21 },
        { text: "Entertainment Industry", value: 22 },
        { text: "Environment", value: 23 },
        { text: "Farming", value: 24 },
        { text: "Finance", value: 25 },
        { text: "Food & Beverage", value: 26 },
        { text: "Foundations{}, Philanthropy & Non-Profits", value: 27 },
        { text: "Furniture", value: 28 },
        { text: "Gas & Oil", value: 29 },
        { text: "General Contractors", value: 30 },
        { text: "Government & Politics", value: 31 },
        { text: "Health", value: 32 },
        { text: "Hedge Funds", value: 33 },
        { text: "Hospitality", value: 34 },
        { text: "Human Rights", value: 35 },
        { text: "Human Resources", value: 36 },
        { text: "Imports & Exports", value: 37 },
        { text: "Information Technology", value: 38 },
        { text: "Insurance", value: 39 },
        { text: "Internet", value: 40 },
        { text: "International Affairs", value: 40 },
        { text: "Law Services", value: 42 },
        { text: "Livestock", value: 43 },
        { text: "Literature", value: 44 },
        { text: "Logistics", value: 45 },
        { text: "Luxury goods", value: 46 },
        { text: "Manufacturing", value: 47 },
        { text: "Marketing{}, advertising & PR", value: 48 },
        { text: "Medical Supplies", value: 49 },
        { text: "Mining", value: 50 },
        { text: "Miscellaneous", value: 51 },
        { text: "Nutrition & Diet", value: 52 },
        { text: "Other", value: 53 },
        { text: "Pharmaceutical", value: 54 },
        { text: "Politics", value: 55 },
        { text: "Printing & Publishing", value: 56 },
        { text: "Private Equity & Investment Firms", value: 57 },
        { text: "Real Estate", value: 58 },
        { text: "Religious Organizations", value: 59 },
        { text: "Retail Sales", value: 60 },
        { text: "Research", value: 61 },
        { text: "Security", value: 62 },
        { text: "Shipping", value: 63 },
        { text: "Sports", value: 64 },
        { text: "Telecom", value: 65 },
        { text: "Technology", value: 66 },
        { text: "Textiles", value: 67 },
        { text: "Transportation", value: 68 },
        { text: "Travel", value: 69 },
        { text: "Venture Capital", value: 70 }
      ],
      isLoading: false,
      fullPage: true,
      img_blank:require( "../../../assets/images/add_profile.png"),
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      messageAlert: 'Error to update Profile information',
    };
  },
  mounted() {
    this.validateImage();
  },
  computed: {
    validateUlrIndustry() {
      if (this.$data.profile.industry) {
        return "active";
      }
      return "";
    },
    validateUlrWebsite() {
      if (
        this.$data.profile.website &&
        !this.$data.profile.website.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )
      ) {
        return "active";
      }
      return "";
    },
    validateUlrFb() {
      if (
        this.$data.profile.facebook &&
        !this.$data.profile.facebook.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )
      ) {
        return "active";
      }
      return "";
    },
    validateUlrInstagram() {
      if (
        this.$data.profile.instagram &&
        !this.$data.profile.instagram.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )
      ) {
        return "active";
      }
      return "";
    },
    validateUlrTwitter() {
      if (
        this.$data.profile.twitter &&
        !this.$data.profile.twitter.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )
      ) {
        return "active";
      }
      return "";
    },
    validateUlrLinkedIn() {
      if (
        this.$data.profile.linked_in &&
        !this.$data.profile.linked_in.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )
      ) {
        return "active";
      }
      return "";
    },
    validateUlrBehance() {
      if (
        this.$data.profile.behance &&
        !this.$data.profile.behance.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )
      ) {
        return "active";
      }
      return "";
    },
    validateIndustry() {
      if (this.$data.profile.industry && this.$data.profile.industry <= 0) {
        return "active";
      }
      return "";
    },
    validateSave() {
      if( this.validateIndustry ||
          this.validateUlrWebsite ||
          this.validateUlrFb ||
          this.validateUlrTwitter ||
          this.validateUlrInstagram ||
          this.validateUlrLinkedIn ||
          this.validateUlrBehance ||
          this.validateIndustry  == "active") {
            return true
      }
      return false
    },

  },

  methods: {
    validateImage: function() {
      if(this.$store.state.auth.response.app_user.profile.image){
        this.imgBackground = this.$store.state.auth.response.app_user.profile.image
      }
    },
    savepUdate: function(){
      let data = {
        profile: this.profile
      }
      this.isLoading = true
      let isLoad = this.isLoading
      this.$store
      .dispatch(UPDATE_USER_REQUEST, data)
      .then((response) => {
        debugger
        this.isLoad = false
        this.$router.push("/profile");
      })
      .catch(err => {
        console.dir(err.response.status);
        this.showAlert()
        this.isLoading = false
      });
     },
    onChangeImage: function(file) {
      this.profile.image = "data:" + file.type + ";base64," + file.base64;
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
