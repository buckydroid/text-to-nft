import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js";
import MainBar from "./components/MainBar";
import InputContainer from "./components/InputContainer";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const deepai = require("deepai");
deepai.setApiKey("7d2ac760-95fa-4ca7-aa22-a441db2b3125");

const Minter = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [generatedImg, setGeneratedImg] = useState(
    "https://github.com/nerdyrodent/VQGAN-CLIP/raw/main/samples/DemonBiscuits.png"
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  const generateNFT = async (inputText) => {
    setStatus("Generating NFT using your text input");

    var imgResponse = await deepai.callStandardApi("text2img", {
      text: inputText,
    });

    console.log(imgResponse);
    setStatus("Minting the generated NFT");

    const { status } = await mintNFT(
      imgResponse.output_url,
      inputText,
      "NFT generated using text " + inputText
    );

    
    setStatus(status);

    if(status.includes("Check out your transaction on Etherscan")){
      setGeneratedImg(imgResponse.output_url);
    }
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus(
            "Type something in the text field and press the generate button to try it."
          );
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank"  style={{color:"white"}}  href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box display="flex" flexDirection={"column"} sx={{ height: "100%" }}>
        <Box>
          <MainBar
            onConnectBtnClick={connectWalletPressed}
            status={
              walletAddress.length > 0 ? (
                "" +
                String(walletAddress).substring(0, 5) +
                "..." +
                String(walletAddress).substring(38)
              ) : (
                <span>Connect</span>
              )
            }
          />
        </Box>

        <Box
          display="flex"
          flexDirection={"column"}
          flexGrow={1}
          sx={{ alignItems: "center" }}
        >
          <Card sx={{ maxWidth: "250px", margin: 5, marginBottom: 3 }}>
            <CardActionArea>
              <CardMedia component="img" image={generatedImg} alt="nft" />
            </CardActionArea>
          </Card>
          <Box sx={{ width: "100%" }}>
            <InputContainer
              onGenerateBtnClicked={(input) => {
                generateNFT(input);
              }}
            />
          </Box>
          <Box sx={{ marginTop: 10 }}>
            <h4 style={{ color: "white", textAlign:"start", marginLeft:24}}>Status :</h4>
            <p id="status">{status}</p>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Minter;
