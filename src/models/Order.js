const mongoos = require ('mongoose');
 const orderSchema = new mongoose.Schema({
    userId: {type: string, required: true},
    products:[
        {
            productId: {type: string},
            quantity: {type: number, default : 1}
        }],
        address: {type: string, required: true},
        amount: {type: number, required: true},
        status: {type: number, default:'pending', required: true},

 },{timestamps: true});
 mongoose.model = {}
  export default mongoose.model("order", OrderSchema);