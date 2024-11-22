// Neer used Only sample 

import axios from 'axios'
export const baseUrl = "http://localhost:5001/api";
// export const baseUrl = "https://food-delivery-b-mearnapp.vercel.app/api";


export const postRequest = async (url, body , token) => {
  console.log(token,'token')
  const response = await fetch(baseUrl+url, {
    method: "POST",
    headers: {
      // 'Authorization': `Bearer ${token}`,
      'token':token,
      "Content-Type": "application/json",
    },
    body:JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};
// export const getRequest = async (url) => {
//     const response = await fetch(url);

//     const data = await response.json();

//     if (!response.ok) {
//       let message = "An error occured...";

//       if (data?.message) {
//         message = data.message;
//       }

//       return { error: true, status: response.status, message };
//     }

//     return data;
//   };
export const getRequest = async (url,token) => {
  let fullUrl = baseUrl + url
  let config = {
    headers: {
      'token':token
    }
  }
  const response = await axios.get(fullUrl,config)
    .then(response => {
      console.log(response,'get Request');

      if(response.data)
        return response.data;
      // }
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });

    return response;
}

export const patchRequest = async (url,body,token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  let fullUrl = baseUrl + url
  const response = await axios.post(fullUrl,body,config)
    .then(response => {
      console.log(response,'response');

      if(response.data)
        return response.data;
      // }
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });

    return response;
}

export const deleteRequest = async (url,id) => {
  let fullUrl = baseUrl + url
  // console.log(body,'id')
  const response = await axios.delete(fullUrl)
    .then(response => {
      console.log(response);

      if(response.data)
        return response.data;
      // }
    })
    .catch(error => {
      console.error('Error in Deleting data', error);
    });

    return response;
}