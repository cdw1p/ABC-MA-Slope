import moment from 'moment-timezone'

/**
 * Represents a class for calculating moving averages and slopes using the ABC algorithm.
 */
class ABCMovingAverageSlope {
  constructor(data) {
    this.data = data
  }

  /**
   * Calculates the moving averages of the data.
   * @param {number} windowSize - The size of the moving window.
   * @returns {number[]} An array of moving averages.
   */
  calculateMovingAverage(windowSize) {
    const movingAverages = []
    for (let i = 0; i < this.data.length; i++) {
      if (i >= windowSize - 1) {
        let sum = 0
        for (let j = i; j > i - windowSize; j--) {
          sum += parseFloat(this.data[j][4])
        }
        movingAverages.push(sum / windowSize);
      } else {
        movingAverages.push(null)
      }
    }
    return movingAverages
  }

  /**
   * Calculates the slopes of the moving averages.
   * @param {number} windowSize - The size of the moving window.
   * @returns {number[]} - An array of slopes.
   */
  calculateSlope(windowSize) {
    const slopes = []
    const movingAverages = this.calculateMovingAverage(windowSize)
    for (let i = 0; i < movingAverages.length - 1; i++) {
      if (movingAverages[i] !== null && movingAverages[i + 1] !== null) {
        slopes.push((movingAverages[i + 1] - movingAverages[i]) / windowSize)
      } else {
        slopes.push(null)
      }
    }
    return slopes
  }

  /**
   * Applies the ABC algorithm to calculate signals based on the given window size and threshold.
   * @param {number} windowSize - The size of the window used for calculating slopes.
   * @param {number} threshold - The threshold value used for determining bullish, bearish, or neutral direction.
   * @returns {Array} - An array of signal objects with price, timestamp, and direction.
   */
  abcAlgorithm(windowSize, threshold) {
    const signals = [], signalNormalized = []
    const slopes = this.calculateSlope(windowSize)
    for (let i = 0; i < slopes.length; i++) {
      if (slopes[i] !== null) {
        const timestamp = moment(this.data[i][0]).add(4, 'hours').format('YYYY-MM-DD HH:mm:ss')
        if (slopes[i] > threshold) {
          signals.push({ price: parseFloat(this.data[i][4]), timestamp, direction: 'bullish' })
        } else if (slopes[i] < -threshold) {
          signals.push({ price: parseFloat(this.data[i][4]), timestamp, direction: 'bearish' })
        } else {
          signals.push({ price: parseFloat(this.data[i][4]), timestamp, direction: 'neutral' })
        }
      }
    }
    for (let i = 0; i < signals.length; i++) {
      if (signals[i].direction !== signals[i + 1]?.direction) {
        signalNormalized.push(signals[i])
      }
    }
    return signalNormalized.reverse()
  }
}

/**
 * Exports the ABCMovingAverageSlope class.
 */
export default ABCMovingAverageSlope