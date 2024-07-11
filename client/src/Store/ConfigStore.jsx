const createStore = (set) => ({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  refresh: false,
  setBaseUrl: (newBaseUrl) => set({ baseUrl: newBaseUrl }),
  setRefresh: (newRefresh) => set({ refresh: newRefresh }),
})

export default createStore