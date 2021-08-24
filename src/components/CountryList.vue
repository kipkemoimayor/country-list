<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="county-list">
          <h4>All countries</h4>
          <div class="search">
            <input
              name="search-country"
              placeholder="Search country "
              type="text"
              v-model="searchValue"
              @keyup="searchCountry(searchValue)"
            />
          </div>

          <div class="countries">
            <ul>
              <li
                v-for="country in filteredCountries"
                :key="country.name"
                title="Click to view"
                @click="selectCountry(country)"
              >
                {{ country?.name }}
                <img class="county-img" v-bind:src="country?.flag" alt="name" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="country-details">
          <h4>Country Details</h4>
          <div class="card">
            <div class="header">
              <h3>{{ selectedCountry?.name }}</h3>
            </div>
            <div class="body">
              <img
                class="card-img"
                v-bind:src="selectedCountry?.flag"
                alt="name"
              />
              <div class="details">
                <p>
                  Capital City <strong>{{ selectedCountry?.capital }}</strong>
                </p>
                <p>
                  Region <strong>{{ selectedCountry?.region }}</strong>
                </p>
              </div>

              <div class="validate-phone">
                <p>
                  <small>Validate phone number</small>
                  <span
                    class="valid"
                    v-bind:class="{
                      'valid-valid': isPhoneValid,
                      'valid-error': isPhoneValid === false,
                    }"
                  >
                    {{ isPhoneValid ? "valid" : "invalid" }}</span
                  >
                </p>
                <vue-tel-input
                  v-model="phone"
                  mode="international"
                  ref="telInput"
                  @validate="validate"
                ></vue-tel-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import fetchCountries from "../utils/dataService";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

export default {
  name: "CountyList",
  props: {
    msg: String,
  },
  components: {
    VueTelInput,
  },
  mounted() {
    fetchCountries().then((response) => {
      this.countries = response;
      this.filteredCountries = response;
    });
  },
  data: function () {
    const countries = [];
    const selectedCountry = {};
    const filteredCountries = {};
    const searchValue = "";
    const phoneNumber = "";
    const isPhoneValid = null;
    return {
      countries,
      selectedCountry,
      filteredCountries,
      searchValue,
      phoneNumber,
      isPhoneValid,
    };
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country;
      const countryCode = this.selectedCountry.alpha2Code.toLowerCase();
      this.$refs.telInput.choose(countryCode);
    },

    searchCountry(searchValue) {
      searchValue = searchValue.trim().toLowerCase();
      const foundCountries = this.countries.filter((country) => {
        return country.name.toLowerCase().includes(searchValue);
      });
      this.filteredCountries = foundCountries;
    },

    validate(status) {
      this.isPhoneValid = status.valid;
    },
  },
  setup() {
    const phone = ref(null);
    // const selectedCountryCode=[];

    return {
      phone,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.countries {
  height: 80vh;
  max-height: 80vh;
  overflow-y: auto;
}

.container {
  width: 98%;
}
.row {
  display: flex;
  flex-direction: row;
}

.col-md-6 {
  width: 50%;
}

ul {
  list-style-type: none;
}

ul > li {
  padding: 0.6em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

ul > li:hover {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.county-img {
  height: 20px;
  width: 20px;
}

.card-img {
  height: 150px;
}

.county-list h4,
.country-details,
.search {
  text-align: center;
}

.card {
  padding: 0.3em;
  margin: 5em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 1px 1px 0 1px rgba(0, 0, 0, 0.1);
}

.search input {
  padding: 0.6em;
  border: 1px solid rgb(105, 189, 161);
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url("../assets/search.png");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}

.valid {
  padding: 0.4em;
  border-radius: 4px;
  margin: 0.5em;
  color: white;
}

.valid-error {
  background-color: rgb(185, 100, 100);
}

.valid-valid {
  background-color: rgb(56, 126, 65);
}

@media screen and (max-width: 512px) {
  .container {
    width: 100%;
  }
  .row {
    flex-direction: column;
  }

  .col-md-6 {
    width: 100%;
  }

  .country-details {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }

  .card {
    margin: 0;
    padding: 0;
  }

  .card-img {
    height: 50px;
  }
}
</style>
