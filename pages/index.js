const [network, setNetwork] = useState("");

useEffect(() => {
    connectWallet();
    detectNetwork();
}, []);

const detectNetwork = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    setNetwork(network.name || `Chain ID: ${network.chainId}`);
};
