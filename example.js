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