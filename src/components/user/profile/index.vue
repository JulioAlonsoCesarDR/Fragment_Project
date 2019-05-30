<template>
  <div class="container-fluid-base">
    <div class="my-1 py-3 bg-white">
      <div class="container pb-5">
        <div class="text-center">
          <img src="../../../assets/images/logoColor.png" class="logo-landing" />
        </div>
       <div class="my-4 row px-3 align-items-center">
          <div class="">
            <img v-if="!profile.image" class="img-profile" src="../../../assets/images/profile_empty.png" alt="profile">
            <!-- {{image}} -->
            <img v-if="profile.image" class="img-profile" :src="profile.image" alt="profile">
          </div>
          <div class="w-50 ml-2 title-1">
            <b>{{profile.name}} {{profile.fathers_last}}</b>
            <p class="text-secondary title-2">
              {{getIndustry(profile.industry)}}
            </p>
            <div class="d-flex p-0 col-12 col-md-5">
              <a v-if="profile.website" :href="profile.website" class="text-secondary mr-3 icon-social">
                <i class="fas fa-link"></i>
              </a>
              <a v-if="profile.twitter" :href="profile.twitter" target="_blank" class="text-secondary mr-3 icon-social">
                <i  class="fab fa-twitter"></i>
              </a>
              <a v-if="profile.facebook" :href="profile.facebook" target="_blank" class="text-secondary mr-3 icon-social">
                <i class="fab fa-facebook"></i>
              </a>
              <a v-if="profile.instagram" :href="profile.instagram" target="_blank" class="text-secondary mr-3 icon-social">
                <i class="fab fa-instagram"></i>
              </a>
              <a v-if="profile.linked_in" :href="profile.linked_in" target="_blank" class="text-secondary mr-3 icon-social">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a v-if="profile.behance" :href="profile.behance" target="_blank" class="text-secondary mr-3 icon-social">
                <i class="fab fa-behance"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <router-link :to="{name: 'Edit'}" class="btn-edit-profile font-weight-bold py-2 text-center title-2" >
            Edit Profile
          </router-link>
        </div>
        <br>
        <div class="About">
          <b class="title-3">About</b>
          <p class="title-2">
            {{profile.description}}
          </p>
        </div>
        <div class="Ratings">
          <div class="d-flex justify-content-between align-items-center">
            <p><b class="title-3">Ratings &#38; Reviews</b></p>
            <p v-b-toggle.collapse-rating @click="actionToggle = !actionToggle">
              <span v-if="actionToggle"  class="text-primary title-3">See more</span>
              <span v-if="!actionToggle" class="text-primary title-3">See less</span>
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3 class="bigtxt">4.3 <small class="title-5 text-secundary">out of 5</small></h3>
            </div>
            <small class="title-5 text-secundary">137 Ratings</small>
          </div>
          <div class="jumbotron">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-2">
                <p class="m-0 p-0"><b class="title-2">Shasha Veulor</b></p>
                <p class="text-secundary text-profile m-0 p-0">02/17/19</p>
              </div>
              <div>
                <rate :length="5" v-model="myRate"/>
                <br>
              </div>
            </div>
            <br>
            <p class="text-secundary title-2 m-0">Sasha Velour 02/17/19 Many of us likely think of reviewers as not being composed of qualitative
              information: users tell their experiences with a product, and those descriptions are read by
              other users interested in buying the same product.
            </p>
          </div>
          <b-collapse id="collapse-rating">
            <div class="jumbotron">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="m-0 p-0"><b class="title-2">Shasha Veulor</b></p>
                  <p class="text-secundary text-profile m-0 p-0">02/17/19</p>
                </div>
                <div>
                  <rate :length="5" v-model="myRate"/>
                  <br>
                </div>
              </div>
              <br>
              <p class="text-secundary title-2 m-0">Sasha Velour 02/17/19 Many of us likely think of reviewers as not being composed of qualitative
                information: users tell their experiences with a product, and those descriptions are read by
                other users interested in buying the same product.
              </p>
            </div>

            <div class="d-flex justify-content-center mb-5">
              <a class="btn-edit-profile py-2 text-center title-2 font-weight-bold" >
                See all
              </a>
            </div>
          </b-collapse>

        </div>
        <div class="professional">
          <div class="d-flex justify-content-between align-items-center">
            <p v-b-toggle.collapseProfessional @click="showProfessional = !showProfessional" class=" pointer title-1 mb-5"><b>Professional</b></p>
            <p v-if="!showProfessional" class="m-0 mb-5"> <i @click="showProfessional = !showProfessional" v-b-toggle.collapseProfessional class=" pointer fas fa-chevron-down title-profile"></i></p>
            <p v-if="showProfessional" class="m-0 mb-5"> <i @click="showProfessional = !showProfessional" v-b-toggle.collapseProfessional class=" pointer fas fa-chevron-up title-profile"></i></p>
          </div>
          <b-collapse b-collapse  id="collapseProfessional">
            <professional :profile="profile" :showSlider="showProfessional"/>
            <portfolio :profile="profile"/>
            <curiculum :academic="profile.academic_formations" :recommendations="profile.recommendations" :experiences="profile.experiences" />
          </b-collapse>
        </div>

        <div class="office">
          <div class="d-flex justify-content-between align-items-center">
            <p v-b-toggle.collapseOffice @click="showOffice = !showOffice" class=" pointer title-1 mb-5"><b>My Office</b></p>
            <p v-if="!showOffice" class="m-0 mb-5"> <i @click="showOffice = !showOffice" v-b-toggle.collapseOffice class=" pointer fas fa-chevron-down title-profile"></i></p>
            <p v-if="showOffice" class="m-0 mb-5"> <i @click="showOffice = !showOffice" v-b-toggle.collapseOffice class=" pointer fas fa-chevron-up title-profile"></i></p>
          </div>

          <b-collapse b-collapse  id="collapseOffice">
            <office></office>
          </b-collapse>
        </div>

        <div class="cluster">
          <div class="d-flex justify-content-between align-items-center">
            <p v-b-toggle.collapseCluster @click="showCluster = !showCluster" class="pointer title-1 mb-5"><b>My Cluster</b></p>
            <p v-if="showCluster" class="m-0 mb-5"> <i @click="showCluster = !showCluster" v-b-toggle.collapseCluster class="pointer fas fa-chevron-down title-profile"></i></p>
            <p v-if="!showCluster" class="m-0 mb-5"> <i @click="showCluster = !showCluster" v-b-toggle.collapseCluster class="pointer fas fa-chevron-up title-profile"></i></p>
          </div>

          <b-collapse b-collapse visible id="collapseCluster">
            <cluster :profile="profile" />
          </b-collapse>
        </div>

      </div>
  <b class="pt-5 mt-5 pointer" @click="logout">Logout</b>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  LOGOUT_REQUEST,
  PERSISTENCE_SESSION
} from "../../../store/modules/auth";
// import {  } from "../../../store/modules/auth";


