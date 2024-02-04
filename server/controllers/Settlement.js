import {
  OtcTransactionRequestUN,
  OtcTransactionRequestNU,
} from '../utils/mail.js';
import Settlement from '../models/Settlement.js';
import cloudinary from '../utils/cloudinary.js';

export const usdcNgnc = async (req, res) => {
  const {
    userId,
    fullName,
    token,
    tokenNetwork,
    usdcNetwork,
    linkAddress,
    settlementType,
  } = req.body;

  try {
    const otcTransaction = new Settlement({
      userId,
      fullName,
      token,
      tokenNetwork,
      ngncNetwork: usdcNetwork,
      linkAddress,
      settlementType,
      doneAt: new Date().toISOString().split('T')[0],
    });
    await otcTransaction.save();

    // Send Email of transaction info details to admin
    OtcTransactionRequestUN({
      fullName,
      network: usdcNetwork,
      token,
      tokenNetwork,
      settlementType,
      linkAddress,
    });

    res.status(201).json({
      status: 200,
      message: '✅ OTC request created',
    });
  } catch (error) {
    res.status(409).json({
      message: error,
    });
  }
};

export const ngncUsdc = async (req, res) => {
  const {
    userId,
    fullName,
    token,
    tokenNetwork,
    ngncNetwork,
    linkAddress,
    walletAddress,
    proofOfPayment,
  } = req.body;

  try {
    if (!linkAddress || !proofOfPayment)
      return res.status(400).send('Please fill all fields');

    const imageProcessing = await cloudinary.v2.uploader.upload(
      req.body.proofOfPayment,
      {
        folder: 'B2B/OTC',
      }
    );
    let settlementType = `Ngnc-${token}`;

    const otcTransaction = new Settlement({
      userId,
      fullName,
      token,
      tokenNetwork,
      ngncNetwork,
      walletAddress,
      linkAddress,
      settlementType,
      proofOfPayment: {
        public_id: imageProcessing.public_id,
        url: imageProcessing.secure_url,
      },
      doneAt: new Date().toISOString().split('T')[0],
    });
    await otcTransaction.save();

    // Send Email of transaction info details to admin
    OtcTransactionRequestNU(otcTransaction);
    console.log('Transaction reaches here');

    res.status(201).json({
      status: 200,
      message: '✅ OTC request created',
    });
  } catch (error) {
    res.status(409).json({
      message: '❌ OTC request unsuccessful',
      message: error.message,
    });
  }
};
