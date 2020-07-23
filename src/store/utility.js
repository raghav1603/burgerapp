export const updatedObject=(oldState,updatedProps)=>{
    return{
        ...oldState,
        ...updatedProps
    }
}