<template>
  <base-dialog :show="!!error" title="An error occurred !!!" @close="hidepopup">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Requests Received</h2>
      <base-spinner v-if="isLoading"></base-spinner>
      <header>
        <ul v-if="hasRequests && !isLoading">
          <requests-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></requests-item>
        </ul>
        <h3 v-else>You have not received any requests yet !</h3>
      </header>
    </base-card>
  </section>
</template>


<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
import RequestsItem from './../../components/requests/RequestsItem.vue';

export default {
  components: { RequestsItem, BaseDialog },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.fetchRequests();
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    hidepopup() {
      this.error = null;
    },
    async fetchRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong !!!';
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>