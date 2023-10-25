const fs = require("fs");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { ethers } = require("ethers");
const mainnetABI = require("../abi/mainnet.json");
const goerliABI = require("../abi/goerli.json");

dotenv.config();

if (!process.env.PRIVATE_KEY || !process.env.INFURA_PROJECT_ID) {
  console.error(
    "Please set PRIVATE_KEY and INFURA_PROJECT_ID environment variables."
  );
  process.exit(1);
}

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);
const signerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const chainENV = process.env.CHAIN_ENV === "goerli" ? "goerli" : "mainnet";
const abi = chainENV === "goerli" ? goerliABI : mainnetABI;
const contractAddress = abi.contracts.MetaFoxesGenesis.address;

const generateToken = async (walletAddress) => {
  // create random salt
  const salt = crypto.randomBytes(16).toString("hex");

  // generate hash based on salt + contract address + user wallet address
  const hash = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ["string", "address", "address"],
      [salt, contractAddress.substr(2), walletAddress.substr(2)]
    )
  );

  // sign the hash with signer wallet
  const message = ethers.utils.arrayify(hash);
  const token = await signerWallet.signMessage(message);
  return { salt, token };
};

const wallets = [
  "0x0ac1c1c174c0177bd7ec4b1067a2fc4563d39854",
  "0x8295c7d69e1868310acc1b8789094ec7f23a4bb4",
  "0x1B297a4fD9212E8f179c0Dd34330745041D498fF",
  "0x3BA4F680E3ec4C321985c9407F0CE36815DBE192",
  "0x63fb324257b717F6699523EfDBe1DE5a657538C8",
  "0x331E5d9C3F48A73A46aD73C4d998c182A7f461E6",
  "0xD4406A0Fcc23671022d5256D974ac9695AD72724",
  "0x2db35527a753850b4396367a03fA834d13a32F10",
  "0x0843AB4ed4D75F5dCf305fb01f73cF10b0fB278F",
  "0x0d3e76A02c7F65643F22AE720cDF0bBfD5BD2b94",
  "0xcfEb8e44ff8fA984fF2a8BEc289C02BA904bb18d",
  "0xf56e6657bF3aCC18E2faa7bF9fA9bdC43e22d8f2",
  "0x931bd858fd7BC2960F51a42489B84805881036cF",
  "0xE03349D034161D70c97801Bd14A09C5a918F46b0",
  "0x5A6fA88a66fdAFc7d313DD93bbA16F2683eEfA86",
  "0x7E93d6B380D1f0e221Ad9846781B7F4Db9C42263",
  "0xA032C7F94875E81CF7A547F12f4e2A66CB8f3b8e",
  "0x8b59621dda821c130c682d657ee2533582eeeb39",
  "0x04400Db7F33D5330F62C8dBd4840920ADC273615",
  "0xf8D9d01c90B84dc99064968ED77b829Ab0A593f7",
  "0xe0b99E2D029c1c6e76bf5897c7eC20554F86b37a",
  "0x19C970A0Dc25D3740ab141045E70225d79F452eC",
  "0xfC591D77185E64B40b76eAf4f2c9dffe0a3F598C",
  "0x306be6069e2aeb8F80A4e48BDFd58e4F2E2768b5",
  "0x13733Cf0a2E375c300C0ef71ED4963Cd9127ffD7",
  "0x567E48bB614f43373C20602C17AB90829a18e37b",
  "0x1EbDe0d2e17462E28244886c76f2E8D8Cd075095",
  "0xC2AE0852930d7e633C4fC635503850d980eD3F62",
  "0x657EE6203137F73317533f839d64459472BF8b8E",
  "0x370a2cd73649039413d9ad6f61f7c0382fd78ceb",
  "0x5B519B482ad6b07aCD3C72710D30772fdB020ff6",
  "0x940570AF4b8373D2F3aCb068307999C1C85279b6",
  "0x04F71A91733F55c82fD29F064b37F7D83B2eE86D",
  "0xc578da6572B031665c3a2269aA4CA156db3e0E92",
  "0xB5004A9dCf3B1C712F8536497e5f6E5034077E03",
  "0x8f9A933430266D979CF309b550199138b6FDFF04",
  "0x915E3B03C0f8CC34b75A9a4115a4D9bf1705DB98",
  "0x47e3B5CfD62242b3e7612D09f6e870b54eCE9971",
  "0x7769Ba0a70eB9B6bD259638165B26630f92B9C5b",
  "0x2cDD1cF1Ce0424995Beb4daa3Af2F418660852eA",
  "0x58b43515C356270fbb80c7d7F446c1a03A4E9DD9",
  "0x1E497d43376bd51E7A235cED2a1Ac53B206C7faF",
  "0xa1E84210239baD5571171a8fe304A90E7Ffe5189",
  "0x0268Aa1755B49FA115A81090B836f2B111A20163",
  "0xbB7Fa0c15a081249b97dc9084F14AE6c350212f2",
  "0x19D36d40Fc67e905c34e7931e6Bf993Ec07e171F",
  "0x35DD43036929C5ff17Cf0410B3367F88E1cF4CB7",
  "0x0603Df18aD272bE9e042803bCA337A0412FF0eDe",
  "0xBD713F38ed7b658E4df317dC8e602251FcB191Aa",
  "0x407893a5aa505556aaC2eA1D967A4F6AE5478AeB",
  "0xB1b11aa1208B91adbbFB421CE39E8F618f9D8a62",
  "0x6B45339A29DE7DC54e6fB3EAFd141D2DeC71e71b",
  "0x389d585671D9809088a8Df0651FA70F377658d10",
  "0xF714F6657f9D3D6B2C62Ffb1AF4c07B90Ac50CdB",
  "0x845ed602800dadf023202639b7F3799C99E685C7",
  "0xEA87C49d2FE5E7D4b448f9e04c72D13E242142EC",
  "0xb8A804da05abf0ee96D61f5e4bEDB59E7f8fab2F",
  "0xF1c0D49c4746Cb31a8FD97d3c66C2A8109e8D380",
  "0xFE7CBA271b64811564D0e5A109dC64224EDf3523",
  "0x86791272Acb855176ec0aF3B6cdF391BcA0A152F",
  "0x7CD4B24262b76A771CB92Ed01173766Bb1c31244",
  "0x7A0049fe5208c6CE9C02b00051619fC3E000dc2C",
  "0xbE79771b919cde17a65097D14a161b7E6A6F3bB9",
  "0x951353Ff1DDe4a707e283b86c2d1a0140A98a001",
];

const main = async () => {
  const data = {};

  for (let wallet of wallets) {
    const { salt, token } = await generateToken(wallet);
    console.log("====== Signature ======");
    console.log("Wallet address: ", wallet);
    console.log("Salt: ", salt);
    console.log("Token: ", token);
    data[wallet.toLowerCase()] = { salt, token };
  }

  const filename =
    chainENV === "mainnet" ? "signatures" : `${chainENV}_signatures`;

  await fs.writeFile(
    `./data/${filename}.json`,
    JSON.stringify(data, null, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
      process.exit(0);
    }
  );
};

main();
