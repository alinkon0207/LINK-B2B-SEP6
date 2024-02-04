import fetch from 'node-fetch';

// Verify User KYC
export const verifyCustomerBVN = async ({ type, number }) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.PUBLIC_KEY,
      AppId: process.env.APP_ID,
    },
  };
  try {
    const dojahResponse = await fetch(
      `https://api.dojah.io/api/v1/kyc/${type}/full?${type}=${number}`,
      options
    );
    const response = await dojahResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const verifyCustomer = async ({ type, number }) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.PUBLIC_KEY,
      AppId: process.env.APP_ID,
    },
  };
  try {
    const dojahResponse = await fetch(
      `https://api.dojah.io/api/v1/kyc/${type}?${type}=${number}`,
      options
    );
    const response = await dojahResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const verifyLicence = async ({ type, number }) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.PUBLIC_KEY,
      AppId: process.env.APP_ID,
    },
  };
  try {
    const dojahResponse = await fetch(
      `https://api.dojah.io/api/v1/kyc/${type}?license_number=${number}`,
      options
    );
    const response = await dojahResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
