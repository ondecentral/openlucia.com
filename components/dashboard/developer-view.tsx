import CodeBlock from "./code-block";

/**
 * Displays the developer view which contains code snippets from the docs.
 */
const DeveloperView = () => {
  return (
    // INSTALL INSTRUCTIONS
    <div className="text-left font-mono text-sm lg:p-6">
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Add the Lucia SDK to your application:
        </h3>
        <CodeBlock
          code={`<script
  src="https://cdn.luciaprotocol.com/lucia-sdk-latest.min.js"
  data-api-key="your-api-key-here">
</script>`}
          language="html"
        />
        <p className="mt-2 text-xs text-gray-500">
          The SDK auto-initializes when loaded with the data-api-key attribute.
        </p>
      </div>

      {/* OPTIONAL CONFIG EXAMPLE */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Optional: Enable click tracking
        </h3>
        <CodeBlock
          code={`<script
  src="https://cdn.luciaprotocol.com/lucia-sdk-latest.min.js"
  data-api-key="your-api-key-here"
  data-auto-track-clicks="true">
</script>`}
          language="html"
        />
      </div>

      {/* WALLET LOGIN EXAMPLE */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Wallet Login Tracking
        </h3>
        <p className="mb-4 text-gray-600">
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
