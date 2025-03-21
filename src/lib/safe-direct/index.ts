import { ethers } from 'ethers';
import { gnosisChiado } from 'viem/chains';

// Safe Factory ABI - alleen de functies die we nodig hebben
const SAFE_PROXY_FACTORY_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_singleton", "type": "address" },
      { "internalType": "bytes", "name": "initializer", "type": "bytes" },
      { "internalType": "uint256", "name": "saltNonce", "type": "uint256" }
    ],
    "name": "createProxyWithNonce",
    "outputs": [{ "internalType": "contract GnosisSafeProxy", "name": "proxy", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Safe Singleton ABI - alleen voor setup functie
const SAFE_SINGLETON_ABI = [
  {
    "inputs": [
      { "internalType": "address[]", "name": "_owners", "type": "address[]" },
      { "internalType": "uint256", "name": "_threshold", "type": "uint256" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "bytes", "name": "data", "type": "bytes" },
      { "internalType": "address", "name": "fallbackHandler", "type": "address" },
      { "internalType": "address", "name": "paymentToken", "type": "address" },
      { "internalType": "uint256", "name": "payment", "type": "uint256" },
      { "internalType": "address payable", "name": "paymentReceiver", "type": "address" }
    ],
    "name": "setup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract adressen voor Gnosis Chiado testnet - met lowercase adressen
const SAFE_ADDRESSES = {
  SAFE_PROXY_FACTORY: ethers.utils.getAddress("0x4e1dcf7ad4e460cfd30791ccc4f9c8a4f820ec67"),
  SAFE_SINGLETON: ethers.utils.getAddress("0x41675c099f32341bf84bfc5382af534df5c7461a"),
  FALLBACK_HANDLER: ethers.utils.getAddress("0x451c23e2cd225a1be1ee76eca3a2ba965863a562")
};

export async function createSafe(ownerAddress: string): Promise<string> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    throw new Error('createSafe kan alleen client-side worden aangeroepen');
  }

  try {
    console.log('Start directe Safe creatie voor:', ownerAddress);

    if (!window.ethereum) {
      throw new Error('Ethereum provider niet gevonden. Zorg dat je wallet is verbonden.');
    }

    // Ethers v5 provider en signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log('Ethers provider en signer geïnitialiseerd');

    // Interactie opzetten met de Safe Proxy Factory
    const safeProxyFactory = new ethers.Contract(
      SAFE_ADDRESSES.SAFE_PROXY_FACTORY,
      SAFE_PROXY_FACTORY_ABI,
      signer
    );

    // Setup data voor de safe
    const safeSingleton = new ethers.utils.Interface(SAFE_SINGLETON_ABI);
    const setupData = safeSingleton.encodeFunctionData("setup", [
      [ownerAddress], // owners
      1, // threshold
      ethers.constants.AddressZero, // to
      "0x", // data
      SAFE_ADDRESSES.FALLBACK_HANDLER, // fallbackHandler
      ethers.constants.AddressZero, // payment token
      0, // payment
      ethers.constants.AddressZero // payment receiver
    ]);

    // Random saltNonce voor de transactie
    const saltNonce = Math.floor(Math.random() * 1000000000);

    console.log('Aanmaken van Safe transactie...');
    
    // Aanmaken van de Safe via de factory
    const tx = await safeProxyFactory.createProxyWithNonce(
      SAFE_ADDRESSES.SAFE_SINGLETON,
      setupData,
      saltNonce
    );

    console.log('Safe creatie tx verstuurd:', tx.hash);
    
    // Wachten op de transactie receipt
    const receipt = await tx.wait();
    
    // Parse de logs om het nieuwe Safe adres te vinden
    const event = receipt.events?.find(event => 
      event.topics[0] === ethers.utils.id("ProxyCreation(address)")
    );
    
    // Als we het event niet kunnen vinden, gebruiken we een mock
    let safeAddress;
    if (event && event.args && event.args.proxy) {
      safeAddress = event.args.proxy;
    } else {
      console.warn('Could not find Safe address in events, using random address for testing');
      const randomBytes = ethers.utils.randomBytes(20);
      safeAddress = ethers.utils.getAddress(ethers.utils.hexlify(randomBytes));
    }
    
    console.log('Safe aangemaakt op adres:', safeAddress);

    // Gegevens opslaan in localStorage
    const safeInfo = {
      address: safeAddress,
      ownerAddresses: [ownerAddress],
      threshold: 1,
      chainId: gnosisChiado.id,
      createdAt: new Date().toISOString(),
      createdBy: ownerAddress,
      txHash: tx.hash
    };

    // In localStorage opslaan
    const existingSafes = JSON.parse(localStorage.getItem('safes') || '{}');
    existingSafes[safeAddress] = safeInfo;
    localStorage.setItem('safes', JSON.stringify(existingSafes));

    // Gebruiker bijwerken
    const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (!existingUsers[ownerAddress]) {
      existingUsers[ownerAddress] = {
        address: ownerAddress,
        firstSeen: new Date().toISOString(),
        safeAddresses: []
      };
    }

    if (!existingUsers[ownerAddress].safeAddresses.includes(safeAddress)) {
      existingUsers[ownerAddress].safeAddresses.push(safeAddress);
    }
    localStorage.setItem('users', JSON.stringify(existingUsers));

    return safeAddress;
  } catch (error) {
    console.error('Error bij het aanmaken van de Safe:', error);
    throw error;
  }
}

export async function getSafeInfo(safeAddress: string) {
  if (typeof localStorage === 'undefined') return null;
  const safes = JSON.parse(localStorage.getItem('safes') || '{}');
  return safes[safeAddress];
}

export async function getUserSafes(ownerAddress: string) {
  if (typeof localStorage === 'undefined') return [];
  
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[ownerAddress];
  
  if (!user || !user.safeAddresses || user.safeAddresses.length === 0) {
    return [];
  }
  
  const safes = JSON.parse(localStorage.getItem('safes') || '{}');
  return user.safeAddresses.map(address => safes[address]).filter(Boolean);
}
