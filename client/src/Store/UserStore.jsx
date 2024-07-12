const createUserStore = (set) => ({
  user: {},
  token: JSON.parse(localStorage.getItem("token")),
  setUser: (newUser) => set({ user: newUser }),
  setToken: (newToken) => {
    set({ token: newToken });
    localStorage.setItem("token", JSON.stringify(newToken));
  },
})

export default createUserStore 