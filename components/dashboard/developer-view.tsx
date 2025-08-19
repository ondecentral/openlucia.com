import CodeBlock from "./code-block";

/**
 * Displays the developer view which contains code snippets from the docs.
 */
const DeveloperView = () => {
  return (
    // INSTALL INSTRUCTIONS
    <div className="text-left font-mono text-sm lg:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Install the Lucia-Browser-SDK:
        </h3>
        <CodeBlock
          code={`$ npm install lucia-sdk
# or
$ yarn add lucia-sdk`}
          language="bash"
        />
      </div>

      {/* INITIALIZE EXAMPLE */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Initialize the SDK in your application:
        </h3>
        <CodeBlock
          code={`import LuciaSDK from 'lucia-sdk';
// Get your API Key from https://ads.clickinsights.xyz
LuciaSDK.init({
  apiKey: import.meta.env.VITE_CLICKINSIGHTS_API_KEY
});`}
        />
      </div>

      {/* WALLET LOGIN EXAMPLE */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Wallet Login Tracking
        </h3>
        <p className="text-gray-600 mb-4">
          The SDK provides methods to track wallet connections and user
          information. Here&apos;s how to implement wallet tracking in a login
          function:
        </p>

        <CodeBlock
          code={`interface WalletLoginParams {
  connectedAccount: string;
  walletName: "Metamask" | "Phantom";
}

async function handleWalletLogin({ connectedAccount, walletName }: WalletLoginParams) {
  try {
    // Track wallet connection
    await LuciaSDK.sendWalletInfo(connectedAccount, 101, walletName);

    // Handle wallet-specific logic
    switch (walletName) {
      case "Phantom": {
        const solBalance = await connection.getBalance(new PublicKey(connectedAccount));
        const tokenAccount = await fetchTokenAccounts();
        
        // Track user information including balances
        await LuciaSDK.userInfo(connectedAccount, {
          solBalance,
          tokenAccount,
        });
        break;
      }

      case "Metamask": {
        // Add Metamask-specific tracking here
        await LuciaSDK.userInfo(connectedAccount, {
          // Add relevant Ethereum wallet data
        });
        break;
      }
    }
  } catch (error) {
    console.error('Error during wallet login tracking:', error);
  }
}`}
        />
      </div>
    </div>
  );
};

export default DeveloperView;
