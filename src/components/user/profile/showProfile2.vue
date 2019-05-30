<template>
  <div>
    <div class="container-fluid-base">
      <div class="my-1 py-3 bg-white">
        <div class="container pb-5">
          <div class="row">
            <div class="text-center mt-2 col-7 d-flex justify-content-end">
              <div>
                <img src="../../../assets/images/logoColor.png" class="logo-landing">
              </div>
            </div>
            <div class="d-flex col-5 justify-content-center aling-items-center pt-2">
              <router-link :to="{name: 'Profile'}" class="ml-auto back-button">
                <img src="../../../assets/images/closered.png" class="back-button">
              </router-link>
            </div>
          </div>
          <div class="row container">
            <div class="">
              <img v-if="!image" class="img-profile" src="../../../assets/images/profile_empty.png" alt="profile">
              <!-- {{image}} -->
              <img v-if="image" class="img-profile" :src="image" alt="profile">
            </div>
            <div class="w-50 ml-2 title-1">
              <b>{{profile.name}} {{lastName}}</b>
              <p class="text-secondary title-2">Apparel/Fashion</p>
              <div class="d-flex p-0 col-12 col-md-5">
                <a v-if="profile.website" :href="profile.website" class="text-secondary mr-3 icon-social">
                  <i class="fas fa-link"></i>
                </a>
                <a v-if="profile.twitter" :href="profile.twitter" target="_blank" class="text-secondary mr-3 icon-social">
                  <i class="fab fa-twitter"></i>
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
            <button to="{name: 'Edit'}" class="btn-primary mt-3 font-weight-bold py-2 text-center title-2" >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    GET_PROFILE_REQUEST
  } from "../../../store/modules/profile";
  export default {
    mounted() {
      this.getProfile();
    },
    data() {
      return {
        image: '',
        profile: {}
      }
    },
    methods: {
      getProfile: function () {
        let data = this.$route.params.idProfile;
        this.$store
          .dispatch(GET_PROFILE_REQUEST, data)
          .then(response => {
            this.profile = response.data.profile;
            console.log(this.profile)
            this.image = this.profile.image
            console.log
          })
          .catch(err => {
            console.dir(err);
          });
      }
    }
  };

</script>
