import { shallowMount } from '@vue/test-utils';
import BidCalculator from '@/components/BidCalculator.vue';
import { calculateFees } from '@/services/apiService';

jest.mock('@/services/apiService', () => ({
  calculateFees: jest.fn(),
}));

describe('BidCalculator.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BidCalculator);
    jest.clearAllMocks();
  });

  it('should render the form properly', () => {
    expect(wrapper.find('input#basePrice').exists()).toBe(true);
    expect(wrapper.find('select#vehicleType').exists()).toBe(true);
  });

  it('should call the calculateFees API when base price and vehicle type change', async () => {
    const mockResponse = {
      data: {
        fees: {
          basicBuyerFee: 50,
          specialFee: 20,
          associationFee: 10,
          storageFee: 100,
        },
        totalCost: 1180,
      },
    };
    calculateFees.mockResolvedValueOnce(mockResponse);

    await wrapper.setData({ basePrice: 1000, vehicleType: 'Common' });

    await wrapper.vm.$nextTick();

    expect(calculateFees).toHaveBeenCalledWith(1000, 'Common');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.result).toEqual(mockResponse.data);
    expect(wrapper.find('.total span').text()).toBe('$1180.00');
  });

  it('should show an error message if the API fails', async () => {
    const mockError = {
      response: { status: 404 },
    };
    calculateFees.mockRejectedValueOnce(mockError);

    await wrapper.setData({ basePrice: 1000, vehicleType: 'Common' });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.error-msg p').text()).toBe('Route not found. Please check the backend API.');
  });

  it('should reset the result when base price is cleared', async () => {
    await wrapper.setData({ basePrice: 1000, vehicleType: 'Common' });
    await wrapper.vm.$nextTick();

    await wrapper.setData({ basePrice: null });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.result).toBe(null);
    expect(wrapper.find('.results').classes()).toContain('hidden');
  });
});
