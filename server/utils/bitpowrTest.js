import fetch from 'node-fetch';

export const createSubAccount = async ({ userID, firstName }) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BITPOWR_KEY,
    },
    body: JSON.stringify({
      name: firstName,
      externalId: userID,
    }),
  };
  try {
    const bpResponse = await fetch(
      'https://developers.bitpowr.com/api/v1/accounts/27ed9f32-0bef-43f4-be9c-61b55ffb0cfd/sub-accounts/',
      options
    );
    const response = await bpResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const createSubAccountAddress = async ({ subId, firstName, item }) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BITPOWR_KEY,
    },
    body: JSON.stringify({
      label: `${firstName} ${item}`,
      asset: item,
    }),
  };
  try {
    const bpResponse = await fetch(
      `https://developers.bitpowr.com/api/v1/accounts/27ed9f32-0bef-43f4-be9c-61b55ffb0cfd/sub-accounts/${subId}/addresses`,
      options
    );
    const response = await bpResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const transferToken = async ({
  transferAmount,
  asset,
  payAddress,
  address,
}) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.BITPOWR_KEY,
    },
    body: JSON.stringify({
      walletId: process.env.BITPOWER_MAIN_WALLET_ID,
      assetType: asset,
      cryptoAmount: transferAmount,
      address: payAddress,
      fromAddress: address,
    }),
  };
  try {
    const bpResponse = await fetch(
      `https://developers.bitpowr.com/api/v1/transactions`,
      options
    );
    const response = await bpResponse.json();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
