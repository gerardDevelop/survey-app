const mongoose = require('mongoose');
const getDateString = require('../utils/GetDateString');

// DB schemas
const VehicleSaleSchema = new mongoose.Schema({
  surveyToken: {
    type: String,
    required: true
  },
  stockNumber: {
    type: Number,
    required: true
  },
  companyId: {
    type: Number,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  dateSold: {
    type: String,
    required: true
  },
  templateId: {
    type: Number,
    default: 0
  },
  surveyCompleted: {
    type: Boolean,
    default: false
  },
  surveyData: {
    type: Object,
    default: null
  }
});

module.exports = Sale = mongoose.model(VehicleSaleSchema);