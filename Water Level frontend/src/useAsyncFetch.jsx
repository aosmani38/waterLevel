// A custom hook that calls fetch.
// A hook is a function that can be called by React components.
// This one is wrapped around the built-in effect hook.  

import React, {useEffect} from 'react';
import {sendPostRequest, sendGetRequest} from './AJAX.jsx';

const useAsyncFetch = function (url, options, thenDo, catchErr) 
{
  console.log("here 1");
  // the usual function that does a fetch
  async function fetchData() 
  {
    console.log("here 2");
    let api_url = "/query/getList";
    let response = await sendPostRequest(api_url, options);
    console.log(response);
    thenDo(response);
  }

  // The effect hook is a function called when the component is created or updated.
  // In this case, "the component" refers to the componet using 
  // this useFetch hook.
  // Because we give it a second argument of [] (meaning "update when the variables in this empty list change"),
  // this particular effect hook will get run only after the componet is created, not when it is updated.
  // In particular, when the calling component is re-rendered its state variables change,
  // this effect does not get called again. 
  useEffect(function () {
    console.log("Calling fetch");
    fetchData();
  }, [options]);

}

export default useAsyncFetch;