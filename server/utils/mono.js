import fetch from "node-fetch";
// import Connect from "@mono.co/connect.js";
const ref2 = Math.random().toString(36).slice(2, 17);

let response = "";

export const accountHolder = async ({
  firstName,
  lastName,
  bvn,
  email,
  phoneNumber,
}) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "mono-sec-key": process.env.MONO_SEC_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      entity: "INDIVIDUAL",
      first_name: firstName,
      last_name: lastName,
      bvn: bvn,
      phone: phoneNumber,
      email,
    }),
  };
  try {
    const monoResponse = await fetch(
      "https://api.withmono.com/issuing/v1/accountholders",
      options
    );
    console.log("We got this far");
    const { data } = await monoResponse.json();
    // console.log(data);
    return data.id;
  } catch (error) {
    return error.message;
  }
};

export const virtualAccountID = async (monoId) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "mono-sec-key": process.env.MONO_SEC_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account_holder: monoId,
      account_type: "deposit",
      disposable: false,
      provider: "gtb",
    }),
  };
  try {
    const monoResponse = await fetch(
      "https://api.withmono.com/issuing/v1/virtualaccounts",
      options
    );
    const { data } = await monoResponse.json();
    return data.id;
  } catch (error) {
    return error.message;
  }
};

export const virtualAccountData = async (virAccId) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "mono-sec-key": process.env.MONO_SEC_KEY,
    },
  };
  try {
    const monoResponse = await fetch(
      `https://api.withmono.com/issuing/v1/virtualaccounts/${virAccId}`,
      options
    );
    const { data } = await monoResponse.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const virtualAccountBalance = async (virAccBal) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "mono-sec-key": process.env.MONO_SEC_KEY,
    },
  };

  const monoResponse = await fetch(
    `https://api.withmono.com/issuing/v1/virtualaccounts/${virAccBal}/balance`,
    options
  );

  const { data } = await monoResponse.json();
  // console.log(data);
  return data;
};

export const transferToBankAccount = async ({
  accountId,
  amount,
  account_number,
  bankCode,
}) => {
  console.log(accountId, account_number, amount, bankCode);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "mono-sec-key": process.env.MONO_SEC_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      narration: "Bank Transfer",
      reference: ref2,
      account_number: account_number,
      bank_code: bankCode,
    }),
  };

  fetch(
    `https://api.withmono.com/issuing/v1/virtualaccounts/${accountId}/transfer`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err.message));
};
