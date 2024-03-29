# ABC-MA-Slope
Artificial Bee Colony Algorithm with Moving Average Slope Algorithm

## Install
```
npm install ccxt
npm install moment-timezone
```
or
```
npm install
```

## Example
```js
import ccxt from 'ccxt'
import ArtificialBeeColony from './index.js'

/**
 * Fetch historical data
 */
const exchange = new ccxt.binance()
const symbol = 'BTC/USDT'
const timeframe = '4h'
const limit = 1000
const historicalData = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit)

/**
 * Find the best window size and threshold
 */
const options = { windowSize: 10, threshold: 0.8 }
const analyzer = new ArtificialBeeColony(historicalData)
const prediction = analyzer.abcAlgorithm(options.windowSize, options.threshold)
console.log({ prediction })
```

## Results
```
{
  prediction: [
    {
      price: 69180,
      timestamp: '2024-03-29 23:00:00',
      direction: 'bullish'
    },
    {
      price: 70142.78,
      timestamp: '2024-03-29 19:00:00',
      direction: 'bearish'
    },
    {
      price: 69794,
      timestamp: '2024-03-29 15:00:00',
      direction: 'bullish'
    },
    {
      price: 69469.99,
      timestamp: '2024-03-28 07:00:00',
      direction: 'bearish'
    },
    {
      price: 70387.99,
      timestamp: '2024-03-27 11:00:00',
      direction: 'neutral'
    },
    {
      price: 69988,
      timestamp: '2024-03-27 07:00:00',
      direction: 'bullish'
    },
    {
      price: 63990.01,
      timestamp: '2024-03-24 07:00:00',
      direction: 'bearish'
    },
    {
      price: 65981.99,
      timestamp: '2024-03-22 11:00:00',
      direction: 'bullish'
    },
    {
      price: 63600.37,
      timestamp: '2024-03-20 23:00:00',
      direction: 'bearish'
    },
    ...
  ]
}
```

## License
MIT