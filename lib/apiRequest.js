import toast from "react-hot-toast";

export async function makePostRequest(
  setLoading,
  reset,
  url,
  data,
  resourceName,
) {
  try {    
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success(`New ${resourceName} created successfully`);
      console.log(response);
      reset();
      return true;
    } else {
      response.json().then((data) => {        
        toast.error(`${data.message}`);
      });
      setLoading(false);
      return false;
    }
  } catch (error) {  
    setLoading(false);
    console.error(error);
    return false;
  }
}


export async function makePutRequest(
  setLoading,  
  url,
  data,
  resourceName,
) {
  try {
    setLoading(true);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success(`${resourceName} updated successfully`);
      console.log(response);      
    } else {
      response.json().then((data) => {
        toast.error(`${data.message}`);
      });
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
}

export async function makeDeleteRequest(url, resourceName) {
  try {    
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success(`${resourceName} deleted successfully`);
      console.log(response);
      return true;
    } else {
      response.json().then((data) => {
        toast.error(`${data.message}`);
      });
      return false;
    }    
  } catch (error) {    
    console.error(error);
    return false;
  }
}
