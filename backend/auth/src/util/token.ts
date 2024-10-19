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
      expiresIn: "1h",
    },
  );
};

export const verify = (token: string) => {
  const verification = jwt.verify(token, process.env.JWT || "secret");
  if (verification) {
    return verification;
  }

  return null;
};
