import SimpleSchema from 'simpl-schema';

export const createdAt = {
  type: Date,
  autoValue() {
    if (this.isInsert) return new Date();
    return this.isUpsert ? { $setOnInsert: new Date() } : this.unset();
  },
  denyUpdate: true,
};

export const updatedAt = {
  type: Date,
  autoValue: () => new Date(),
};

export const ethereumAddressType = { type: String, max: 42 };
export const ethereumSignatureType = { type: String, min: 132, max: 132 };
