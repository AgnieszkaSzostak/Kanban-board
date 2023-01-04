/* eslint-disable no-undef */
const useStorage = (name) => {
    const setItem = (data) =>{
        localStorage.setItem(name, JSON.stringify(data))
    }
    const getItem = () => {
        const data =JSON.parse(localStorage.getItem(name));
        return data
    }
    return[getItem, setItem]
}



export default useStorage