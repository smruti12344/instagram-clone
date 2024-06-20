import { create } from 'zustand';
//here use Zustand lib for state Management Teachnique
const useAuthStore = create((set)=>({
    user:JSON.parse(localStorage.getItem("user-info")),
    login :(user)=>set({user}),
    logout:()=>set({user:null}),
    setUser:(user)=>set({user})
}));

export default useAuthStore;