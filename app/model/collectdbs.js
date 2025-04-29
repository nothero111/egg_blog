module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CollectSchema = new Schema({
    filePath: { type: String },
    fileName: { type: String },
    fileCreateAt: { type: String },
    fileUrl: { type: String },
    account: { type: String },
    collectName: { type: String },
    fileUpdateAt: { type: String },

  });


  return mongoose.model('Collectdbs', CollectSchema, 'collectdbs');
};
