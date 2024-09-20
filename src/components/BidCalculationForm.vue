<template>
  <div class="container">
    <div class="card">
      <div class="title">
        <img src="@/assets/logo.png" alt="Logo" class="logo-title" />
        <span class="title-text">
          <i class="fas fa-calculator"></i> Bid Calculation Tool
        </span>
      </div>

      <form @submit.prevent>
        <div class="form-group">
          <label for="basePrice">
            <i class="fas fa-dollar-sign"></i> Vehicle Base Price
          </label>
          <input 
            v-model.number="basePrice" 
            id="basePrice" 
            type="number" 
            required 
            placeholder="Enter price in USD"
            class="input-field"
            @input="clearResult"
          />
        </div>

        <div class="form-group">
          <label for="vehicleType">
            <i class="fas fa-car"></i> Vehicle Type
          </label>
          <select v-model="vehicleType" id="vehicleType" class="input-field" required>
            <option value="Common">Common</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div v-if="error" class="error-msg">
          <p>{{ error }}</p>
        </div>

        <div class="results" :class="{ hidden: !result }">
          <h2 class="subtitle">
            <i class="fas fa-receipt"></i> Fees Breakdown
          </h2>
          <p v-if="result">Basic Buyer Fee: <span>${{ result.fees.basicBuyerFee.toFixed(2) }}</span></p>
          <p v-if="result">Special Fee: <span>${{ result.fees.specialFee.toFixed(2) }}</span></p>
          <p v-if="result">Association Fee: <span>${{ result.fees.associationFee.toFixed(2) }}</span></p>
          <p v-if="result">Storage Fee: <span>${{ result.fees.storageFee.toFixed(2) }}</span></p>
          <h3 class="total" v-if="result">
            <i class="fas fa-dollar-sign"></i> Total Cost: <span>${{ result.totalCost.toFixed(2) }}</span>
          </h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { calculateFees } from '../services/apiService';
import debounce from 'lodash.debounce';

export default {
  data() {
    return {
      basePrice: null,
      vehicleType: 'Common',
      result: null,
      isLoading: false,
      error: null,
    };
  },
  watch: {
    basePrice: 'debouncedCalculate',
    vehicleType: 'debouncedCalculate',
  },
  methods: {
    debouncedCalculate: debounce(function () {
      this.calculate();
    }, 500),

    async calculate() {
      if (!this.basePrice || this.basePrice === 0) {
        this.result = null;
        return;
      }

      this.isLoading = true;
      this.error = null;
      this.result = null;

      try {
        const response = await calculateFees(this.basePrice, this.vehicleType);
        this.result = response.data;
      } catch (error) {
        this.handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },

    clearResult() {
      if (!this.basePrice) {
        this.result = null;
      }
    },

    handleApiError(error) {
      if (error.response && error.response.status === 404) {
        this.error = 'Route not found. Please check the backend API.';
      } else if (error.code === 'ECONNABORTED') {
        this.error = 'Request timed out. Please try again later.';
      } else {
        this.error = 'Failed to calculate fees. Please try again later.';
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/Auction.jpg'); 
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat; 
  padding: 20px;
}
.logo-title {
  max-width: 40px;
  margin-right: 10px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.title-text {
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.title-text i {
  margin-right: 10px;
}

.card {
  background: linear-gradient(145deg, #ffffff, #e4e8ef);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.input-field {
  width: 80%;
  max-width: 400px;
  padding: 14px;
  margin: 15px auto;
  border: 2px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:hover {
  border-color: #4caf50;
}

.input-field:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}

.results {
  min-height: 200px; 
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  margin-top: 20px;
  text-align: left;
}

.results.hidden {
  opacity: 0;
  visibility: hidden;
}

.subtitle {
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}

.results p {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin: 10px 0;
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
}

.results p:last-child {
  border-bottom: none; 
}

.results span {
  font-weight: bold;
  color: #4caf50;
}

.total {
  margin-top: 20px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.total i {
  margin-right: 10px;
}

.error-msg {
  color: #dc3545;
  font-size: 1rem;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .card {
    padding: 20px;
    max-width: 90%;
  }

  .title {
    flex-direction: column;
    margin-bottom: 20px;
  }

  .logo-title {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .title-text {
    font-size: 1.5rem;
  }

  .form-group label {
    display: block;
    text-align: center;
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 1rem;
    color: #343a40;
  }

  .input-field {
    width: 90%;
    max-width: none;
  }

  .total {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 15px;
    max-width: 100%;
  }

  .title-text {
    font-size: 1.3rem;
  }

  .input-field {
    max-width: none;
  }

  .total {
    font-size: 1.2rem;
  }
}

</style>
