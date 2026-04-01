import * as tf from "@tensorflow/tfjs-node";

// Demo pre-trained model weights (simplified neural net for organ match prediction)
// Trained on synthetic data: blood_compat, organ_match, location_score, age_diff, urgency -> ml_score (0-100)
const modelWeights = {
  layer1Weights: tf.tensor2d([
    [0.3, 0.2, -0.1, 0.4, 0.15],
    [0.25, 0.35, 0.1, -0.2, 0.3],
  ]),
  layer1Bias: tf.tensor1d([0.1, 0.05]),
  layer2Weights: tf.tensor2d([
    [0.5, -0.2],
    [0.4, 0.3],
    [0.2, 0.5],
    [0.6, 0.1],
    [0.3, 0.4],
  ]),
  layer2Bias: tf.tensor1d([0, 0]),
  outputWeights: tf.tensor2d([[1.2], [1.1]]),
  outputBias: tf.tensor1d([10]),
};

// Simple neural net predictor for organprdict
class OrganPrdictModel {
  constructor() {
    this.model = null;
  }

  async loadModel() {
    // Create simple sequential model matching demo weights
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [5],
          units: 2,
          activation: "relu",
          name: "hidden1",
        }),
        tf.layers.dense({ units: 2, activation: "relu", name: "hidden2" }),
        tf.layers.dense({ units: 1, activation: "sigmoid", name: "output" }),
      ],
    });

    // Apply demo weights (for demo purposes)
    const layer1Weights = tf.tensor2d(modelWeights.layer1Weights.arraySync());
    const layer1Bias = tf.tensor1d(modelWeights.layer1Bias.arraySync());
    this.model.layers[0].setWeights([layer1Weights, layer1Bias]);

    const layer2Weights = tf.tensor2d(modelWeights.layer2Weights.arraySync());
    const layer2Bias = tf.tensor1d(modelWeights.layer2Bias.arraySync());
    this.model.layers[1].setWeights([layer2Weights, layer2Bias]);

    const outputWeights = tf.tensor2d(modelWeights.outputWeights.arraySync());
    const outputBias = tf.tensor1d(modelWeights.outputBias.arraySync());
    this.model.layers[2].setWeights([outputWeights, outputBias]);

    this.model.summary();
    console.log("✅ organprdict model loaded");
  }

  predict(features) {
    // features: [blood_compat (0-1), organ_match (0-1), location_score (0-1), age_diff_norm (-1 to 1), urgency (0-1)]
    const inputTensor = tf.tensor2d([features]);
    const prediction = this.model.predict(inputTensor);
    const score = Math.round(prediction.dataSync()[0] * 100); // Scale to 0-100
    prediction.dispose();
    inputTensor.dispose();
    return score;
  }
}

// Singleton instance
let predictor = null;

export const getOrganPrdict = async () => {
  if (!predictor) {
    predictor = new OrganPrdictModel();
    await predictor.loadModel();
  }
  return predictor;
};

// Export for controller use
export default getOrganPrdict;
