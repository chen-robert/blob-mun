import crypto from "crypto";

const uuid = {
  generate: (size=16) => {
    return crypto.randomBytes(size).toString("hex");
  }
}

export default uuid;