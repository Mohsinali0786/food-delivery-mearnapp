// Neer used Only sample 

import axios from 'axios'
export const baseUrl = "http://localhost:5001/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
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
export const getRequest = async (url) => {
  let fullUrl = baseUrl + url
  const response = await axios.get(fullUrl)
    .then(response => {
      console.log(response);

      if(response.data)
        return response.data;
      // }
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });

    return response;
}

export const patchRequest = async (url,body) => {
  let fullUrl = baseUrl + url
  const response = await axios.patch(fullUrl,body)
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