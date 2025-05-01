import mongoose from 'mongoose';

const FixtureSchema = new mongoose.Schema(
  {
    fixture_mid: { type: String, required: true, unique: true },
    season: Number,
    competition_name: String,
    fixture_datetime: Date,
    fixture_round: Number,
    home_team: String,
    away_team: String,
  },
  { timestamps: true }
);

export default mongoose.models.Fixtures ||
  mongoose.model('Fixtures', FixtureSchema);
