import { ethers } from 'ethers';
import { gnosisChiado } from 'viem/chains';

// Simpeler implementatie met minimale afhankelijkheden om webpack te omzeilen
export async function createSafe(ownerAddress: string): Promise<string> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    throw new Error('createSafe kan alleen client-side worden aangeroepen');
  }

  try {
    console.log('Start Safe creatie proces voor:', ownerAddress);

    if (!window.ethereum) {
      throw new Error('Ethereum provider niet gevonden. Zorg dat je wallet is verbonden.');
    }

    // Ethers v5 provider en signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log('Ethers provider en signer geïnitialiseerd');
    
    // Simuleer Safe creatie voor nu, later vervangen door echte implementatie
    // Dit zorgt ervoor dat de UI werkt terwijl we webpack problemen oplossen
    console.log('Simuleren van Safe creatie...');
    
    // In een echte implementatie, zouden we hier direct het Safe contract aanroepen
    // in plaats van de Safe SDK te gebruiken
    const randomBytes = ethers.utils.randomBytes(20);
    const safeAddress = ethers.utils.getAddress(ethers.utils.hexlify(randomBytes));
    
    console.log('Test Safe adres gegenereerd:', safeAddress);

    // Gegevens opslaan
    const safeInfo = {
      address: safeAddress,
      ownerAddresses: [ownerAddress],
      threshold: 1,
      chainId: gnosisChiado.id,
      createdAt: new Date().toISOString(),
      createdBy: ownerAddress
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
