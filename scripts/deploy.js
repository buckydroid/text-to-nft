async function main() {
    // Grab the contract factory 
    const SurrealizedNFT = await ethers.getContractFactory("SurrealizedNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const surrealizedNFT = await SurrealizedNFT.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", surrealizedNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });