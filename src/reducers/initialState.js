export default {
  auth: {
    isAuthenticated: false,
    isLoginInProgress: false,
    isLogoutComplete: false,
    loginUser: {}
  },

  dashboard: {
    workOrderByTime: {
      isRefreshInProgress: false,
      error: null,
    },
    workOrderByUser: {
      isRefreshInProgress: false,
      error: null,
     },
    top10Client: {
      isRefreshInProgress: false,
      error: null,
     },
    pendingWorkOrder: {
      isRefreshInProgress: false,
      error: null
    }
  },

  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  }
};
