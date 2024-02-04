import fetch from 'node-fetch';

// Create a bani customer
export const createCustomer = async ({
  firstName,
  lastName,
  phone,
  email,
  street,
  state,
  city,
}) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BANI_API_KEY,
      'moni-signature': process.env.BANI_MONI_KEY,
    },
    body: JSON.stringify({
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_phone: phone,
      customer_email: email,
      customer_address: street,
      customer_state: state,
      customer_city: city,
    }),
  };
  try {
    const baniResponse = await fetch(
      'https://live.getbani.com/api/v1/comhub/add_my_customer/',
      options
    );
    const response = await baniResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// Create a NGN virtual account under main LINK account
export const createCustomerAccount = async (customer_id) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BANI_API_KEY,
      'moni-signature': process.env.BANI_MONI_KEY,
    },
    body: JSON.stringify({
      pay_va_step: 'direct',
      country_code: 'NG',
      pay_currency: 'NGN',
      holder_account_type: 'permanent',
      customer_ref: customer_id,
      bank_name: 'wema',
      customer_name_only: 'false',
    }),
  };
  try {
    const baniResponse = await fetch(
      'https://live.getbani.com/api/v1/partner/collection/bank_transfer/',
      options
    );
    const response = await baniResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// Naira Withdraw
export const NairaWithdraw = async ({
  firstName,
  lastName,
  bankCode,
  accNum,
  amount,
  custRef,
}) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BANI_API_KEY,
      'moni-signature': process.env.BANI_MONI_KEY,
    },
    body: JSON.stringify({
      payout_step: 'direct',
      receiver_currency: 'NGN',
      receiver_amount: amount,
      transfer_method: 'bank',
      transfer_receiver_type: 'personal',
      receiver_account_num: accNum,
      receiver_country_code: 'NG',
      receiver_sort_code: bankCode,
      receiver_account_name: `${firstName} ${lastName}`,
      sender_amount: amount,
      sender_currency: 'NGN',
      transfer_ext_ref: custRef,
      transfer_note: 'L Payouts',
    }),
  };
  try {
    const baniResponse = await fetch(
      'https://live.getbani.com/api/v1/partner/payout/initiate_transfer/',
      options
    );
    const response = await baniResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// Naira Transfer
export const NgnTransfer = async ({ amountPayout, custRef }) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BANI_API_KEY,
      'moni-signature': process.env.BANI_MONI_KEY,
    },
    body: JSON.stringify({
      payout_step: 'direct',
      receiver_currency: 'NGN',
      receiver_amount: amountPayout,
      transfer_method: 'bank',
      transfer_receiver_type: 'personal',
      receiver_account_num: '7818601225',
      receiver_country_code: 'NG',
      receiver_sort_code: '000017',
      receiver_account_name: `LINKIO.GLOBAL SERVICES`,
      sender_amount: amountPayout,
      sender_currency: 'NGN',
      transfer_ext_ref: custRef,
    }),
  };
  try {
    const baniResponse = await fetch(
      'https://live.getbani.com/api/v1/partner/payout/initiate_transfer/',
      options
    );
    const response = await baniResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// Verify Account NUmber
export const verifyAccNumber = async ({ bankCode, accNum }) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BANI_API_KEY,
      'moni-signature': process.env.BANI_MONI_KEY,
    },
    body: JSON.stringify({
      list_code: 'NGPROV',
      bank_code: bankCode,
      country_code: 'NG',
      account_number: accNum,
    }),
  };
  try {
    const baniResponse = await fetch(
      'https://live.getbani.com/api/v1/partner/payout/verify_bank_account/',
      options
    );
    const response = await baniResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
