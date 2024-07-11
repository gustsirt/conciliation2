const createStore = (set) => ({
  backendFilter01: JSON.parse(localStorage.getItem("filter01")) || {},
  backendFilter02: JSON.parse(localStorage.getItem("filter02")) || {}, 

  setFilter1: (newFilter) => {
    set({ backendFilter01: newFilter });
    localStorage.setItem("filter01", JSON.stringify(newFilter));
  },
  setFilter2: (newFilter) => {
    set({ backendFilter01: newFilter });
    localStorage.setItem("filter02", JSON.stringify(newFilter));
  },
})

export default createStore
