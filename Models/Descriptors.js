const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const descriptorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    front: {
        type: [Number],
        required: true
    },
    left: {
        type: [Number],
        required: true
    },
    right: {
        type: [Number],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Descriptor = mongoose.model("Descriptor", descriptorSchema);

module.exports.insertManyDescriptors = arrayOfObjects => {
    return Descriptor.insertMany(arrayOfObjects);
};

module.exports.insertOneDescriptor = descriptor => {
    return Descriptor.create(descriptor);
};

module.exports.removeDescriptorById = _id => {
    return Descriptor.findByIdAndRemove(_id)
};

module.exports.removeDescriptorsByUserId = userId => {
    return Descriptor.remove({ userId });
};

module.exports.updateDescriptorById = (_id, criteriaObject) => {
    return Descriptor.findByIdAndUpdate(_id, criteriaObject);
};

module.exports.findOneDescriptor = criteriaObject => {
    return Descriptor.findOne(criteriaObject);
};

module.exports.findByIdDescriptor = _id => {
    return Descriptor.findById(_id);
};

module.exports.findAllDescriptors = () => {
    return Descriptor.find({});
};

module.exports.findDescriptorByUserId = userId => {
    return Descriptor.find({ userId });
};