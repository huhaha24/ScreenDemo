const changeMap = (state,action)=>{
    if(!state){
        return {'mapName':'china','disabled':true}
    }
    if(action.type == "CHANGE" && state.mapName != action.mapName){
        let disabled = false
        if('china' == action.mapName){
            disabled = true
        }
        return {
            "mapName":action.mapName,
            disabled
        }
    }
    return state;
}
export default changeMap