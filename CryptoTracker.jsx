
import { useQuery } from "@tanstack/react-query";

function CryptoTracker() {
  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["bitcoin"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coinbase.com/v2/prices/BTC-USD/spot"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch price");
      }

      return response.json();
    },
    refetchInterval: 10000,
  });

  if (isPending) {
    return <h2>Loading Bitcoin price...</h2>;
  }

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div>
      <h2>Bitcoin Tracker</h2>

      <h3>
        Price: ${Number(data.data.amount).toLocaleString()}
      </h3>

      {isFetching && (
        <p>
          <span className="dot"></span>
          Updating price...
        </p>
      )}
    </div>
  );
}

export default CryptoTracker;
