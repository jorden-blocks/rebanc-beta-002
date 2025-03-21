import Safe from '@safe-global/protocol-kit';
import EthersAdapter from '@safe-global/safe-ethers-lib';
import { ethers } from 'ethers';

export async function createSafe(ownerAddress: string): Promise<string> {
  // Check for window and localStorage availability
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    throw new Error('createSafe kan alleen client-side worden aangeroepen');
  }

  try {
    console.log('Start Safe creatie proces voor:', ownerAddress);

    // Initialiseer ethers provider en signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log('Ethers provider en signer geïnitialiseerd');

    // Maak EthAdapter
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer
    });
    console.log('EthAdapter geïnitialiseerd');

    // Configureer Safe
    const safeAccountConfig = {
      owners: [ownerAddress],
      threshold: 1
    };
    console.log('Safe configuratie voorbereid', safeAccountConfig);

    // Initialiseer Safe SDK Factory
    const safeSDK = await Safe.create({
      ethAdapter,
      safeAccountConfig
    });
    console.log('Safe SDK geïnitialiseerd');

    // Deploy Safe
    console.log('Safe deployen...');
    const newSafeAddress = await safeSDK.getAddress();
    console.log('Safe gedeployed op adres:', newSafeAddress);

    // Gegevens opslaan
    const safeInfo = {
      address: newSafeAddress,
      ownerAddresses: [ownerAddress],
      threshold: 1,
      chainId: 10200, // Gnosis Chiado testnet
      createdAt: new Date().toISOString(),
      createdBy: ownerAddress
    };

    // In localStorage opslaan
    const existingSafes = JSON.parse(localStorage.getItem('safes') || '{}');
    existingSafes[newSafeAddress] = safeInfo;
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

    if (!existingUsers[ownerAddress].safeAddresses.includes(newSafeAddress)) {
      existingUsers[ownerAddress].safeAddresses.push(newSafeAddress);
    }
    localStorage.setItem('users', JSON.stringify(existingUsers));

    return newSafeAddress;
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