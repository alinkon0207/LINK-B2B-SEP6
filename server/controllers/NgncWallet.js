import ngnAccount from "../models/NgnAccount.js";
import ngncWallet from "../models/NgncWallet.js";
import NgncWithdraw from "../models/NgncWithdraw.js";

// import {
//   createSubAccount,
//   createSubAccountAddress,
//   transferToken,
// } from '../utils/bitpowrTest.js';
import {
  createSubAccount,
  createSubAccountAddress,
  transferToken,
} from "../utils/bitpowr.js";

import { transferWalletTransaction } from "../utils/mail.js";

export const fetchWallet = async (req, res) => {
  const { id } = req.query;

  try {
    const accounts = await ngncWallet.find({ user: id });

    const calculateTotalNgncBalance = () => {
      const total = accounts[0]?.addresses
        ?.map((item) => item.balance)
        ?.reduce((a, b) => a + b);
      return Number(total).toFixed(2);
    };

    res.status(200).json({
      status: "success",
      accounts,
      totalNgncbalance: accounts.length > 0 ? calculateTotalNgncBalance() : 0,
    });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
  }
};

export const createWallet = async (req, res, next, userID, firstName) => {
  // let userID = '91b7a6a55f1fe21c7bb61756';
  // let firstName = 'black-fridge';

  try {
    // Generate customer NGNC subAccount ID.
    const subAccountID = await createSubAccount({
      userID,
      firstName,
    });
    console.log(subAccountID);

    if (subAccountID.status !== "success") {
      return res.status(403).json({
        status: "Failed",
        message: subAccountID.message,
      });
    }
    let subId = subAccountID.data.uid;

    const asset = await createSubAccountAddress({
      subId,
      firstName,
      item: "TUSDC_SOL",
    });
    console.log(asset);

    const newUserWallet = new ngncWallet({
      user: userID,
      Business: subAccountID.data.name,
      subAccount_id: subAccountID.data.uid,
      external_id: subAccountID.data.externalId,
      account_id: subAccountID.data.accountId,
      organization_id: subAccountID.data.organizationId,
      network: subAccountID.data.network,
      addresses: [
        {
          asset_guid: asset.data.guid,
          asset_uid: asset.data.uid,
          asset_address: asset.data.address,
          address_ref: asset.data.addressRef,
          asset_id: asset.data.assetId,
          asset_type: "TUSDC_SOL",
          asset_chain: asset.data.chain,
        },
      ],
    });
    await newUserWallet.save();

    console.log(newUserWallet);

    // Use subAccount ID to Generate NGNC token address
    const tokens = ["TUSDC_XLM", "TUSDC_MATIC"];

    tokens.map(async (item, index) => {
      let checkUser = await ngncWallet.findOne({
        user: userID,
      });

      const asset = await createSubAccountAddress({ subId, firstName, item });

      if (checkUser) {
        console.log("we reached here");
        checkUser.addresses.push({
          asset_guid: asset.data.guid,
          asset_uid: asset.data.uid,
          asset_address: asset.data.address,
          address_ref: asset.data.addressRef,
          asset_id: asset.data.assetId,
          asset_type: item,
          asset_chain: asset.data.chain,
        });
        await checkUser.save();
      }
    });
    res.status(200).json({
      status: "success",
      message: "✅ New Business Account created",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

// Withdraw from NGNC Wallet
export const withdraw = async (req, res) => {
  const { userId, userName, amount, asset, network, address, payAddress } =
    req.body;

  if (amount < 1000) {
    return res.status(403).json({
      status: "Failed",
      message: "Minimum transfer amount is 1000 NGNC",
    });
  }

  try {
    const transferAmount = amount.toString();
    const response = await transferToken({
      transferAmount,
      asset,
      payAddress,
      address,
    });
    // console.log(response);

    if (response.status !== "success") {
      return res.status(403).json({
        status: "Failed",
        message: response.message,
      });
    }

    const walletTransaction = new NgncWithdraw({
      userId,
      fullName: userName,
      cust_reference: response.data.ref,
      transferType: "Withdraw",
      status: "pending",
      amount: amount,
      asset: asset.toLowerCase(),
      wallet_address: payAddress,
      network,
      doneAt: new Date().toISOString().split("T")[0],
    });
    await walletTransaction.save();

    res.status(201).json({
      status: 200,
      message: "✅ Withdraw request created",
    });
  } catch (error) {
    res.status(409).json({
      message: "❌ Wallet Withdraw request unsuccessful",
      message: error.message,
    });
  }
};

// Transfer from NGNC wallet to NGN account
export const transfer = async (req, res) => {
  const { userId, userName, amount, asset, network, address, link_address } =
    req.body;

  if (amount < 1000) {
    return res.status(403).json({
      status: "Failed",
      message: "Minimum transfer amount is 1000 NGNC",
    });
  }

  try {
    const userDetails = await ngnAccount.findOne({ user: userId });
    const { account_name, account_number, bank_name } = userDetails;
    // const newAmount = amount - 100;

    const transferAmount = amount.toString();
    const response = await transferToken({
      transferAmount,
      asset,
      payAddress: link_address,
      address,
    });
    // console.log(response);

    if (response.status !== "success") {
      return res.status(403).json({
        status: "Failed",
        message: response.message,
      });
    }

    const walletTransaction = new NgncWithdraw({
      userId,
      fullName: userName,
      cust_reference: response.data.ref,
      transferType: "Transfer",
      status: "pending",
      amount: transferAmount,
      asset: asset.toLowerCase(),
      wallet_address: link_address,
      network,
      doneAt: new Date().toISOString().split("T")[0],
    });
    await walletTransaction.save();

    // Send Email of transaction info details to admin
    transferWalletTransaction({
      userName,
      account_name,
      account_number,
      bank_name,
      amount,
      network,
      link_address,
    });

    res.status(201).json({
      status: 200,
      message: "✅ Transfer request created",
    });
  } catch (error) {
    res.status(409).json({
      message: "❌ Wallet Transfer request unsuccessful",
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  const { id } = req.query;
  try {
    const withdrawals = await NgncWithdraw.find({ userId: id });

    if (withdrawals.length > 0) {
      res.status(200).json({ status: "success", withdrawals });
    } else {
      res.status(203).json({ status: "okay", withdrawals: null });
    }
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
  }
};

// BitPowr Wallet webhooks
export const bitpowrWebhook = async (req, res) => {
  const webhook = req.body;
  try {
    switch (webhook.event) {
      case "transaction.success":
        const wallet_payout = webhook.data;
        // console.log(wallet_payout);
        const payoutAmount = parseInt(wallet_payout.amount);
        const node = await NgncWithdraw.findOne({
          cust_reference: wallet_payout.ref,
        });
        // console.log(node);
        if (node.status === "delivered") {
          console.log("delivered");
        } else {
          const wallet_owner = await ngncWallet.findOne({
            user: node.userId,
          });
          const ownerAddresses = wallet_owner.addresses;
          let selAccount = ownerAddresses
            .filter((data) => {
              return data.asset_id === wallet_payout.assetId;
            })
            .map((data) => {
              return data.balance;
            });
          const TotalBal = parseInt(selAccount.toString());
          const payoutBalance = TotalBal - payoutAmount;
          await ngncWallet.findOneAndUpdate(
            {
              user: node.userId,
              "addresses.asset_id": wallet_payout.assetId,
            },
            {
              "addresses.$.balance": payoutBalance,
            }
          );
          await NgncWithdraw.findOneAndUpdate(
            { cust_reference: wallet_payout.ref },
            {
              status: "delivered",
            }
          );
        }
        break;

      // webhook case when NGNC is received into wallet
      case "transaction.incoming":
        const ref = Math.random().toString(36).slice(2, 20);
        const wallet_deposit = webhook.data;
        // console.log(wallet_deposit);
        const depositAmount = parseInt(wallet_deposit.amount);
        const exist = await NgncWithdraw.findOne({
          cust_reference: wallet_deposit.ref,
        });
        if (exist === "null") {
          console.log("exist");
        } else if (exist && exist.status === "delivered") {
          console.log("delivered");
        } else {
          const wallet_response = await ngncWallet.findOne({
            subAccount_id: wallet_deposit.subAccountId,
          });
          const walletAddresses = wallet_response.addresses;
          let selectedAccount = walletAddresses
            .filter((data) => {
              return data.asset_id === wallet_deposit.assetId;
            })
            .map((data) => {
              return data.balance;
            });
          const accountBal = parseInt(selectedAccount.toString());
          const newBalance = accountBal + depositAmount;
          await ngncWallet.findOneAndUpdate(
            {
              subAccount_id: wallet_deposit.subAccountId,
              "addresses.asset_id": wallet_deposit.assetId,
            },
            {
              "addresses.$.balance": newBalance,
            }
          );
          const depositIn = new NgncWithdraw({
            userId: wallet_response.user,
            fullName: wallet_response.Business,
            cust_reference: wallet_deposit.ref,
            transferType: "deposit",
            status: "delivered",
            amount: depositAmount,
            asset: wallet_deposit.assetType,
            wallet_address: wallet_deposit.senderAddress || ref,
            network: wallet_deposit.chain,
            doneAt: new Date().toISOString().split("T")[0],
          });
          await depositIn.save();
        }
        break;
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};