import Professional from "../professional/professional";
import Portfolio from "../professional/portfolio";
import Curiculum from "../professional/curriculum";
import Cluster from "../cluster/cluster";
import Office from "../office/office";
import profile,{ UPDATE_USER_REQUEST,GET_PROFILE_REQUEST } from "../../../store/modules/profile";
import recommendations from '../../../store/modules/recommendations';

export default {
  name: "Profile",

  components: {
    Professional,
    Portfolio,
    Curiculum,
    Cluster,
    Office,
    profilePro: {}
  },

  computed: mapState({
    profile: state => state.auth.response.app_user.profile,
  }),

   data() {
    return {
      myRate: 4,
      actionToggle: true,
      showProfessional: false,
      showOffice: false,
      showCluster: false,
      HomeProfile: null,
      isLoading: false,
      fullPage: true,
      optionsIndustry: [
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
        { text: "Foundations, Philanthropy & Non-Profits", value: 27 },
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
        { text: "Marketing, advertising & PR", value: 48 },
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
      optionsCategories: [
        {"text":"Web & App Development", "value": 1},
        {"text":"Software Development", "value": 2},
        {"text":"Information Technology", "value": 3},
        {"text":"Data Science & Annalytics", "value": 4},
        {"text":"Engeneering", "value": 5},
        {"text":"Architecture & Interior design", "value": 6},
        {"text":"Industrial & Product Design", "value": 7},
        {"text":"Graphic Design & Branding", "value": 8},
        {"text":"Video Production & Animation", "value": 9},
        {"text":"Audio Production", "value": 10},
        {"text":"Web & Mobile Design", "value": 11},
        {"text":"Fashion & Textile Design", "value": 12},
        {"text":"Writing, Editing & Translation", "value": 13},
        {"text":"Legal", "value": 14},
        {"text":"Business Administration & Innovation", "value": 15},
        {"text":"Sales & Marketing", "value": 16},
        {"text":"Accounting", "value": 17},
        {"text":"Consulting & Research", "value": 18},
      ],
      // profile: {}
    };
  },
  mounted() {
    this.getIndustry();
    this.getProfile();
  },

  methods: {
    logout: function() {
      this.$store
        .dispatch(LOGOUT_REQUEST)
        .then(() => {
          window.localStorage.removeItem('vuex')
          window.localStorage.clear();
          setTimeout(function(){
            // this.$router.push("/login");
            location.reload();
           }, 100);
        })
        .catch(err => {
          console.log(err);
        });
    },
    savepUdate: function() {
      const data = {
        idProfile: this.id,
        profile: this.profile
      };
      this.$store
        .dispatch(UPDATE_USER_REQUEST, data)
        .then(() => {

        })
        .catch(err => {
          console.dir(err.response.status);
        });
    },
    getIndustry: function(id){
      if(id){
        var industries = this.optionsIndustry
        var result = industries.find( industy => industy.value == id );
        return result.text
      }
      return
    },
    getProfile: function() {
      this.$store.dispatch(PERSISTENCE_SESSION)
      .then((response) => {

      })
      .catch(err => {
        this.login.validate = true
        console.dir(err.response.status);
      })
    }
  }
};
</script>
