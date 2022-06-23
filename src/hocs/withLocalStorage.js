function withLocalStorage(Component){
  
  function objStr(param){
  	return JSON.stringify(param)
  }

  function store(object){
  	if(localStorage.persistStore){
  	  var store = localStorage.persistStore
  	  var persistStore = JSON.parse(store)
  	  persistStore[object["key"]] = object
  	  localStorage.persistStore = objStr(
        persistStore
  	  )
  	}
  	else{
  	  var persistStore = new Object()
  	  persistStore[object["key"]] = object
  	  var str = JSON.stringify(persistStore)
  	  localStorage.persistStore = str
  	}
  }

  function LocalStorage(props){
  	return (
  	  <Component 
  	    store={store} 
  	    { ...props }
  	  />
  	)
  }

  return LocalStorage
}

export default withLocalStorage