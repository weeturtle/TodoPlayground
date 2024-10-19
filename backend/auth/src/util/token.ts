import jwt from "jsonwebtoken";

// As this is a test project, the security of the JWT token is not a priority.
// CHANGE FOR PRODUCTION
export const tokenify = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT || "secret",
    {
      expiresIn: "1s",
    },
  );
};

export const verify = (token: string) => {
  try {
    const verification = jwt.verify(token, process.env.JWT || "secret");

    if (!verification || typeof verification === "string") {
      return null;
    }

    return verification.id;
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      console.log("Token expired");
    }
  }
  return null;
};
